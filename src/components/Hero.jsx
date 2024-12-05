import { useEffect, useRef, useState } from "react";
import Button from "./button.jsx";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  const upComingVideoIndex = (currentIndex % totalVideos) + 1;

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos, totalVideos]);

  const handelMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upComingVideoIndex);
  };

  const handleVideoLoad = (index) => {
    console.log(`Video ${index} loaded`);
    setLoadedVideos((prev) => prev + 1);
  };

  // Animations

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          height: "100%",
          width: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 1,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true },
  );

  // scroll animation

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(6% 0%, 72% 4%, 95% 86%, 10% 97%)",
      borderRadius: "0% 0% 40% 5%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0$",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;
  console.log("Total Videos:", totalVideos, "Loaded Videos:", loadedVideos);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/*{isLoading && (*/}
      {/*  <div*/}
      {/*    className={*/}
      {/*      "flex-center absolute w-screen bg-violet-50 h-dvh z-[100] overflow-hidden"*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <div className={"three-body"}>*/}
      {/*      <div className={"three-body__dot"} />*/}
      {/*      <div className={"three-body__dot"} />*/}
      {/*      <div className={"three-body__dot"} />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
      <div
        id="video-frame"
        className="relative h-dvh w-screen z-10 rounded-lg bg-blue-75"
      >
        <div>
          <div className="clip-mask-path absolute-center absolute size-64 z-50 cursor-pointer rounded-lg overflow-hidden">
            <div
              className="origin-center scale-50 opacity-0 transition-all ease-in hover:opacity-100 hover:scale-100 duration-300"
              onClick={handelMiniVideoClick}
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upComingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={() => handleVideoLoad(upComingVideoIndex)}
              />
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute absolute-center z-10 invisible size-64 object-center object-cover"
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex,
            )}
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 object-cover object-center size-full"
          />
        </div>
        <div className={"absolute top-0 left-0 z-40 size-full"}>
          <div className="mt-24 px-5 sm:px-10 text-blue-75">
            <h1 className="special-font hero-heading ">
              Redefi<b>n</b>e
            </h1>
            <p className={"mb-5 max-w-64 font-robert-regular"}>
              Enter the metagame layer <br /> unleash the play economy
            </p>
            <Button
              id={"watch-trailer"}
              title={"Watch Trailer"}
              leftIcon={<TiLocationArrow />}
              containerClass={"flex-center !bg-yellow-300 gap-1"}
            />
          </div>
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 z-40 right-5 text-blue-75">
          G<b>a</b>ming
        </h1>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 ">
        G<b>a</b>ming
      </h1>
    </div>
  );
};
export default Hero;
