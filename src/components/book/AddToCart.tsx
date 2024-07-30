import { styled } from "styled-components";
import { BookDetail } from "../../models/book.model";
import InputText from "../common/InputText";
import Button from "../common/Button";
import React, { useState } from "react";
import { addCart } from "../../api/carts.api";
import { useAlert } from "../../hooks/useAlert";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";

interface Props {
    book: BookDetail;
}

function AddToCart ({ book }: Props) {
    // 수량에 숫자 적혀있는 것
    const [quantity, setQuantity] = useState<number>(1);
    const { addToCart, cartAdded } = useBook(book.id.toString());

    // inputText 값에도 숫자 입력 할 수 있게 함
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    };

    const handleIncress = () => {
        setQuantity(quantity + 1);
    };

    const handleDecress = () => {
        // 0 이하로 내려가지 않게 막아줌
        if (quantity === 1) return;
        setQuantity(quantity - 1);
    };

    return(
        <AddToCartStyle $added={cartAdded}>
            <div>
                <InputText inputType="number" value={quantity} onChange={handleChange} />
                <Button size="medium" scheme="normal" onClick={handleIncress}>
                    +
                </Button>
                <Button size="medium" scheme="normal" onClick={handleDecress}>
                    -
                </Button>
            </div>
            <Button size="medium" scheme="primary" onClick={() => addToCart(quantity)}>
                장바구니 담기
            </Button>
            <div className="added">
                <p>장바구니에 {quantity}개 추가되었습니다.</p>
                <Link to="/cart">장바구니로 이동</Link>
            </div>
        </AddToCartStyle>
    );
};

interface AddToCartStyleProps {
    $added: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: relative;

    .added {
        position: absolute;
        right: 0;
        bottom: -90px;
        background: ${({ theme }) => theme.color.background};
        border-radius: ${({ theme }) => theme.borderRadius.default};
        padding : 8px 12px;
        opacity: ${({ $added }) => ($added ? "1" : "0")};
        transition: all 0.5s ease;

        p {
            padding: 0 0 8px 0;
            margin: 0;
        }
    }
`;

export default AddToCart;