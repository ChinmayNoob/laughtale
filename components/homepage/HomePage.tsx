"use client"
import React, { useRef } from 'react';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'motion/react';
import { cn } from '@/utils/common';

export const HomePage = () => {
    useSmoothScroll();
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    const welcomeScale = useTransform(scrollYProgress, [0.5, 1], [0, 4]);
    const welcomeOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    const portalScale = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const portalRotate = useTransform(scrollYProgress, [0, 1], [0, 180])

    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 7]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

    const logoScale = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
    const logoNameScale = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
    const logoNameY = useTransform(scrollYProgress, [0.9, 1], [80, 0]);

    const pictures = [
        {
            src: '/hero/wano.png',
            scale: welcomeScale,
            opacity: welcomeOpacity,
        },
        {
            src: '/characters/luffy.png',
            scale: scale5,
            styles: {
                top: '-35vh',
                left: '0vw',
                width: '10vw',
                height: '25vh',
            }
        },
        {
            src: '/characters/ace.png',
            scale: scale5,
            styles: {
                top: '-32vh',
                left: '-15vw',
                width: '18vw',
                height: '27vh',
            }
        },
        {
            src: '/characters/shanks.png',
            scale: scale6,
            styles: {
                top: '-10vh',
                left: '-25vw',
                width: '10vw',
                height: '25vh',
            }
        },
        {
            src: '/characters/zoro.png',
            scale: scale5,
            styles: {
                top: '-32vh',
                left: '15vw',
                width: '10vw',
                height: '25vh'
            }
        },
        {
            src: '/characters/sanji.png',
            scale: scale9,
            styles: {
                top: '-10vh',
                left: '25vw',
                width: '10vw',
                height: '25vh',
            }
        },
        {
            src: '/characters/law.png',
            scale: scale5,
            styles: {
                top: '15vh',
                left: '20vw',
                width: '10vw',
                height: '25vh',
            }
        },
        {
            src: '/characters/kidd.png',
            scale: scale6,
            styles: {
                top: '35vh',
                left: '-8vw',
                width: '10vw',
                height: '25vh',
            }
        },
        {
            src: '/characters/sabo.png',
            scale: scale8,
            styles: {
                top: '17vh',
                left: '-20vw',
                width: '10vw',
                height: '25vh',
            }
        },
        {
            src: '/characters/ussop.png',
            scale: scale5,
            styles: {
                top: '35vh',
                left: '8vw',
                width: '10vw',
                height: '25vh',
            }
        }
    ];

    return (
        <main ref={container} className="h-[300vh] relative">
            <div className="sticky overflow-hidden top-0 h-screen bg-black">
                <motion.div className="relative w-full h-screen" style={{ scale: bgScale, opacity: 0.7 }}>
                    <Image
                        src="/hero/wano-day.jpg"
                        alt=""
                        fill
                    />
                </motion.div>
                <motion.div
                    id="portal"
                    style={{ scale: portalScale, rotateZ: portalRotate }}
                    className="w-full h-full top-0 absolute flex items-center justify-center"
                >
                    <div className="relative w-[20vw] h-[35vh]">
                        <Image
                            src="/ship/sunny.png"
                            alt=""
                            fill
                        />
                    </div>
                </motion.div>
                {pictures.map((picture, index) => {
                    return (
                        <motion.div
                            key={index}
                            style={{ scale: picture.scale, opacity: picture.opacity }}
                            className={cn("w-full h-full top-0 absolute flex items-center justify-center", {
                                'z-10': index === 0,
                            })}
                        >
                            <div
                                style={picture.styles}
                                className="relative w-[25vw] h-[25vh]"
                            >
                                <Image
                                    src={picture.src}
                                    alt=""
                                    fill
                                />
                                {index === 0 && (
                                    <div className="absolute z-1 h-full w-full flex items-center justify-center flex-col">
                                        <div className="flex flex-col items-center">
                                            <motion.div className="relative w-[6vw] h-[2vw]" style={{ scale: logoNameScale, y: logoNameY }}>
                                                <Image
                                                    src="/one-piece-logo.png"
                                                    alt=""
                                                    fill
                                                />
                                            </motion.div>
                                            <motion.div
                                                className="relative w-[12vw] h-[18vh]"
                                                style={{ scale: logoScale, y: -20, x: -5 }}
                                            >
                                                <Image
                                                    src="/hero/strawhats.png"
                                                    alt="one piece logo"
                                                    fill
                                                />
                                            </motion.div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </main>
    );
};

