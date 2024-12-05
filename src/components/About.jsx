import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
const About = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });
    tl.to(".mask-clip-path", {
      height: "100vh",
      width: "100vw",
      borderRadius: "0 0 0 0",
    });
  });
  return (
    <div id="about" className={"min-h-screen w-screen"}>
      <div className={"relative gap-5 mt-36 mb-18 flex flex-col items-center "}>
        <h2 className={"font-general text-sm uppercase md:text-[10px]"}>
          Welcome to zentry
        </h2>
        <h1
          className={
            "mt-5 text-4xl text-center uppercase md:text-[6rem] leading-[0.8]"
          }
        >
          Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared adventure
        </h1>
        <div className={"about-subtext"}>
          <p>The game of game begins-your life, now an epic MMORPG</p>
          <p>Zentry unites countless players for diffrent games</p>
        </div>
      </div>

      <div className={"h-dvh w-screen"} id={"clip"}>
        <div className={"mask-clip-path about-image"}>
          <img
            src={"img/about.webp"}
            alt={"Background image"}
            className={"absolute left-0 top-0 size-full object-cover"}
          />
        </div>
      </div>
    </div>
  );
};
export default About;
