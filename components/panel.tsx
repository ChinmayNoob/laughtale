import React from "react";
import { AnimatePresence, motion } from "motion/react";
import Button from "./button";
import { useMemo, useState } from "react";
import { useGameStore } from "@/lib/game-store";
import { BaseCardEffect } from "@/lib/cards";
import { cn } from "@/utils/common";
import { takeJollyrogerEvent } from "@/lib/events";
import { TILE_POSITION } from "@/utils/game";
import { EffectImage, getEffectColor } from "./start-game";

export const Panel = () => {
    const panelType = useGameStore((state) => state.panel);

    const panel = useMemo(() => {
        switch (panelType) {
            case "move":
                return <MovePanel />;
            case "effects":
                return <EffectsPanel />;
            case "probability":
                return <ProbabilityPanel />;
            case "choice":
                return <ChoicePanel />;
        }
    }, [panelType]);

    return (
        <div className="relative">
            <div className="relative z-20 w-80 h-32 bg-white/20 backdrop-blur-xl border-l border-white/30">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />

                <AnimatePresence mode="wait">
                    <motion.div
                        className="relative flex flex-col items-center justify-center h-full px-2"
                        key={panelType}
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {panel}
                    </motion.div>
                </AnimatePresence>

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/30 rounded-full"
                            animate={{
                                y: [-10, -80],
                                x: [Math.random() * 320, Math.random() * 320],
                                opacity: [0, 0.6, 0],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: '100%',
                            }}
                        />
                    ))}
                </div>
            </div>
            <JollyRogerStopPanel />
        </div>
    );
};

const ProbabilityPanel = () => {
    const [number, setNumber] = useState<number>(0);
    const [status, setStatus] = useState<"idle" | "reveal">("idle");

    const handleRoll = useGameStore((state) => state.handleRoll);

    const roll = () => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;

        setStatus("reveal");
        setNumber(randomNumber);
        setTimeout(() => handleRoll(randomNumber), 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <AnimatePresence mode="wait">
                {status === "idle" && (
                    <motion.div
                        key="idle-content"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <Button
                            onClick={roll}
                            className="flex flex-row items-center gap-2 text-sm px-3 py-2 bg-white"
                        >
                            <span>🎲</span>
                            <span className="text-black">Roll a dice</span>
                        </Button>

                        <motion.div
                            className="text-6xl"
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            🎲
                        </motion.div>
                    </motion.div>
                )}

                {status === "reveal" && (
                    <motion.div
                        key="reveal-content"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <motion.span
                            className="font-semibold text-slate-700 bg-white/40 backdrop-blur-sm rounded-lg px-4 py-2"
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                        >
                            You picked
                        </motion.span>

                        <motion.div
                            className="text-3xl font-bold italic text-blue-600 bg-white/60 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center shadow-lg border border-white/50"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.2
                            }}
                        >
                            {number}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ChoicePanel = () => {
    const choice = useGameStore((state) =>
        state.currentCard?.effects.find((effect) => effect.type === "choice")
    );

    const choose = useGameStore((state) => state.handleChoice);

    if (!choice) return null;

    return (
        <div className="flex items-center justify-center gap-4 w-full">
            {choice.options.map((option, index) => {
                const isDecline = option.effects.length === 0;

                return (
                    <motion.div
                        className="relative flex flex-col items-center justify-end gap-3"
                        key={option.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {!isDecline && (
                            <motion.div
                                className="flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/50"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                            >
                                {option.effects.map((effect, effectIndex) => {
                                    effect = effect as BaseCardEffect;
                                    const isLast = effectIndex === option.effects.length - 1;

                                    return (
                                        <React.Fragment key={`effect-${effectIndex}`}>
                                            <div
                                                className={cn(
                                                    "gap-1 flex flex-col items-center",
                                                    getEffectColor(effect.type)
                                                )}
                                            >
                                                <div className="flex items-center gap-1 text-lg italic font-semibold">
                                                    {effect.magnitude}
                                                    <EffectImage type={effect.type} size="sm" />
                                                </div>
                                            </div>

                                            {!isLast && (
                                                <span className="text-lg italic font-semibold text-slate-400">
                                                    &
                                                </span>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </motion.div>
                        )}
                        <Button
                            variant={isDecline ? "secondary" : "primary"}
                            onClick={() => choose(index)}
                            className="flex flex-row items-center justify-center text-sm px-3 py-2 shadow-lg"
                        >
                            <span>{option.label}</span>
                        </Button>
                    </motion.div>
                );
            })}
        </div>
    );
};

const getTitle = (effect: BaseCardEffect) => {
    const isPositive = effect.magnitude > 0;
    return isPositive ? "You gained" : "You lost";
};

const EffectsPanel = () => {
    const effects = useGameStore((state) => {
        const card = state.currentCard;
        return card?.finalOutcome || card?.effects;
    });

    if (!effects || effects.length === 0) return null;

    if (effects.length === 1) {
        const effect = effects[0] as BaseCardEffect;

        return (
            <motion.div
                className={cn(
                    "gap-4 flex flex-col items-center bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg",
                    getEffectColor(effect.type)
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <motion.span
                    className="text-sm font-semibold bg-white/60 backdrop-blur-sm rounded-lg px-3 py-1"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {getTitle(effect)}
                </motion.span>
                <motion.div
                    className="flex items-center gap-3 text-5xl italic font-bold"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.3
                    }}
                >
                    {effect.magnitude} <EffectImage type={effect.type} size="lg" />
                </motion.div>
            </motion.div>
        );
    }

    return (
        <div className="flex items-center justify-center gap-4 flex-wrap">
            {effects.map((effect, index) => {
                effect = effect as BaseCardEffect;
                const isLast = index === effects.length - 1;
                return (
                    <React.Fragment key={`effect-${index}`}>
                        <motion.div
                            className={cn(
                                "gap-2 flex flex-col items-center bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg",
                                getEffectColor(effect.type)
                            )}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-xs font-semibold bg-white/60 backdrop-blur-sm rounded-lg px-2 py-1">{getTitle(effect)}</span>
                            <div className="flex items-center gap-2 text-3xl italic font-bold">
                                {effect.magnitude} <EffectImage type={effect.type} />
                            </div>
                        </motion.div>

                        {!isLast && (
                            <motion.span
                                className="text-2xl italic font-semibold text-slate-400"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                            >
                                &
                            </motion.span>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

const MovePanel = () => {
    const [status, setStatus] = useState<"idle" | "reveal" | "pending_action">(
        "idle"
    );
    const [number, setNumber] = useState<number>(0);

    const move = useGameStore((state) => state.move);

    const handleRoll = () => {
        setStatus("reveal");
        setNumber(Math.floor(Math.random() * 6) + 1);
        setTimeout(() => setStatus("pending_action"), 2000);
    };

    const handleBack = () => {
        move(number, -1);
        setStatus("idle");
    };

    const handleForward = () => {
        move(number, 1);
        setStatus("idle");
    };

    const handleSkipReveal = () => {
        setStatus("pending_action");
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
            <AnimatePresence mode="wait">
                {status === "idle" && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <Button
                            onClick={handleRoll}
                            className="flex flex-row items-center gap-2 text-sm px-3 py-2 bg-white"
                        >
                            <span>🎲</span>
                            <span className="text-black">Roll a dice</span>
                        </Button>

                        <motion.div
                            className="text-4xl"
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            🎲
                        </motion.div>
                    </motion.div>
                )}

                {status === "reveal" && (
                    <motion.div
                        key="reveal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center gap-4 cursor-pointer"
                        onClick={handleSkipReveal}
                    >
                        <motion.span
                            className="font-semibold text-slate-700 bg-white/40 backdrop-blur-sm rounded-lg px-4 py-2"
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                        >
                            You picked
                        </motion.span>

                        <motion.div
                            className="text-4xl font-bold italic text-blue-600"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.2
                            }}
                        >
                            {number}
                        </motion.div>
                    </motion.div>
                )}

                {status === "pending_action" && (
                    <motion.div
                        key="pending"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-center gap-4 w-full px-4"
                    >
                        <Button
                            onClick={handleBack}
                            className="flex flex-row items-center justify-center gap-1 flex-1 text-sm px-2 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-700 border-red-300/50"
                        >
                            <span>←</span>
                            <span>{number}</span>
                            <span>back</span>
                        </Button>
                        <Button
                            onClick={handleForward}
                            className="flex flex-row items-center justify-center gap-1 flex-1 text-sm px-2 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-700 border-green-300/50"
                        >
                            <span>{number}</span>
                            <span>forward</span>
                            <span>→</span>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const JollyRogerStopPanel = () => {
    const position = useGameStore((state) => state.position);
    const poneglyph = useGameStore((state) => state.poneglyph);

    const hasJollyRogerStop = (TILE_POSITION.JOLLYROGER_STOP as readonly number[]).includes(position);

    const text = useMemo(() => {
        if (poneglyph >= 4) return "Ready!"

        return `Need ${4 - poneglyph} more`
    }, [poneglyph]);

    const handleJollyRogerClick = () => {
        console.log('Jolly Roger button clicked! Poneglyph:', poneglyph);
        if (poneglyph >= 4) {
            takeJollyrogerEvent();
        }
    };

    return (
        <AnimatePresence initial={false}>
            {hasJollyRogerStop && (
                <motion.div
                    className="absolute right-10 top-12 w-40 flex items-center px-4 justify-between bg-white/90 backdrop-blur-xl rounded-2xl h-20 border border-white/50 shadow-lg z-50 pointer-events-auto"
                    animate={{
                        x: 0,
                        transition: { delay: 1, duration: 0.4, type: "spring", bounce: 0 },
                    }}
                    initial={{ x: "-100%" }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0 }}
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 rounded-t-2xl" />

                    <motion.span
                        className="relative font-semibold leading-none text-slate-700 text-xs"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        {text}
                    </motion.span>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.4 }}
                        className="relative z-10"
                    >
                        <Button
                            className="text-sm px-3 py-2 shadow-lg min-w-[40px] min-h-[40px] cursor-pointer hover:scale-105 transition-transform"
                            onClick={handleJollyRogerClick}
                            disabled={poneglyph < 4}
                        >
                            🏴‍☠️
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )


};


