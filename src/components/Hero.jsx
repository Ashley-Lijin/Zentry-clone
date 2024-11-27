import {useRef, useState} from "react";

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1)
    const [hasClicked, setHasClicked] = useState(false)
    const [isLaading, setIsLaading] = useState(true)
    const [loadedVideos, setLoadedVideos] = useState(0)

    const totalVideos = 3
    const nextVideoRef = useRef(null)

    const upCommingVideoIndex = (currentIndex % totalVideos) + 1


    const handelMiniVideoClick = () => {
        setHasClicked(true)
        setCurrentIndex(upCommingVideoIndex)
    }

    const handelVideoLaod = () => {
        setLoadedVideos((prev) => prev + 1)
    }

    const getVideoSrc = (index) => `/videos/hero-${index}.mp4`
    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            <div id='video-frame' className='relative h-dvh w-screen z-10 rounded-lg bg-blue-75'>
                <div>
                    <div className='clip-mask-path absolute-center absolute size-64 z-50 cursor-pointer rounded-lg overflow-hidden'>
                        <div className='origin-center scale-50 opacity-0 transition-all ease-in hover:opacity-100 hover:scale-100 duration-300' onClick={handelMiniVideoClick}>
                            <video ref={nextVideoRef}
                                   src={getVideoSrc(currentIndex + 1)}
                                   loop
                                   muted
                                   autoPlay
                                   id='current-video'
                                   className='size-64 origin-center scale-150 object-cover object-center'
                                   onLoadedData={handelVideoLaod}/>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Hero
