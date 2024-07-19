import React from "react";
import { styled } from "styled-components";
import { ColorKey, HeadingSize } from "../../style/theme";

interface Props {
    children: React.ReactNode;
    size: HeadingSize;
    color?: ColorKey;
};

function Title({ children, size, color }: Props) {
    return (
        <Titlestyle size={size} color={color}>
            {children}
        </Titlestyle>
    );
};

// <Omit<Props, "children"> : 타입은 interface Props에서 children을 제외한 나머지
const Titlestyle = styled.h1<Omit<Props, "children">>`
    font-size: ${({ theme, size }) => theme.heading[size].fontSize};
    color: ${({ theme, color }) => (color 
    ? theme.color[color] // color가 있을 경우
    // color가 없을 경우
    : theme.color.primary)}; color가 없을 경우
`;

export default Title;