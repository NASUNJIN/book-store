import { SignupProps } from "../pages/Signup";
import { httpClient } from "./http";

// 회원가입
export const signup = async(userData: SignupProps) => {
    const response = await httpClient.post("/users/join", userData);
    return response.data;
};

// 비밀번호 초기화 요청
export const resetRequest = async(data: SignupProps) => {
    const response = await httpClient.post("/users/reset", data);
    return response.data;
};

// 비밀번호 초기화
export const resetPassword = async(data: SignupProps) => {
    const response = await httpClient.put("/users/reset", data);
    return response.data;
};