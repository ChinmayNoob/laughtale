'use client'

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import Button from "./button";
import { useGameStore } from "@/lib/game-store";
import { BaseCardEffect, getSpawnConfig } from "@/lib/cards";
import { cn } from "@/utils/common";
import { PirateType } from "@/types/game";
import Image from "next/image";


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

        <div className="flex flex-col items-center gap-32">
            <Button
                className="text-lg scale-[4] active:translate-y-3 flex items-center gap-2"
                onClick={onNextStep}
            >
                <Image src="/common/skull-logo.png" alt="skull logo" width={50} height={50} />
                Start Game
            </Button>

            <p className="text-lg font-medium text-neutral-500">
                Explore the world of One Piece
            </p>
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
        <div className="flex flex-col gap-5 w-76">
            {/* Pirate Type and Spawn Island */}
            <div className="relative flex flex-col items-center gap-2 pt-3 pb-1 overflow-hidden rounded-2xl h-36 shadow-[0px_-2px_28.6px_0px_#C6D86B_inset]">
                <img
                    src="/common/bg.webp"
                    alt="background"
                    className="absolute inset-0 bg-cover -z-10"
                />
                <div className="flex flex-col items-center w-full text-center text-white mix-blend-overlay">
                    <p className="text-sm font-medium">You are born as</p>
                    <p className="text-xl font-semibold leading-none">
                        {spawnConfig.name}
                    </p>
                </div>
                <img
                    src={`/islands/${spawnConfig.island}.png`}
                    alt={spawnConfig.island}
                    className="size-20"
                />
            </div>

            {/* Description */}
            <div className="px-1 mt-2 space-y-2">
                <p className="font-medium">Neighborhood</p>
                <p className=" text-neutral-500">{spawnConfig?.description}</p>
            </div>

            {/* Starting stats */}
            <div className="px-1 space-y-2">
                <p className="font-medium">You start with</p>

                <div className="flex items-center gap-3.5">
                    <div
                        className={cn(
                            "flex items-center gap-2 text-3xl italic font-semibold",
                            getEffectColor("berries")
                        )}
                    >
                        {berries}
                        <div className="scale-80">
                            <EffectImage type="berries" />
                        </div>
                    </div>

                    <span className="text-2xl italic font-semibold text-neutral-400">
                        &
                    </span>

                    <div
                        className={cn(
                            "flex items-center gap-3 text-3xl italic font-semibold",
                            getEffectColor("poneglyph")
                        )}
                    >
                        {poneglyph} {<EffectImage type="poneglyph" size="lg" />}
                    </div>
                </div>
            </div>

            <Button className="mt-5 mr-auto" onClick={startGame}>
                Start Game
            </Button>
        </div>
    );
};