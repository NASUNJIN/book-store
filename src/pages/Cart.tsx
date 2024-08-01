import styled from "styled-components";
import Title from "../components/common/Title";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useState } from "react";
import Empty from "../components/common/Empty";
import { FaShoppingCart } from "react-icons/fa";

function Cart() {
    const { carts, delteCartItem, isEmpty } = useCart();
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
                {!isEmpty && (
                    <>
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
                    </>
                )}
                {isEmpty && (
                    <Empty 
                        title="장바구니가 비었습니다." 
                        icon={<FaShoppingCart />}
                        description={<>장바구니를 채워보세요.</>}
                    />
                )}
            </CartStyle>
        </>
    );
};

const CartStyle = styled.div`

`;

export default Cart;