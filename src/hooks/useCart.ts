import { useEffect, useState } from "react"
import { Cart } from "../models/cart.model"
import { deleteCart, fetchCart } from "../api/carts.api";

export const useCart = () => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [isEmpty, setIsEmpty] = useState(true);

    // 장바구니 삭제
    const delteCartItem = (id: number) => {
        deleteCart(id).then(() => {
            // 약관적 업데이트
            // cart.id가 주어진 id가 아닌것으로 업데이트 하겠다
            setCarts(carts.filter((cart) => cart.id !== id));
        });
    };

    useEffect(() => {
        fetchCart().then((carts) => {
            setCarts(carts);
            setIsEmpty(carts.length === 0);
        });
    }, []);

    return { carts, isEmpty, delteCartItem };
};