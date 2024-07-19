import { createContext, ReactNode, useEffect, useState } from "react";
import { getTheme, ThemeName } from "../style/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";

const DEFAULT_THEME_NAME = "light";
const THEME_LOCALSTORAGE_KEY = "book_store_theme";

interface State {
    themeName: ThemeName;
    toggleTheme: () => void;
};

export const state = {
    themeName: DEFAULT_THEME_NAME as ThemeName,
    toggleTheme : () => {},
};

export const ThemeContext = createContext<State>(state); // 초기값 : state

// provider
export const BookStoreThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);

    const toggleTheme = () => {
        console.log('toggleTheme');
        setThemeName(themeName === "light" ? "dark" : "light");

        // 테마 저장하는 부분
        localStorage.setItem(THEME_LOCALSTORAGE_KEY, themeName === "light" ? "dark" : "light");
    };

    // 초기값을 받아오는 역할
    useEffect(() => {
        const savedThemeName = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as ThemeName;
        // localStrogae에 저장된 savedThemeName이 있을 경우 적용을 하고, 없을 경우 DEFAULT_THEME_NAME 적용
        setThemeName(savedThemeName || DEFAULT_THEME_NAME);
    }, []);

    return (
        // themeName이라는 일관된 state 참조하면서 theme도 children 구독시켜줄 수 있음
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={getTheme(themeName)}>
                <GlobalStyle themeName={themeName}/>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};