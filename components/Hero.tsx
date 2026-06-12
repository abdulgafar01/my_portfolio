import { Spotlight } from "./ui/spotlight";



const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Dynamic Web Magic with Next.js
          </p>


        </div>
      </div>
    </div>
  );
};

export default Hero;
