"use client"
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useScroll, useTransform, motion, useAnimation } from 'motion/react';
import { useRouter } from 'next/navigation';

interface Arc {
  name: string;
  background: string;
  character: string;
  summary: string;
  characterPosition: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
}

const arcs: Arc[] = [
  {
    name: "Arlong Park",
    background: "/arcs/arlong-park.png",
    character: "/nami.png",
    summary: "Nami's past is revealed as the Straw Hats face the tyrannical fishman Arlong who has enslaved her village for years. A tale of freedom and friendship.",
    characterPosition: {
      top: "20%",
      left: "70%",
      width: "25vw",
      height: "60vh"
    }
  },
  {
    name: "Alabasta",
    background: "/arcs/alabasta.png",
    character: "/luffy.png",
    summary: "The crew ventures into the desert kingdom of Alabasta to stop a civil war orchestrated by the Warlord Crocodile. Luffy faces his toughest opponent yet.",
    characterPosition: {
      top: "15%",
      left: "65%",
      width: "30vw",
      height: "70vh"
    }
  },
  {
    name: "Skypiea",
    background: "/arcs/skypiea.png",
    character: "/chopper.png",
    summary: "The Straw Hats are launched into the sky and discover the floating island of Skypiea, where they become entangled in a 400-year-old conflict.",
    characterPosition: {
      top: "25%",
      left: "70%",
      width: "20vw",
      height: "50vh"
    }
  },
  {
    name: "Water Seven",
    background: "/arcs/water-seven.png",
    character: "/franky.png",
    summary: "The crew arrives at the water city to repair their ship, but faces betrayal and the revelation of a dark conspiracy involving their beloved Going Merry.",
    characterPosition: {
      top: "20%",
      left: "65%",
      width: "25vw",
      height: "60vh"
    }
  },
  {
    name: "Enies Lobby",
    background: "/arcs/enies-lobby.png",
    character: "/robin.png",
    summary: "In a desperate mission to save Robin, the Straw Hats declare war on the World Government itself, showcasing the true power of their bonds.",
    characterPosition: {
      top: "15%",
      left: "70%",
      width: "25vw",
      height: "65vh"
    }
  }
];

const OnePiecePage = () => {
  const router = useRouter();
  const container = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // Entry animation similar to homepage
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 1.5, ease: "easeOut" }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [controls]);

  // Homepage-style transform animations
  const welcomeScale = useTransform(scrollYProgress, [0.2, 1], [0, 4]);
  const welcomeOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Portal-like rotation effect
  const portalRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const portalScale = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Create transforms for each arc section
  const getArcTransforms = (index: number) => {
    const totalArcs = arcs.length;
    const sectionStart = index / totalArcs;
    const sectionEnd = (index + 1) / totalArcs;
    const sectionMid = (sectionStart + sectionEnd) / 2;

    return {
      opacity: useTransform(
        scrollYProgress,
        [sectionStart - 0.1, sectionStart, sectionEnd, sectionEnd + 0.1],
        [0, 1, 1, 0]
      ),
      scale: useTransform(
        scrollYProgress,
        [sectionStart, sectionMid, sectionEnd],
        [0.8, 1, 0.8]
      ),
      textY: useTransform(
        scrollYProgress,
        [sectionStart, sectionStart + 0.1, sectionEnd - 0.1, sectionEnd],
        [100, 0, 0, -100]
      ),
      textOpacity: useTransform(
        scrollYProgress,
        [sectionStart, sectionStart + 0.1, sectionEnd - 0.1, sectionEnd],
        [0, 1, 1, 0]
      ),
      characterX: useTransform(
        scrollYProgress,
        [sectionStart, sectionStart + 0.1, sectionEnd - 0.1, sectionEnd],
        [200, 0, 0, -200]
      ),
      characterOpacity: useTransform(
        scrollYProgress,
        [sectionStart, sectionStart + 0.1, sectionEnd - 0.1, sectionEnd],
        [0, 1, 1, 0]
      )
    };
  };

  return (
    <main ref={container} className="h-[600vh] relative bg-black">
      {/* Entry Welcome Screen */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: hasEntered ? 0 : 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        style={{ pointerEvents: hasEntered ? 'none' : 'auto' }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-impact font-bold text-white mb-8 drop-shadow-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Welcome to the
          </motion.h1>
          <motion.div
            className="relative w-[20vw] h-[4vw] mx-auto mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Image
              src="/one-piece-logo.png"
              alt="One Piece Logo"
              fill
              className="object-contain"
            />
          </motion.div>
          <motion.p
            className="text-2xl text-white/80 font-pp-editorial"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Scroll to explore the Grand Line...
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Background with homepage-style scaling */}
      <div className="sticky overflow-hidden top-0 h-screen bg-black">
        <motion.div
          className="absolute inset-0 w-full h-full opacity-30"
        >
          <Image
            src="/wano-day.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Portal effect similar to homepage */}
        <motion.div
          style={{
            scale: portalScale,
            rotateZ: portalRotate,
            opacity: useTransform(scrollYProgress, [0, 0.95], [1, 0])
          }}
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          <div className="relative w-[15vw] h-[25vh]">
            <Image
              src="/sunny.png"
              alt="Portal"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Arc Progression with homepage-style transforms */}
        {arcs.map((arc, index) => {
          const transforms = getArcTransforms(index);

          return (
            <motion.div
              key={arc.name}
              style={{
                opacity: transforms.opacity,
                scale: transforms.scale
              }}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={controls}
            >
              {/* Background Image with scale transform */}
              <motion.div
                className="relative w-full h-full"
              >
                <Image
                  src={arc.background}
                  alt={`${arc.name} background`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </motion.div>

              {/* Arc Title with custom fonts */}
              <motion.div
                style={{
                  y: transforms.textY,
                  opacity: transforms.textOpacity
                }}
                className="absolute top-16 left-16 z-10"
              >
                <h1 className="text-6xl md:text-8xl font-canopee font-bold text-white mb-4 drop-shadow-2xl bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                  {arc.name}
                </h1>
              </motion.div>

              {/* Arc Summary with custom font */}
              <motion.div
                style={{
                  y: transforms.textY,
                  opacity: transforms.textOpacity
                }}
                className="absolute bottom-32 left-16 right-16 z-10"
              >
                <div className="max-w-2xl  p-6 rounded-lg backdrop-blur-sm">
                  <p className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-lg font-pp-editorial">
                    {arc.summary}
                  </p>
                </div>
              </motion.div>

              {/* Character Image */}
              <motion.div
                style={{
                  x: transforms.characterX,
                  opacity: transforms.characterOpacity,
                  ...arc.characterPosition
                }}
                className="absolute z-10"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={arc.character}
                    alt={`${arc.name} character`}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </motion.div>

              {/* Navigation hint for last arc */}
              {index === arcs.length - 1 && (
                <motion.div
                  style={{
                    opacity: transforms.textOpacity
                  }}
                  className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <motion.button
                    onClick={() => router.push('/')}
                    className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-pp-editorial font-bold text-xl rounded-lg shadow-2xl transition-all duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Return to Home
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed bottom-8 right-8 z-20"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hasEntered ? 1 : 0 }}
          transition={{ delay: 2 }}
        >
          <div className="w-2 h-32 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-red-500 rounded-full"
              style={{
                height: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
              }}
            />
          </div>
        </motion.div>

        {/* Arc Number Indicator with custom font */}

      </div>
    </main>
  );
};

export default OnePiecePage;