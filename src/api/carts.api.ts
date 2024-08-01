import { Cart } from "../models/cart.model";
import { httpClient } from "./http"

interface AddCartParams {
    book_id: number;
    quantity: number;
};

export const addCart = async(params: AddCartParams) => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await httpClient.post("/carts", params, {
            headers: {
                Authorization : token,
            },
        });
        return response.data;
    } else {
        throw new Error("No token found in local storage");
    }

};

export const fetchCart = async () => {
    const response = await httpClient.get<Cart[]>("/carts");

    return response.data;
};

export const deleteCart = async (cartId: number) => {
    const response = await httpClient.delete(`/carts/${cartId}`);
    // const token = localStorage.getItem('token');
    // if (token) {

    // }

    return response.data;
};