import { EffectMagnitude, Location, PirateType } from "@/types/game";
import { SpawnIslandTile } from "@/utils/game";

export interface BaseCardEffect {
    type: "berries" | "poneglyph";
    magnitude: EffectMagnitude;
}

export interface ProbabilityEffect {
    type: "probability";
    description: string;
    getOutcome: (roll: number) => BaseCardEffect[];
}

export interface ChoiceEffect {
    type: "choice";
    options: {
        label: string;
        effects: BaseCardEffect[];
    }[];
}


export type CardEffect = BaseCardEffect | ProbabilityEffect | ChoiceEffect;

export interface Card {
    id: string;
    title: string;
    description: string;
    location: Location;
    effects: CardEffect[];
    finalOutcome?: BaseCardEffect[];
}

export interface SpawnConfig {
    id: string;
    name: string;
    pirateType: PirateType;
    island: SpawnIslandTile;
    initialBerries: number;
    description: string;

}

export const spawnConfigs: SpawnConfig[] = [
    {
        id: "rookie",
        name: "Monkey D. Luffy",
        pirateType: "rookie",
        island: "amazonlily",
        initialBerries: 80,
        description: "A new pirate, just starting out.Enters the sea with the dream of becoming a pirate king.",
    },
    {
        id: "supernova",
        name: "Trafalgar Law",
        pirateType: "supernova",
        island: "waterseven",
        initialBerries: 100,
        description: "A skilled surgeon who uses his medical skills to help his crew. He is known for his ability to heal wounds and his strategic thinking.",
    },
    {
        id: "warlord",
        name: "Gol.D.Buggy",
        pirateType: "warlord",
        island: "wholecake",
        initialBerries: 120,
        description: "A legendary swordsman who is known for his strength and his ability to defeat his opponents with his sword.",
    },
    {
        id: "emperor",
        name: "Kaido",
        pirateType: "emperor",
        island: "wano",
        initialBerries: 150,
        description: "A legendary pirate who is known for his strength and his ability to defeat his opponents with his sword.",
    }
];

export function createDeck(): Card[] {
    return [
        // emperor spawn island Negative Cards
        {
            id: "emp-n-1",
            title: "Island's Curse",
            description: "The Island is classified as a food desert.You spend extra times and berries travelling for food",
            location: "emperor",
            effects: [{ type: "berries", magnitude: -1 }],
        },
        {
            id: "emp-n-2",
            title: "Limited Knowledge of Poneglyphs",
            description: "You have limited knowledge of Poneglyphs,So you take help from the rival pirates to read them",
            location: "emperor",
            effects: [{ type: "poneglyph", magnitude: -0.5 }],
        },
        {
            id: "emp-n-3",
            title: "Big Mom Pirates Attack",
            description: "Big Mom Pirates attack the island.You have to defend the island from them",
            location: "emperor",
            effects: [{ type: "poneglyph", magnitude: -1 }],
        },
        {
            id: "emp-n-4",
            title: "Save your Nakama",
            description: "Attack by BigMom Pirates injured your Nakama.You have to heal them",
            location: "emperor",
            effects: [{
                type: "probability",
                description: ">=4 heal Nakama Fully",
                getOutcome: (roll) => {
                    return roll >= 4 ? [{ type: "berries", magnitude: -10 }] : [{ type: "berries", magnitude: -20 }];
                }
            }]
        },
        {
            id: "emp-n-5",
            title: "Big Mom Pirates Attack",
            description: "Big Mom Pirates attack the island.You have to defend the island from them",
            location: "emperor",
            effects: [{ type: "poneglyph", magnitude: -1 }],
        },
        {
            id: "emp-n-6",
            title: "Big Mom Pirates Attack",
            description: "Big Mom Pirates attack the island.You have to defend the island from them",
            location: "emperor",
            effects: [{ type: "poneglyph", magnitude: -1 }],
        },
        {
            id: "emp-n-7",
            title: "Big Mom Pirates Attack",
            description: "Big Mom Pirates attack the island.You have to defend the island from them",
            location: "emperor",
            effects: [{ type: "poneglyph", magnitude: -1 }],
        },
        {
            id: "emp-n-8",
            title: "Big Mom Pirates Attack",
            description: "Big Mom Pirates attack the island.You have to defend the island from them",
            location: "emperor",
            effects: [{ type: "poneglyph", magnitude: -1 }],
        },
        {
            id: "emp-n-9",
            title: "Marine Admiral Kizaru Raids",
            description: "Marine Admiral Kizaru raids the island.You have to defend the island from them",
            location: "emperor",
            effects: [
                {
                    type: "probability",
                    description: "Roll a die.Roll a 3 or higher to be safe",
                    getOutcome: (roll) => {
                        return roll >= 3
                            ? []
                            : [{
                                type: "berries",
                                magnitude: -2,
                                description: "Your right wing got detained by the Marines.Pay for their release"
                            }]
                    }
                }
            ]
        },
        {
            id: "emp-n-10",
            title: "Big Mom Pirates Attack",
            description: "Big Mom Pirates attack the island.You have to defend the island from them",
            location: "emperor",
            effects: [{ type: "berries", magnitude: -20 }],
        },
        {
            id: "emp-n-11",
            title: "Big Mom Pirates Attack",
            description: "Big Mom Pirates attack the island.You have to defend the island from them",
            location: "emperor",
            effects: [{ type: "poneglyph", magnitude: -1 }],
        },
        {
            id: "emp-n-12",
            title: "Big Mom Pirates Attack",
            description: "Big Mom Pirates attack the island.You have to defend the island from them",
            location: "emperor",
            effects: [{ type: "poneglyph", magnitude: -0.5 }],

        },
        {
            id: "emp-n-13",
            title: "Big Mom Pirates Attack",
            description: "Big Mom Pirates attack the island.You have to defend the island from them",
            location: "emperor",
            effects: [{ type: "poneglyph", magnitude: -0.5 }],
        },
        {
            id: "emp-n-14",
            title: "Big Mom Pirates Attack",
            description: "Big Mom Pirates attack the island.You have to defend the island from them",
            location: "emperor",
            effects: [{ type: "berries", magnitude: -1 }],
        },

        //emperor spawn island Positive Cards
        {
            id: "emp-p-1",
            title: "Treasure Found",
            description: "You found a treasure on the island.",
            location: "emperor",
            effects: [{ type: "berries", magnitude: 2 }],
        },
        {
            id: "emp-p-2",
            title: "Victory against Big Mom Pirates",
            description: "You defeated Big Mom Pirates.You now have an advantage over the other pirates.",
            location: "emperor",
            effects: [{ type: "poneglyph", magnitude: 1 }],
        },
        {
            id: "emp-p-3",
            title: "Victory against Big Mom Pirates",
            description: "You defeated Big Mom Pirates.You now have an advantage over the other pirates.",
            location: "emperor",
            effects: [{ type: "poneglyph", magnitude: 1 }],
        },
        {
            id: "emp-p-4",
            title: "Vicory against the Admiral Forces",
            description: "You defeated the Admiral Forces.You now have an advantage over the other pirates.",
            location: "emperor",
            effects: [
                { type: "berries", magnitude: 1 },
                { type: "poneglyph", magnitude: 1 },
            ]
        },
        {
            id: "emp-p-5",
            title: "Help from Heart Pirates",
            description: "The Heart Pirates help you in your journey.",
            location: "emperor",
            effects: [{ type: "berries", magnitude: 8 }],
        },
        {
            id: "emp-p-6",
            title: "Nico Robin joins your crew",
            description: "Nico Robin joins your crew.You now have a new member in your crew.",
            location: "emperor",
            effects: [{ type: "poneglyph", magnitude: 0.5 }],
        },
        {
            id: "emp-p-7",
            title: "Revolutionary Army sends Sabo to ally with you in the main war",
            description: "Revolutionary Army helps Your Crew to return the favor by sending their strongest member Sabo having Ace's Devil Fruit to help you in the final saga",
            location: "emperor",
            effects: [{ type: "poneglyph", magnitude: 1 }],
        },

        //Special Location Cards 
        {
            id: "loc-egg-1",
            title: "Meeting with Dr Vegapunk",
            description: "You meet Vegapunks and he gives you a choice to reach to your dreams of becoming a pirate king quickly by offering you battleships",
            location: "egghead",
            effects: [
                {
                    type: "choice",
                    options: [
                        {
                            label: "Decline the offer",
                            effects: [],
                        },
                        {
                            label: "Accept the offer",
                            effects: [
                                { type: "berries", magnitude: 20 },
                                { type: "poneglyph", magnitude: -2 },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: "loc-sky-1",
            title: "Vacation on Skypie Island",
            description: "The Crew Wants to go for a vacation before going to Wano Country.You can choose to go to Skypie Island or continue your journey",
            location: "skypiea",
            effects: [
                {
                    type: "choice",
                    options: [
                        {
                            label: "Decline to go to Skypie Island",
                            effects: [],
                        },
                        {
                            label: "Go to Skypie Island",
                            effects: [
                                { type: "berries", magnitude: -10 },
                                { type: "poneglyph", magnitude: 1 },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: "loc-oni-1",
            title: "Fight Kaido at Onigashima",
            description: "You have to fight Kaido at Onigashima.You can choose to fight Kaido or not",
            location: "onigashima",
            effects: [
                {
                    type: "choice",
                    options: [
                        {
                            label: "Decline to fight Kaido",
                            effects: [],
                        },
                        {
                            label: "Fight Kaido",
                            effects: [
                                { type: "berries", magnitude: -10 },
                                { type: "poneglyph", magnitude: 1 },
                            ],
                        },
                    ],
                },
            ],
        },

        //supernova spawn island Negative Cards
        {
            id: "sup-n-1",
            title: "Shanks Attacks your Crew",
            description: "Shanks attacks your crew.There's no way blud It's GGs for you",
            location: "supernova",
            effects: [
                { type: "berries", magnitude: -20 },
                { type: "poneglyph", magnitude: -2 },
            ],
        },
        {
            id: "sup-n-2",
            title: "Kuma Seperates your Crew",
            description: "Kuma Seperates your crew.You have to find them again",
            location: "supernova",
            effects: [
                { type: "berries", magnitude: -10 },
            ]
        },
        {
            id: "sup-n-3",
            title: "Celestial Dragon asks for your female crew member",
            description: "Celestial Dragon asks for your female crew member to be auctioned off, So you have to provide them money to buy her back",
            location: "supernova",
            effects: [
                { type: "berries", magnitude: -20 },
            ],
        },
        {
            id: "sup-n-4",
            title: "Big Mom Pirates Attack",
            description: "Big Mom Pirates attack the island.You have to defend the island from them",
            location: "supernova",
            effects: [{ type: "poneglyph", magnitude: -2 }],
        },
        {
            id: "sup-n-5",
            title: "Big Mom Pirates Attack",
            description: "Big Mom Pirates attack the island.You have to defend the island from them",
            location: "supernova",
            effects: [{ type: "berries", magnitude: -1 }],
        },
        //supernova spawn island Positive Cards
        {
            id: "sup-p-1",
            title: "Dark King Rayleigh trains you",
            description: "Dark King Rayleigh trains you.You are now 100x stronger.",
            location: "supernova",
            effects: [{ type: "berries", magnitude: 10 }],
        },
        {
            id: "sup-p-2",
            title: "You found Shishui sword but it's cursed and you have to pay for it",
            description: "Shishui is an ancient sword from wano country which has haki possessed inside it.You have to pay for it",
            location: "supernova",
            effects: [
                { type: "berries", magnitude: -20 },
                { type: "poneglyph", magnitude: 0.5 },

            ],
        },
        {
            id: "sup-p-3",
            title: "You found Shishui sword but it's cursed and you have to pay for it",
            description: "Shishui is an ancient sword from wano country which has haki possessed inside it.You have to pay for it",
            location: "supernova",
            effects: [{ type: "berries", magnitude: 5 }],
        },
        {
            id: "sup-p-4",
            title: "You found Shishui sword but it's cursed and you have to pay for it",
            description: "Shishui is an ancient sword from wano country which has haki possessed inside it.You have to pay for it",
            location: "supernova",
            effects: [{ type: "berries", magnitude: 5 }],
        },
        {
            id: "sup-p-5",
            title: "Allies with the Straw Hat Pirates",
            description: "The Straw Hat Pirates allies with you to fight against an emperor but first you need to prove you are strongest by fighting against Sanji",
            location: "supernova",
            effects: [
                {
                    type: "probability",
                    description: "Roll a die.Roll a 4 or higher to be safe",
                    getOutcome: (roll) => {
                        if (roll >= 4) {
                            return [
                                {
                                    type: "poneglyph",
                                    magnitude: 2,
                                    description: "You defeated Sanji.Strawhat Pirates will help you in the final saga",
                                }
                            ];
                        }
                        return [
                            {
                                type: "poneglyph",
                                magnitude: -1,
                                description: "You lost to Sanji.Strawhat Pirates will not help you in the final saga and they steal your ship",
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: "sup-p-6",
            title: "You found a treasure on the island.",
            description: "You found a treasure on the island.",
            location: "supernova",
            effects: [{ type: "poneglyph", magnitude: 1 }],
        },

        // warlord spawn island Negative Cards
        {
            id: "war-n-1",
            title: "You lost to the Strawhat Pirates",
            description: "You lost to the Strawhat Pirates.You no longer are a threat to Marine",
            location: "warlord",
            effects: [
                { type: "berries", magnitude: -10 },
            ]
        },
        {
            id: "war-n-2",
            title: "The Gorosei have sent their strongest member to defeat you",
            description: "The Gorosei have sent Saturn to fight against you. Lets See if you can win",
            location: "warlord",
            effects: [
                {
                    type: "probability",
                    description: "Roll a die.Roll a 4 or higher to be safe",
                    getOutcome: (roll) => {
                        return roll >= 4 ? [{ type: "berries", magnitude: 10 }] : [];
                    },
                },
            ],
        },
        {
            id: "war-n-3",
            title: "You lost to the Gorosei",
            description: "You lost to the Gorosei.You no longer are a threat to Marine",
            location: "warlord",
            effects: [{ type: "berries", magnitude: -20 }],
        },
        {
            id: "war-n-4",
            title: "You lost to the Gorosei",
            description: "You lost to the Gorosei.You no longer are a threat to Marine",
            location: "warlord",
            effects: [{ type: "berries", magnitude: -10 }],
        },
        {
            id: "war-n-5",
            title: "You lost to the Gorosei",
            description: "You lost to the Gorosei.You no longer are a threat to Marine",
            location: "warlord",
            effects: [{ type: "poneglyph", magnitude: -1 }],
        },



        //warlord spawn island Positive Cards
        {
            id: "war-p-1",
            title: "Marines are praising you.",
            description: "Marines are praising you.You defeated the Kidd Pirates which were threat to World Government",
            location: "warlord",
            effects: [{ type: "poneglyph", magnitude: 1 }],
        },
        {
            id: "war-p-2",
            title: "You found a treasure on the island.",
            description: "You found a treasure on the island.",
            location: "warlord",
            effects: [{ type: "berries", magnitude: 10 }],
        },
        {
            id: "war-p-3",
            title: "You found a treasure on the island.",
            description: "You found a treasure on the island.",
            location: "warlord",
            effects: [{ type: "poneglyph", magnitude: 0.25 }],
        },
        {
            id: "war-p-4",
            title: "You found a treasure on the island.",
            description: "You found a treasure on the island.",
            location: "warlord",
            effects: [{ type: "berries", magnitude: 20 }],
        },

        //rookie spawn island Negative Cards
        {
            id: "rook-n-1",
            title: "Buggy Steals All Your Treasure",
            description: "Buggy Steals All Your Treasure.You need to be more strong dawg like letting buggy steal your treasure you are ngmi",
            location: "rookie",
            effects: [
                { type: "berries", magnitude: -20 },
            ]
        },
        {
            id: "rook-n-2",
            title: "Dracule Mihawk comes in your way",
            description: "It's so over for you lil bro,Go back to East Blue",
            location: "rookie",
            effects: [
                { type: "berries", magnitude: -20 },
                { type: "poneglyph", magnitude: -0.25 },
            ],
        },
        {
            id: "rook-n-3",
            title: "Akainu Appears!",
            description: "Apparently Akainu was on a vaction on the island you were on and he founds you and your crew so to save your life you give up on your dreams and become marines.Lmao it was over before it even started",
            location: "rookie",
            effects: [
                { type: "berries", magnitude: -40 },
            ]
        },
        //rookie spawn island Positive Cards
        {
            id: "rook-p-1",
            title: "Zoro Joins your Crew.",
            description: "Zoro Joins your Crew.You now have a new member in your crew.",
            location: "rookie",
            effects: [
                { type: "berries", magnitude: 10 },
            ]
        },
        {
            id: "rook-p-2",
            title: "You found a treasure on the island.",
            description: "You found a treasure on the island.",
            location: "rookie",
            effects: [
                { type: "poneglyph", magnitude: 1 },
            ]
        },
        {
            id: "rook-p-3",
            title: "You get your first bounty",
            description: "You get your first bounty.You are now a threat to the World Government",
            location: "rookie",
            effects: [
                { type: "berries", magnitude: 10 },
            ]
        },
        {
            id: "rook-p-4",
            title: "You defeated Vice Admiral Smoker.",
            description: "You defeated Vice Admiral Smoker.You are now a threat to the World Government",
            location: "rookie",
            effects: [
                { type: "berries", magnitude: 10 },
            ]
        },
        {
            id: "rook-p-5",
            title: "You defeated Crocodile in Alabasta.",
            description: "You defeated Crocodile in Alabasta.You are now a threat to the World Government",
            location: "rookie",
            effects: [
                { type: "poneglyph", magnitude: 0.5 },
            ]
        },
        {
            id: "rook-p-6",
            title: "Doflamingo joins your creq",
            description: "Doflamingo joins your crew now you are 100x stronger pirates",
            location: "rookie",
            effects: [
                { type: "berries", magnitude: 40 },
                { type: "poneglyph", magnitude: 2 },
            ]
        },
        {
            id: "rook-p-7",
            title: "You get hands on ancient weapon pluton",
            description: "You get hands on ancient weapon pluton which is a powerful weapon that can be used to defeat your enemies",
            location: "rookie",
            effects: [
                { type: "poneglyph", magnitude: 1 },
            ]
        },
        {
            id: "rook-p-8",
            title: "Ace helps you in the fight against Aokiji",
            description: "Ace helps you in the fight against Aoki.But bro turned into donut lol",
            location: "rookie",
            effects: [
                { type: "berries", magnitude: -10 },
                { type: "poneglyph", magnitude: 0.5 },
            ]
        },

    ];
}

//get all cards by location
export function getCardByLocation(deck: Card[], location: Location): Card[] {
    return deck.filter(card => card.location === location);
}

//apply base card effects (berries and poneglyph) to game state

export function applyBaseEffect(effect: BaseCardEffect): {
    berries?: number;
    poneglyph?: number;
} {
    const result: {
        berries?: number;
        poneglyph?: number;
    } = {};

    switch (effect.type) {
        case "berries":
            result.berries = effect.magnitude;
            break;
        case "poneglyph":
            result.poneglyph = effect.magnitude;
            break;
    }
    return result;

}


// function to process probability/roll outcome

export function processRoll(
    effect: ProbabilityEffect,
    roll: number
): BaseCardEffect[] {
    return effect.getOutcome(roll);
}

//function to process choice outcome

export function processChoice(
    effect: ChoiceEffect,
    choiceIndex: number
): BaseCardEffect[] {
    if (choiceIndex >= 0 && choiceIndex < effect.options.length) {
        return effect.options[choiceIndex].effects;
    }
    return [];
}

export function drawCard(
    deck: Card[],
    location: Location
): {
    card: Card | null;
    remainingDeck: Card[];
} {
    if (deck.length === 0) {
        return {
            card: null, remainingDeck: []
        };
    }

    //filter cards by pirate types location
    const locationCards = getCardByLocation(deck, location);

    //if no cards for the location reset the deck
    deck = !locationCards.length
        ? deck.concat(getCardByLocation(createDeck(), location))
        : deck;

    const randomIndex = Math.floor(Math.random() * locationCards.length);

    //Draw a ranom card from the deck
    const card = locationCards[randomIndex];

    // Remove the selected card from the deck
    const remainingDeck = deck.filter((c) => c.id !== card.id);

    return {
        card,
        remainingDeck: isActionCard(card.location) ? deck : remainingDeck,
    }

}

/**
 * Selects a random starting profile.
 * @returns A randomly chosen StartingProfile.
 */
export function spawn(): SpawnConfig {
    // Simple vanilla JS random selection
    const randomIndex = Math.floor(Math.random() * spawnConfigs.length);
    return spawnConfigs[randomIndex];
}

export function getSpawnConfig(pirateType: PirateType) {
    return spawnConfigs.find(
        (s) => s.pirateType === pirateType
    ) as SpawnConfig;
}

export function isActionCard(location: Location): boolean {
    return location === "egghead" || location === "onigashima" || location === "skypiea";
}
