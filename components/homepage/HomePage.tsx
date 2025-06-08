"use client"
import React, { useRef, useState } from 'react';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/common';

export const HomePage = () => {
    useSmoothScroll();
    const [isHovered, setHovered] = useState(false);
    const router = useRouter();
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
            src: '/wano.png',
            scale: welcomeScale,
            opacity: welcomeOpacity,
        },
        {
            src: '/luffy.png',
            scale: scale5,
            styles: {
                top: '-35vh',
                left: '0vw',
                width: '10vw',
                height: '25vh',
            }
        },
        {
            src: '/ace.png',
            scale: scale5,
            styles: {
                top: '-32vh',
                left: '-15vw',
                width: '10vw',
                height: '25vh',
            }
        },
        {
            src: '/shanks.png',
            scale: scale6,
            styles: {
                top: '-10vh',
                left: '-25vw',
                width: '10vw',
                height: '25vh',
            }
        },
        {
            src: '/zoro.png',
            scale: scale5,
            styles: {
                top: '-32vh',
                left: '15vw',
                width: '10vw',
                height: '25vh'
            }
        },
        {
            src: '/sanji.png',
            scale: scale5,
            styles: {
                top: '-10vh',
                left: '25vw',
                width: '10vw',
                height: '25vh',
            }
        },
        {
            src: '/law.png',
            scale: scale5,
            styles: {
                top: '15vh',
                left: '20vw',
                width: '10vw',
                height: '25vh',
            }
        },
        {
            src: '/kidd.png',
            scale: scale6,
            styles: {
                top: '35vh',
                left: '-8vw',
                width: '10vw',
                height: '25vh',
            }
        },
        {
            src: '/sabo.png',
            scale: scale8,
            styles: {
                top: '17vh',
                left: '-20vw',
                width: '10vw',
                height: '25vh',
            }
        },
        {
            src: '/ussop.png',
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
                        src="/wano-day.jpg"
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
                            src="/sunny.png"
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
                                                role="button"
                                                aria-label="click to visit one piece world"
                                                onClick={() => {
                                                    router.push('/onepiece');
                                                }}
                                                className="relative w-[12vw] h-[18vh] cursor-pointer"
                                                style={{ scale: logoScale, y: -20 }}
                                                onMouseOver={() => setHovered(true)}
                                                onMouseLeave={() => setHovered(false)}
                                                variants={{
                                                    active: { scale: 1.05 },
                                                    inactive: { scale: 1 },
                                                }}
                                                animate={isHovered ? "active" : "inactive"}
                                                title="Click to visit one piece world"
                                            >
                                                <Image
                                                    src="/strawhats.png"
                                                    alt="clickable logo"
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

