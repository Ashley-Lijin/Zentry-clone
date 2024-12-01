import { useRef, useState } from "react";
import Button from "./button.jsx";
import { TiLocationArrow } from "react-icons/ti";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLaading, setIsLaading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 3;
  const nextVideoRef = useRef(null);

  const upCommingVideoIndex = (currentIndex % totalVideos) + 1;

  const handelMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upCommingVideoIndex);
  };

  const handelVideoLaod = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
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
                src={getVideoSrc(upCommingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handelVideoLaod}
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
