'use client'
import { cn } from "@/utils/common";

import { useGameStore } from "@/lib/game-store";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { EVENTS } from "@/lib/events";

import { useEventListener } from "@/hooks/window-events";
import { useMount } from "@/hooks/use-mount";

import { Panel } from "./panel";

export const Controls = () => {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed z-30 flex h-32 mt-auto -translate-x-1/2 bottom-6 left-1/2"
        >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-white backdrop-blur-xl rounded-3xl shadow-2xl" />

            {/* Inner shadow for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-3xl" />

            <div className="relative flex rounded-3xl">
                <div className="flex flex-col w-24 h-full overflow-hidden">
                    <Berries />
                    <div className="w-full h-px bg-black/20 my-0.5" />
                    <Poneglyphs />
                </div>
                <div className="overflow-hidden">
                    <Panel />
                </div>
                <Cards />
            </div>
        </motion.div>
    );
};

const Berries = () => {
    const berries = useGameStore((state) => state.berries);
    const [isHovered, setIsHovered] = useState(false);

    const image = useMemo(
        () => (
            <motion.img
                src="/common/berries.png"
                alt="Berries"
                width={24}
                height={24}
                className="drop-shadow-lg"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
        ),
        []
    );

    return (
        <div
            className="flex flex-col items-center w-full overflow-hidden group/gem h-1/2 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated background gradient */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400/40 via-orange-400/40 to-red-400/40"
                animate={{
                    opacity: isHovered ? 0.8 : 0.3,
                    scale: isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
            />

            <motion.span
                className="text-yellow-600 text-2xl font-bold italic mt-2 relative z-10"
                animate={{
                    scale: isHovered ? 0.95 : 1,
                    y: isHovered ? -2 : 0
                }}
                transition={{ duration: 0.3 }}
            >
                {berries}
            </motion.span>

            <div className="relative flex items-center -mt-1 z-10">
                <motion.div
                    className="translate-y-0.5 translate-x-1.5 -rotate-12"
                    animate={{
                        y: isHovered ? -8 : 2,
                        rotate: isHovered ? -5 : -12,
                        scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.4, delay: 0 }}
                >
                    {image}
                </motion.div>
                <motion.div
                    className="translate-y-1 z-10 relative"
                    animate={{
                        y: isHovered ? -12 : 4,
                        scale: isHovered ? 1.2 : 1
                    }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    {image}
                </motion.div>
                <motion.div
                    className="-translate-x-1.5 translate-y-0.5 rotate-6"
                    animate={{
                        y: isHovered ? -8 : 2,
                        rotate: isHovered ? 12 : 6,
                        scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    {image}
                </motion.div>

                {/* Glowing effect */}
                <motion.div
                    className="absolute inset-0 inset-x-1 bg-gradient-to-t from-yellow-400/50 to-transparent rounded-full blur-sm"
                    animate={{ opacity: isHovered ? 0 : 0.6 }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </div>
    );
};

const Poneglyphs = () => {
    const poneglyph = useGameStore((state) => state.poneglyph);
    const [isHovered, setIsHovered] = useState(false);

    const image = useMemo(
        () => (
            <motion.img
                src="/common/poneglyph.png"
                alt="Poneglyphs"
                width={24}
                height={24}
                className="drop-shadow-lg"
                whileHover={{ scale: 1.1, rotate: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
        ),
        []
    );

    return (
        <div
            className="flex flex-col items-center w-full overflow-hidden group/gem h-1/2 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated background gradient */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/40 via-purple-400/40 to-indigo-400/40"
                animate={{
                    opacity: isHovered ? 0.8 : 0.3,
                    scale: isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
            />

            <motion.span
                className="text-blue-600 text-2xl font-bold italic mt-2 relative z-10"
                animate={{
                    scale: isHovered ? 0.95 : 1,
                    y: isHovered ? -2 : 0
                }}
                transition={{ duration: 0.3 }}
            >
                {poneglyph}
            </motion.span>

            <div className="relative flex items-center -mt-1 z-10">
                <motion.div
                    className="translate-y-0.5 translate-x-1.5 -rotate-12"
                    animate={{
                        y: isHovered ? -8 : 2,
                        rotate: isHovered ? -5 : -12,
                        scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.4, delay: 0 }}
                >
                    {image}
                </motion.div>
                <motion.div
                    className="translate-y-1 z-10 relative"
                    animate={{
                        y: isHovered ? -12 : 4,
                        scale: isHovered ? 1.2 : 1
                    }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    {image}
                </motion.div>
                <motion.div
                    className="-translate-x-1.5 translate-y-0.5 rotate-6"
                    animate={{
                        y: isHovered ? -8 : 2,
                        rotate: isHovered ? 12 : 6,
                        scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    {image}
                </motion.div>

                {/* Glowing effect */}
                <motion.div
                    className="absolute inset-0 inset-x-1 bg-gradient-to-t from-blue-400/30 to-transparent rounded-full blur-sm"
                    animate={{ opacity: isHovered ? 0 : 0.6 }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </div>
    );
};

const generateId = () => {
    return Math.random().toString(36).substring(2, 10);
};

const Cards = () => {
    const [deck, setDeck] = useState(Array.from({ length: 8 }, generateId));
    const [isHovered, setIsHovered] = useState(false);

    useEventListener(EVENTS.DRAW_CARD, () => {
        setDeck((d) => d.slice(0, -1));
        setTimeout(() => setDeck((d) => [generateId()].concat(d)), 1000);
    });

    const mounted = useMount();

    if (!mounted) return null;

    return (
        <div
            className="relative flex flex-col items-center justify-center w-48 h-full border-l border-white/40 rounded-r-3xl bg-gradient-to-br from-slate-100/70 via-blue-50/0 to-indigo-100/30 backdrop-blur-sm"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Deck count indicator */}
            <motion.div
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-slate-700 shadow-lg border border-white/50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
            >
                {deck.length}
            </motion.div>

            {/* Cards label */}
            <motion.div
                className="absolute top-4 left-4 text-sm font-semibold text-slate-600/80"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                Cards
            </motion.div>

            <div className="overflow-visible h-48 absolute bottom-4 w-[10rem] group/cards">
                <AnimatePresence>
                    {deck.map((id, index) => {
                        const isEven = index % 2 === 0;
                        const degree = Math.random() * 6 * (isEven ? 1 : -1);
                        const y = 8 + index * 1.5;
                        const x = Math.random() * 3 * (isEven ? 1 : -1);

                        return (
                            <motion.div
                                key={`card-${id}`}
                                initial={{ y, x: 0, scale: 0.8, opacity: 0 }}
                                animate={{
                                    y: isHovered && index < 3 ? y - 15 : y,
                                    x,
                                    scale: isHovered && index < 3 ? 1.05 : 1,
                                    opacity: 1,
                                    rotate: isHovered && index < 3 ? degree * 1.5 : (isEven ? 1 : -1),
                                    transition: {
                                        delay: isHovered ? index * 0.05 : index * 0.03,
                                        duration: isHovered ? 0.3 : 0.4,
                                        ease: "easeOut"
                                    }
                                }}
                                exit={{
                                    y: y + 1000,
                                    scale: 0.7,
                                    rotate: degree * 3,
                                    opacity: 0,
                                    transition: { duration: 0.8, ease: "easeIn" }
                                }}
                                whileHover={{
                                    scale: 1.15,
                                    rotate: 0,
                                    y: y - 30,
                                    zIndex: 100,
                                    transition: { duration: 0.2 }
                                }}
                                style={
                                    {
                                        "--random": `${degree}deg`,
                                        zIndex: deck.length - index,
                                    } as React.CSSProperties
                                }
                                className={cn(
                                    "w-28 absolute -translate-x-1/2 left-1/2 transition-all duration-300 transform-gpu cursor-pointer",
                                    "origin-bottom drop-shadow-xl",
                                    "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:to-transparent before:rounded-xl before:pointer-events-none",
                                    "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/5 after:to-transparent after:rounded-xl after:pointer-events-none",
                                    isEven ? "rotate-1" : "-rotate-1"
                                )}
                            >
                                <img
                                    src="/common/card.png"
                                    alt="Card"
                                    className="w-28 rounded-xl shadow-2xl border border-white/60 backdrop-blur-sm"
                                />

                                {/* Card shine effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-xl opacity-0"
                                    whileHover={{
                                        opacity: [0, 0.6, 0],
                                        transition: { duration: 0.6, repeat: Infinity }
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden rounded-r-3xl pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        animate={{
                            y: [-10, -100],
                            x: [Math.random() * 200, Math.random() * 200],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: '100%',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
