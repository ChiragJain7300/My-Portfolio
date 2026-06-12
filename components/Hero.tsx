import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { HeroParticles } from "./ui/HeroParticles";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 opacity-30">
        <HeroParticles />
        <div className="absolute top-[-25%] left-[-15%] w-[50vw] h-[50vw] min-w-[350px] min-h-[350px] rounded-full bg-purple/15 blur-[120px] animate-aurora-slow" />
        <div className="absolute top-[5%] right-[-15%] w-[45vw] h-[45vw] min-w-[300px] min-h-[300px] rounded-full bg-cyanAccent/10 blur-[100px] animate-aurora-medium" />
        <div className="absolute bottom-[10%] left-[10%] w-[50vw] h-[50vw] min-w-[350px] min-h-[350px] rounded-full bg-blue-500/10 blur-[130px] animate-aurora-fast" />
      </div>

      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            FULL STACK DEVELOPER BASED IN INDIA
          </p>

          <TextGenerateEffect
            words="Code That Thinks, Interfaces That Feel"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl text-gray-400">
            Hey, I&apos;m Chirag — I build fast, modern web apps from database
            to design.
          </p>

          <a href="#about">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
