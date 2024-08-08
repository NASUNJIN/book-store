import { getTheme } from "@/style/theme";
import { useEffect, useState } from "react"

export const useMediaQuery = () => {
    // 최대 크기가 768xp 이하라면 모바일로 간주
    const [isMobile, setIsMobile] = useState(window.matchMedia(getTheme("light").mediaQuery.mobile).matches);

    useEffect(() => {
        const isMobileQuery = window.matchMedia(getTheme("light").mediaQuery.mobile);

        setIsMobile(isMobileQuery.matches);
    }, [isMobile]);

    return { isMobile };
};