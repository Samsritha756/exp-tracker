import { useState, useEffect } from "react";

export const useWindowSize = () => {
    const [Size, setSize] = useState([
        window.innerWidth,
        0
    ]);

    useEffect(() => {
        const updateSize = () => {
            setSize([
                window.innerWidth,
                window.innerHeight,
            ]);
        };

        window.addEventListener("resize", updateSize);
        updateSize();

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return {
        width: size[0],
        height: size[1]
    }
};

export default useWindowSize;