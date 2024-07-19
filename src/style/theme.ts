export type ThemeName = "light" | "dark";
export type ColorKey = "primary" | "background" | "secondary" | "third";
export type HeadingSize = "large" | "medium" | "small";


interface Theme {
    name: ThemeName;
    color: Record<ColorKey, string>;
    heading: {
        // HeadingSize의 key들만 가져오겠다
        [key in HeadingSize]: {
            fontSize: string;
        };
    };
};

export const light: Theme = {
    name: 'light',
    color: {
        primary: 'brown',
        background : "lightgray",
        secondary: "blue",
        third: "green",
    },
    heading: {
        large: {
            fontSize: "2rem",
        },
        medium: {
            fontSize: '1.5rem',
        },
        small: {
            fontSize: '1rem',
        },
    },
};

export const dark: Theme = {
    ...light, // ligth object의 테마만 가져오고 name, color만 overriding 할꺼임
    name: 'dark',
    color: {
        primary: 'coral',
        background: 'midnightblue',
        secondary: "darkblue",
        third: "darkgreen",
    },
};

export const getTheme = (themeName: ThemeName): Theme => {
    switch (themeName) {
        case "light":
            return light;
        case "dark":
            return dark;
    };
};