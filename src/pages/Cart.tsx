import styled from "styled-components";
import Title from "../components/common/Title";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useState } from "react";

function Cart() {
    const { carts, delteCartItem } = useCart();
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    // 장바구니 체크
    const handleCheckItem = (id: number) => {
        if (checkedItems.includes(id)) {
            // 체크 해지
            setCheckedItems(checkedItems.filter((item) => item !== id));
        } else {
            // 체크
            setCheckedItems([...checkedItems, id]);
            return ;
        }
    };

    // 장바구니 삭제 확인
    const handleDelete = (id: number) => {
        // 삭제 행위
        delteCartItem(id);
    };

    return (
        <>
            <Title size="large">장바구니</Title>
            <CartStyle>
                <div className="content">
                    {carts.map((item) => (
                        <CartItem 
                            key={item.id} cart={item} 
                            checkedItems={checkedItems} 
                            onCheck={handleCheckItem}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
                <div className="summary">summary</div>
            </CartStyle>
        </>
    );
};

const CartStyle = styled.div`

`;

export default Cart;