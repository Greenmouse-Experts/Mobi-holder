import React, { useState, useEffect } from 'react';

function SplashScreen({ clearScreen }) {
    const [progress, setProgress] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress < 100) {
                    return oldProgress + 1;
                } else {
                    clearInterval(progressInterval);
                    clearScreen(true)
                    return 100;
                }
            });
        }, 50); // Adjust the speed as needed

        const logoInterval = setInterval(() => {
            setFadeIn((prevFade) => !prevFade);
        }, 1000); // Change logo fade every 2 seconds

        return () => {
            clearInterval(progressInterval);
            clearInterval(logoInterval);
        };
    }, []);

    // Effect to handle when the progress reaches 100% and trigger the screen clear
    useEffect(() => {
        if (progress === 100) {
            clearScreen(true);
        }
    }, [progress, clearScreen]);

    // Function to interpolate between two RGBA colors
    const interpolateColor = (color1, color2, factor) => {
        const result = color1.slice(); // Copy the color1 array
        for (let i = 0; i < 4; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        }
        return `rgba(${result[0]}, ${result[1]}, ${result[2]}, ${result[3]})`;
    };

    // RGBA colors as arrays [R, G, B, A]
    const color1 = [163, 36, 242, 1]; // rgba(163, 36, 242, 1)
    const color2 = [36, 46, 242, 1];  // rgba(36, 46, 242, 1)

    // Calculate the current color based on progress
    const currentColor = interpolateColor(color1, color2, progress / 100);

    return (
        <div className='absolute w-full flex justify-center'>
            <div className="flex flex-col items-center justify-center h-screen w-3/4 lg:w-[300px] md:w-[300px]">
                <div className={`${fadeIn ? 'animate__animated animate__fadeIn' : 'animate__animated animate__fadeOut'}`}>
                    <div className='flex justify-center gap-3 -ml-2'>
                        <img src="/mobiHolder.svg" alt="Logo" className="w-[64px] h-[64px] object-contain" />
                        <div className='flex flex-col justify-center'>
                            <span className='text-3xl mt-1 font-semibold'>MobiHolder</span>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-6 bg-white rounded-full h-1">
                    <div
                        className="h-full rounded-full transition-all duration-100"
                        style={{ width: `${progress}%`, backgroundColor: currentColor }}
                    ></div>
                </div>

                <p className="mt-4 text-gray-500">{progress}%</p>
            </div>
        </div>
    );
};

export default SplashScreen;