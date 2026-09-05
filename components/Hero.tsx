import { cn } from "@/lib/utils";
import { Spotlight } from "./ui/spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";



const Hero = () => {
  return (
    <div className="relative h-[90vh] overflow-hidden pb-20 pt-36">
      <div>
        {/* <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        /> */}
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20"
          fill="white"
        />
        {/* <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        /> */}
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

           
      <div
        className={cn(
          "absolute inset-0",
          "bg-size-[80px_80px]",
          "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_.5px),linear-gradient(to_bottom,#262626_.4px,transparent_.6px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black-100"></div>
      {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,black_35%,transparent_100%)] dark:bg-black-100"></div> */}
    
      {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white-100 mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black-100"></div> */}
    


      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
         
          <TextGenerateEffect
            words="Transforming Concepts into Finished Products"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

        </div>
      </div>
    </div>
  );
};

export default Hero;
