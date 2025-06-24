import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { useEventListener } from "@/hooks/window-events";
import { EVENTS } from "@/lib/events";
import Button from "./button";
import { useGameStore } from "@/lib/game-store";
import { ChevronLeft, Crown } from "lucide-react";
import Image from "next/image";

type Step = "idle" | "dice" | "reveal" | "result";

export const FinalWar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [step, setStep] = useState<Step>("idle");
    const [number, setNumber] = useState(0);

    const poneglyph = useGameStore((state) => state.poneglyph);
    const handleFinalWar = useGameStore((state) => state.handleFinalWar);

    const havePassed = useMemo(() => {
        return number + poneglyph >= 10;
    }, [number, poneglyph]);

    useEventListener(EVENTS.TAKE_JOLLYROGER, () => {
        setIsOpen(true);
    });

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleStart = () => {
        setStep("dice");
    };

    const handleRoll = () => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        setNumber(randomNumber);
        setStep("reveal");

        setTimeout(() => {
            setStep("result");
        }, 2000);
    };

    const handleRestart = useCallback(() => {
        handleFinalWar(havePassed ? "win" : "lose");
        setIsOpen(false);
        setStep("idle");
    }, [havePassed, handleFinalWar]);

    const currentStep = useMemo(() => {
        switch (step) {
            case "idle":
                return <IdleStep onStep={handleStart} onBack={handleClose} />;
            case "dice":
                return <DiceStep onRoll={handleRoll} />;
            case "reveal":
                return <RevealStep number={number} />;
            case "result":
                if (havePassed)
                    return <WinStep number={number} onStep={handleRestart} />;
                return <LoseStep number={number} onStep={handleRestart} />;
        }
    }, [step, number, havePassed, handleRestart]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto"
                    style={{
                        background: "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(30,30,80,0.9))"
                    }}
                    onClick={handleClose}
                >
                    <div
                        className="relative font-pp-editorial w-full h-full min-h-screen overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "linear-gradient(180deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5))",
                            backdropFilter: "blur(10px)",
                            border: "2px solid rgba(255,215,0,0.3)"
                        }}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/hero/wano.png"
                                alt="Final War Background"
                                fill
                                className="object-cover opacity-30"
                                priority
                            />
                        </div>

                        {/* One Piece Logo */}
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
                            <Image
                                src="/logo/one-piece-logo.png"
                                alt="One Piece Logo"
                                width={200}
                                height={60}
                                className="drop-shadow-2xl"
                            />
                        </div>

                        {/* Content Container */}
                        <div className="relative z-10 p-8 pt-24 h-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5 }}
                                    className="h-full"
                                >
                                    {currentStep}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute bottom-4 left-4 opacity-50">
                            <Image
                                src="/characters/luffy.png"
                                alt="Luffy"
                                width={80}
                                height={80}
                                className="filter drop-shadow-lg"
                            />
                        </div>
                        <div className="absolute bottom-4 right-4 opacity-50">
                            <Image
                                src="/characters/zoro.png"
                                alt="Zoro"
                                width={80}
                                height={80}
                                className="filter drop-shadow-lg"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

interface IdleStepProps {
    onStep: () => void;
    onBack: () => void;
}

const IdleStep = ({ onStep, onBack }: IdleStepProps) => {
    return (
        <div className="flex flex-col items-center h-full">
            <button
                className="flex items-center self-start gap-2 py-2 px-4 mb-8 rounded-xl text-white/80 hover:text-white transition-colors bg-black/30 backdrop-blur-sm"
                onClick={onBack}
            >
                <ChevronLeft className="w-4 h-4" />
                Go back
            </button>

            <div className="text-center max-w-2xl">
                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-5xl font-bold text-white mb-8 drop-shadow-2xl"
                    style={{
                        textShadow: "0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.3)"
                    }}
                >
                    ⚔️ THE FINAL WAR ⚔️
                </motion.h1>

                <div className="mb-8 flex justify-center gap-8">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Image
                            src="/characters/shanks.png"
                            alt="Shanks"
                            width={120}
                            height={120}
                            className="filter drop-shadow-2xl"
                        />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-yellow-400/30"
                >
                    <p className="text-white/90 leading-relaxed text-lg">
                        The ultimate battle has arrived! Face the <span className="text-red-400 font-bold">World Government&apos;s Five Elders</span> and <span className="text-purple-400 font-bold">Im-sama</span> while battling the notorious <span className="text-gray-300 font-bold">Blackbeard Pirates</span>.
                    </p>
                    <div className="my-4 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
                    <p className="text-yellow-300 font-semibold text-xl">
                        Claim the legendary treasure <span className="text-yellow-400">One Piece</span> and become the <span className="text-orange-400">Pirate King</span>!
                    </p>
                    <div className="my-4 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
                    <p className="text-white/80">
                        You need <span className="text-green-400 font-bold">10 or more combined power</span> to emerge victorious.
                        Failure means your crew scatters and your bounty is halved.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex justify-center"
                >
                    <Button
                        className="px-8 py-4 text-xl font-bold rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-4"
                        onClick={onStep}
                    >
                        <Image src="/common/skull-logo.png" alt="Skull" width={30} height={30} />
                        BEGIN THE FINAL WAR!
                        <Image src="/common/skull-logo.png" alt="Skull" width={30} height={30} />
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};

interface DiceStepProps {
    onRoll: () => void;
}

const DiceStep = ({ onRoll }: DiceStepProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
            >
                <h2 className="text-4xl font-bold text-white mb-8 drop-shadow-2xl">
                    ⚔️ BATTLE BEGINS! ⚔️
                </h2>

                <div className="mb-8">
                    <Image
                        src="/characters/luffy.png"
                        alt="Luffy Ready for Battle"
                        width={200}
                        height={200}
                        className="filter drop-shadow-2xl mx-auto"
                    />
                </div>

                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-yellow-400/30">
                    <p className="text-2xl font-semibold text-yellow-300 mb-4">
                        Roll for Battle Luck!
                    </p>
                    <p className="text-white/80">
                        Your fate in the final battle depends on this roll...
                    </p>
                </div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex justify-center"
                >
                    <Button
                        onClick={onRoll}
                        className="px-12 py-6 text-2xl font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl"
                    >
                        🎲 ROLL THE DICE! 🎲
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

interface RevealStepProps {
    number: number;
}

const RevealStep = ({ number }: RevealStepProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-center"
            >
                <h2 className="text-3xl font-bold text-white mb-8 drop-shadow-2xl">
                    ⚔️ BATTLE RESULT ⚔️
                </h2>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 1, times: [0, 0.6, 1] }}
                    className="relative mb-8"
                >
                    <div
                        className="text-9xl font-bold text-center p-8 rounded-full mx-auto w-48 h-48 flex items-center justify-center"
                        style={{
                            background: "radial-gradient(circle, rgba(255,215,0,0.3), rgba(255,140,0,0.1))",
                            border: "4px solid rgba(255,215,0,0.5)",
                            textShadow: "0 0 30px rgba(255,215,0,0.8)"
                        }}
                    >
                        <span className="text-yellow-400">{number}</span>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-white/80"
                >
                    The dice have spoken...
                </motion.p>
            </motion.div>
        </div>
    );
};

interface WinStepProps {
    number: number;
    onStep: () => void;
}

const WinStep = ({ number, onStep }: WinStepProps) => {
    const poneglyph = useGameStore((state) => state.poneglyph);

    return (
        <div className="flex flex-col items-center h-full">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center w-full max-w-3xl"
            >
                <motion.h1
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    className="text-6xl font-bold mb-8 flex items-center justify-center gap-4"
                    style={{
                        color: '#FFD700',
                        textShadow: "0 0 30px rgba(255,215,0,0.5)"
                    }}
                >
                    <Image src="/common/skull-logo.png" alt="Victory" width={60} height={60} className="drop-shadow-2xl" />
                    <span>VICTORY!</span>
                    <Image src="/common/skull-logo.png" alt="Victory" width={60} height={60} className="drop-shadow-2xl" />
                </motion.h1>

                <div className="mb-8 flex justify-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Crown className="w-24 h-24 text-yellow-400 drop-shadow-2xl" />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-yellow-400/50"
                >
                    <p className="text-2xl font-bold text-yellow-300 mb-4">
                        YOU ARE NOW THE PIRATE KING! 👑
                    </p>
                    <div className="text-xl text-white/90 space-y-2">
                        <p>Crew Strength: <span className="text-blue-400 font-bold">{poneglyph}</span></p>
                        <p>+ Battle Luck: <span className="text-green-400 font-bold">{number}</span></p>
                        <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent my-2"></div>
                        <p>= Total Power: <span className="text-yellow-400 font-bold text-2xl">{poneglyph + number}</span></p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-yellow-400/30"
                >

                    <p className="text-yellow-300 font-semibold text-xl">
                        The legendary treasure <span className="text-yellow-400">One Piece</span> is finally yours!
                    </p>
                    <div className="my-4 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>

                    <p className="text-white/80 mt-2">
                        Your name will echo through eternity as the one who conquered the Grand Line!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex justify-center"
                >
                    <Button
                        className="px-8 py-4 text-xl font-bold rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
                        onClick={onStep}
                    >
                        🌊 New Adventure 🌊
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

interface LoseStepProps {
    number: number;
    onStep: () => void;
}

const LoseStep = ({ number, onStep }: LoseStepProps) => {
    const poneglyph = useGameStore((state) => state.poneglyph);

    return (
        <div className="flex flex-col items-center h-full">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center w-full max-w-3xl"
            >
                <motion.h1
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    className="text-5xl font-bold text-red-400 mb-8 drop-shadow-2xl"
                >
                    ⚔️ DEFEAT ⚔️
                </motion.h1>

                <div className="mb-8 flex justify-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Image src="/common/skull-logo.png" alt="Defeat" width={80} height={80} className="drop-shadow-2xl filter grayscale" />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-red-900/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-red-400/50"
                >
                    <p className="text-xl font-bold text-red-300 mb-4">
                        The Final War has ended in defeat...
                    </p>
                    <div className="text-lg text-white/90 space-y-2">
                        <p>Crew Strength: <span className="text-blue-400 font-bold">{poneglyph}</span></p>
                        <p>+ Battle Luck: <span className="text-red-400 font-bold">{number}</span></p>
                        <div className="h-px bg-gradient-to-r from-transparent via-red-400 to-transparent my-2"></div>
                        <p>= Total Power: <span className="text-red-400 font-bold text-xl">{poneglyph + number}</span></p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-red-400/30"
                >
                    <p className="text-white/90 leading-relaxed mb-4">
                        The combined might of the <span className="text-red-400">World Government</span> and
                        <span className="text-gray-300"> Blackbeard Pirates</span> proved overwhelming.
                    </p>
                    <p className="text-red-300 font-semibold">
                        Your crew has been scattered and your bounty halved.
                    </p>
                    <div className="my-4 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
                    <p className="text-blue-300 font-semibold">
                        But this isn&apos;t the end! True pirates never give up on their dreams!
                    </p>
                    <p className="text-white/80 mt-2">
                        Rebuild your crew and return stronger than ever!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex justify-center"
                >
                    <Button
                        className="px-8 py-4 text-xl font-bold rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-4"
                        onClick={onStep}
                    >
                        <Image src="/common/skull-logo.png" alt="Skull" width={30} height={30} />
                        Continue Journey
                        <Image src="/common/skull-logo.png" alt="Skull" width={30} height={30} />
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};
