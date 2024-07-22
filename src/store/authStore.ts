import { create } from "zustand";

interface StoreState {
    isloggedIn: boolean;
    storeLogin: (token: string) => void;
    storeLogout: () => void;
};

// Token 설정
export const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
};

const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const removeToken = () => {
    localStorage.removeItem("token");
}

// 로그인 & 로그아웃
export const useAuthStore = create<StoreState>((set) => ({
    isloggedIn: getToken() ? true : false,
    storeLogin: (token: string) => {
        set({ isloggedIn: true });
        setToken(token);
    },
    storeLogout: () => {
        set({ isloggedIn: false });
        removeToken();
    },
}));