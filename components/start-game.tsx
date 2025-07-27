'use client'

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import Button from "./button";
import { useGameStore } from "@/lib/game-store";
import { BaseCardEffect, getSpawnConfig } from "@/lib/cards";
import { cn } from "@/utils/common";
import { PirateType } from "@/types/game";
import Image from "next/image";
import Link from "next/link";


export const getEffectColor = (type: BaseCardEffect["type"]) => {
    return type === "berries" ? "text-[#3EBDFE]" : "text-[#F25885]";
};
interface EffectImageProps {
    type: BaseCardEffect["type"];
    size?: "sm" | "md" | "lg";
}

export const EffectImage = ({ type, size = "md" }: EffectImageProps) => {
    const isGems = type === "berries";
    if (isGems)
        return (
            <img
                src="/common/berries.png"
                alt="Berries"
                className={cn(
                    "size-8",
                    size === "sm" && "size-4",
                    size === "lg" && "size-10"
                )}
            />
        );
    return (
        <img
            src="/common/poneglyph.png"
            alt="Poneglyph"
            className={cn(
                "size-8",
                size === "sm" && "size-4",
                size === "lg" && "size-10"
            )}
        />

    );
};

export const StartGame = () => {
    const [step, setStep] = useState<"first" | "second">("first");

    const handleNextStep = () => {
        setStep("second");
    };

    const currentStep = useMemo(() => {
        switch (step) {
            case "first":
                return <Step1 onNextStep={handleNextStep} />;
            case "second":
                return <Step2 />;
            default:
                return null;
        }
    }, [step]);

    return (
        <div className="fixed inset-0 z-10 flex flex-col items-center justify-center w-full h-full bg-white gap-28">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {currentStep}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const Step1 = ({ onNextStep }: { onNextStep: () => void }) => {
    return (
        <div className="flex flex-col items-center gap-20 w-full max-w-lg mx-auto px-8">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-4"
            >
                <Image
                    src="/logo/one-piece-logo.png"
                    alt="One Piece Logo"
                    width={400}
                    height={120}
                    className="object-contain"
                />
                <p className="text-2xl text-gray-600 max-w-sm font-pp-editorial">
                    Embark on an epic adventure across the Grand Line
                </p>
            </motion.div>

            {/* Main Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <Button
                    className="text-2xl font-semibold font-pp-editorial px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl shadow-lg hover:shadow-xl flex items-center gap-3 transform hover:scale-105 transition-all duration-200"
                    onClick={onNextStep}
                >
                    <Image
                        src="/common/skull-logo.png"
                        alt="skull logo"
                        width={36}
                        height={36}
                    />
                    Start Adventure
                </Button>
            </motion.div>

            {/* Simple description */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-base text-gray-500 text-center"
            >
                Ready to become the next Pirate King?
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <Link
                    href="/"
                    className="text-xl font-semibold font-pp-editorial px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl flex items-center gap-3 transform hover:scale-105 transition-all duration-200"
                >
                    <Image
                        src="/common/skull-logo.png"
                        alt="skull logo"
                        width={36}
                        height={36}
                    />
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
};

const Step2 = () => {
    const changeState = useGameStore((state) => state.changeState);
    const pirateType = useGameStore((state) => state.location as PirateType);
    const berries = useGameStore((state) => state.berries);
    const poneglyph = useGameStore((state) => state.poneglyph);

    const spawnConfig = getSpawnConfig(pirateType);

    const startGame = () => {
        changeState("playing");
    };

    return (
        <div className="flex flex-col gap-6 w-96 font-pp-editorial">
            {/* Pirate Type and Spawn Island */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative flex flex-col items-center gap-3 pt-6 pb-4 overflow-hidden rounded-3xl h-44 shadow-2xl border border-gray-200/50"
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <img
                    src="/common/bg.webp"
                    alt="background"
                    className="absolute inset-0 object-cover opacity-30 mix-blend-overlay"
                />

                <div className="relative z-10 flex flex-col items-center w-full text-center text-white">
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm font-medium tracking-wide opacity-90"
                    >
                        You are born as
                    </motion.p>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-2xl font-bold leading-none tracking-wide drop-shadow-lg"
                    >
                        {spawnConfig.name}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                    className="relative z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full"
                >
                    <img
                        src={`/islands/${spawnConfig.island}.png`}
                        alt={spawnConfig.island}
                        className="size-20 drop-shadow-lg"
                    />
                </motion.div>
            </motion.div>

            {/* Description */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="px-6 py-4 mt-2 space-y-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200/50 shadow-lg"
            >
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="font-semibold text-gray-800">Description</p>
                </div>
                <p className="text-gray-600 leading-relaxed pl-4">{spawnConfig?.description}</p>
            </motion.div>

            {/* Starting stats */}
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="px-6 py-5 space-y-4 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-2xl border border-orange-200/50 shadow-lg"
            >
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <p className="font-semibold text-gray-800">You start with</p>
                </div>

                <div className="flex items-center justify-center gap-4 py-2 flex-wrap">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring", stiffness: 150 }}
                        className={cn(
                            "flex flex-col items-center gap-2 text-3xl italic font-bold px-3 py-3 rounded-xl bg-white/60 backdrop-blur-sm shadow-md min-w-0",
                            getEffectColor("berries")
                        )}
                    >
                        <div className="flex items-center gap-2">
                            {berries}
                            <div className="scale-75">
                                <EffectImage type="berries" />
                            </div>
                        </div>
                        <span className="text-sm font-normal text-gray-600 whitespace-nowrap">million berries</span>
                    </motion.div>

                    <motion.span
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="text-2xl italic font-bold text-orange-400"
                    >
                        &
                    </motion.span>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2, type: "spring", stiffness: 150 }}
                        className={cn(
                            "flex flex-col items-center gap-2 text-3xl italic font-bold px-3 py-3 rounded-xl bg-white/60 backdrop-blur-sm shadow-md min-w-0",
                            getEffectColor("poneglyph")
                        )}
                    >
                        <div className="flex items-center gap-2">
                            {poneglyph}
                            <div className="scale-75">
                                <EffectImage type="poneglyph" size="lg" />
                            </div>
                        </div>
                        <span className="text-sm font-normal text-gray-600 whitespace-nowrap">poneglyphs</span>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="mt-6"
            >
                <Button
                    className="w-full text-lg py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200"
                    onClick={startGame}
                >
                    <span className="flex items-center justify-center gap-2">
                        <Image src="/common/skull-logo.png" alt="skull logo" width={24} height={24} />
                        Start Your Adventure
                    </span>
                </Button>
            </motion.div>
        </div>
    );
};