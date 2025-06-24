import { AnimatePresence, motion } from "motion/react";
import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { useEventListener } from "@/hooks/window-events";
import { useMount } from "@/hooks/use-mount";
import { EVENTS } from "@/lib/events";
import { PANEL_TRANSITION_DURATION_CARD_REVEAL, useGameStore } from "@/lib/game-store";

// Character images array with index and path
const characters = [
    { index: 0, image: "/characters/ace.png", name: "Ace" },
    { index: 1, image: "/characters/brook.png", name: "Brook" },
    { index: 2, image: "/characters/franky.png", name: "Franky" },
    { index: 3, image: "/characters/kidd.png", name: "Kidd" },
    { index: 4, image: "/characters/law.png", name: "Law" },
    { index: 5, image: "/characters/luffy.png", name: "Luffy" },
    { index: 6, image: "/characters/robin.png", name: "Robin" },
    { index: 7, image: "/characters/sabo.png", name: "Sabo" },
    { index: 8, image: "/characters/sanji.png", name: "Sanji" },
    { index: 9, image: "/characters/shanks.png", name: "Shanks" },
    { index: 10, image: "/characters/ussop.png", name: "Ussop" },
    { index: 11, image: "/characters/zoro.png", name: "Zoro" },
];

// Function to select a random character
const getRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
};

export const CardReveal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentCard } = useGameStore();
    const isMounted = useMount();

    // Generate a random character when component mounts or card opens
    const randomCharacter = useMemo(() => getRandomCharacter(), [isOpen]);

    const closeCard = useGameStore((state) => state.closeCard);

    useEventListener(EVENTS.DRAW_CARD, () => {
        setIsOpen(true);

        setTimeout(() => setIsOpen(false), PANEL_TRANSITION_DURATION_CARD_REVEAL);
    });

    useEventListener(EVENTS.CLOSE_CARD, () => {
        setIsOpen(false);
    });

    const handleClose = () => {
        setIsOpen(false);
        closeCard();
    };

    if (!isMounted) return null;

    return createPortal(
        <AnimatePresence>
            {/* Backdrop */}
            {isOpen && (
                <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm bg-black/30"
                    onClick={handleClose}
                />
            )}

            {/* Card */}
            {isOpen && (
                <motion.div
                    key="card"
                    className="fixed top-0 z-20 flex items-center justify-center h-screen p-4 -translate-x-1/2 left-1/2"
                    initial={{
                        y: "-100%",
                        scale: 0.5,
                        rotateY: 180,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        scale: 1,
                        rotateY: 0,
                        opacity: 1
                    }}
                    exit={{
                        y: "100%",
                        scale: 0.8,
                        opacity: 0,
                        rotateX: 90
                    }}
                    onClick={handleClose}
                    transition={{
                        duration: 1.2,
                        type: "spring",
                        bounce: 0.3,
                        staggerChildren: 0.2
                    }}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col gap-y-4 rounded-3xl min-w-64 max-w-72 aspect-[4/5.5] border-4 border-yellow-400 ring-4 ring-amber-200 shadow-2xl p-6 pt-4 relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="w-full h-full bg-repeat" style={{
                                backgroundImage: `url('/common/skull-logo.png')`,
                                backgroundSize: '60px 60px'
                            }} />
                        </div>

                        {/* Header with logos */}
                        <motion.div
                            className="flex items-center justify-between gap-2 relative z-10"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.img
                                src="/common/skull-logo.png"
                                alt="Skull Logo"
                                className="w-8 h-8"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            />
                            <motion.img
                                src="/logo/one-piece-logo.png"
                                alt="One Piece Logo"
                                className="h-6 object-contain flex-1"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
                            />
                            <motion.img
                                src="/common/skull-logo.png"
                                alt="Skull Logo"
                                className="w-8 h-8"
                                whileHover={{ rotate: -360 }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>

                        {/* Card Title */}
                        <motion.h1
                            className="text-2xl font-bold leading-none text-neutral-800 text-center relative z-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {currentCard?.title}
                        </motion.h1>

                        {/* Card Description */}
                        <motion.p
                            className="text-neutral-700 text-center relative z-10 text-sm leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            {currentCard?.description}
                        </motion.p>

                        <div className="grow" />

                        {/* Character Image with Animation */}
                        <motion.div
                            className="relative z-10 flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{
                                delay: 0.8,
                                duration: 1,
                                type: "spring",
                                bounce: 0.4
                            }}
                        >
                            <motion.div
                                className="relative"
                                whileHover={{
                                    scale: 1.1,
                                    rotateZ: [0, -5, 5, 0],
                                    y: -5
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.img
                                    src={randomCharacter.image}
                                    alt={randomCharacter.name}
                                    className="w-24 h-28 object-contain rounded-lg border-3 border-yellow-300 shadow-lg bg-white/50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                />
                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-lg bg-yellow-200 opacity-20 blur-sm -z-10" />
                            </motion.div>

                            <motion.p
                                className="text-xs font-semibold text-yellow-700 mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                {randomCharacter.name}
                            </motion.p>
                        </motion.div>

                        {/* Decorative elements */}
                        <motion.div
                            className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity
                            }}
                        />
                        <motion.div
                            className="absolute bottom-2 left-2 w-2 h-2 bg-orange-400 rounded-full"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 1
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};