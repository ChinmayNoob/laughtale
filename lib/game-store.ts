import { Location } from "@/types/game";
import { applyBaseEffect, BaseCardEffect, Card, ChoiceEffect, createDeck, drawCard, ProbabilityEffect, processChoice, processRoll, spawn } from "./cards";
import { Direction, getLocationFromPosition, getNextPosition, getPositionFromPirateType } from "@/utils/game";
import { create } from "zustand";
import { closeCardEvent, drawnCardEvent } from "./events";

export const PANEL_TRANSITION_DURATION = 3000;
export const PANEL_TRANSITION_DURATION_CARD_REVEAL = 5000;

type Panel = "move" | "effects" | "action" | "probability" | "choice";

interface GameState {

    //States
    berries: number;
    poneglyph: number;
    position: number;
    deck: Card[];
    currentCard: Card | null;
    location: Location;
    panel: Panel;
    state: "idle" | "playing" | "game-over";
    characterName: string;

    //Actions

    move: (spaces: number, direction: Direction) => void;
    updateBerries: (amount: number) => void;
    updatePoneglyph: (amount: number) => void;
    drawCard: () => void;
    applyEffects: (effects: BaseCardEffect[]) => void;
    handleRoll: (roll: number) => BaseCardEffect[];
    handleChoice: (choiceIndex: number) => BaseCardEffect[];
    handleFinalWar: (result: "win" | "lose") => void;
    processCard: () => void;
    resetGame: () => void;
    changeState: (state: "idle" | "playing" | "game-over") => void;
    closeCard: () => void;
}

function initGameState() {
    const spawnConfig = spawn();

    return {
        state: "idle" as const,
        berries: spawnConfig.initialBerries,
        poneglyph: 2,
        position: getPositionFromPirateType(spawnConfig.pirateType),
        deck: createDeck(),
        currentCard: null,
        location: getLocationFromPosition(getPositionFromPirateType(spawnConfig.pirateType)),
        panel: "move" as const,
        characterName: spawnConfig.name,
    }
}


export const useGameStore = create<GameState>((set, get) => ({
    ...initGameState(),

    move: (spaces: number, direction: Direction) => {
        const position = getNextPosition(get().position, direction, spaces);
        const location = getLocationFromPosition(position);
        set({ position, location })
        get().drawCard();
        get().processCard();
    },

    updateBerries: (amount) =>
        set((state) => ({ berries: Math.max(0, state.berries + amount) })),

    updatePoneglyph: (amount) =>
        set((state) => ({ poneglyph: Math.max(0, state.poneglyph + amount) })),


    drawCard: () => {
        set((state) => {
            const { card, remainingDeck } = drawCard(state.deck, state.location);
            drawnCardEvent();

            console.log(`DEBUG: drawCard`, card);

            return {
                deck: remainingDeck,
                currentCard: card,
            };
        });
    },
    processCard: () => {
        const { currentCard } = get();
        if (!currentCard) return;

        // Determine the type of card and set the panel accordingly
        let newPanel: Panel = "effects";

        // Check for special effect types that require user interaction
        const hasProbability = currentCard.effects.some(
            (effect) => effect.type === "probability"
        );
        const hasChoice = currentCard.effects.some(
            (effect) => effect.type === "choice"
        );

        if (hasProbability) {
            newPanel = "probability";
        } else if (hasChoice) {
            newPanel = "choice";
        } else {
            // Handle basic effects immediately (berries and poneglyph)
            const baseEffects = currentCard.effects.filter(
                (effect): effect is BaseCardEffect =>
                    effect.type === "berries" || effect.type === "poneglyph"
            );

            get().applyEffects(baseEffects);
            setTimeout(() => set({ panel: "move" }), PANEL_TRANSITION_DURATION * 2);
        }

        // Update the panel
        set({ panel: newPanel });
    },

    applyEffects: (effects: BaseCardEffect[]) => {
        effects.forEach((effect) => {
            const { berries, poneglyph } = applyBaseEffect(effect);
            if (berries !== undefined) get().updateBerries(berries);
            if (poneglyph !== undefined) get().updatePoneglyph(poneglyph);
        });
    },

    handleRoll: (roll: number) => {
        const { currentCard } = get();
        if (!currentCard) return [];

        // Find probability effects in the current card
        const probEffect = currentCard.effects.find(
            (effect): effect is ProbabilityEffect => effect.type === "probability"
        );

        if (probEffect) {
            // Process the roll and get the resulting effects
            const effects = processRoll(probEffect, roll);
            get().applyEffects(effects);
            set({
                panel: "effects",
                currentCard: { ...currentCard, finalOutcome: effects },
            });
            setTimeout(() => set({ panel: "move" }), PANEL_TRANSITION_DURATION);
            return effects;
        }

        return [];
    },

    handleChoice: (choiceIndex: number) => {
        const { currentCard } = get();
        if (!currentCard) return [];

        // Find choice effects in the current card
        const choiceEffect = currentCard.effects.find(
            (effect): effect is ChoiceEffect => effect.type === "choice"
        );

        if (choiceEffect) {
            // Process the choice selection and get resulting effects
            const effects = processChoice(choiceEffect, choiceIndex);
            if (effects.length > 0) {
                get().applyEffects(effects);

                // Store the resolved effects on the card itself
                set((state) => ({
                    currentCard: { ...state.currentCard!, finalOutcome: effects },
                    panel: "effects",
                }));

                setTimeout(() => set({ panel: "move" }), PANEL_TRANSITION_DURATION);
            }

            set({ panel: "move" });

            return effects;
        }

        return [];
    },

    handleFinalWar: (result: "win" | "lose") => {
        const { poneglyph, berries } = get();
        if (result === "win") {
            get().updatePoneglyph(poneglyph);
            get().changeState("idle");
            get().resetGame();
        } else {
            set({ poneglyph: Math.round(poneglyph / 2) });
            set({ berries: Math.round(berries / 2) });
        }
    },

    closeCard: () => {
        set({ panel: "move" });
        closeCardEvent();
    },

    changeState: (state: "idle" | "playing" | "game-over") => set({ state }),

    resetGame: () => set(initGameState()),

}))