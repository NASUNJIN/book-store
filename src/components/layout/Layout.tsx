import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import styled from "styled-components";

// children에 표시된 type에 React로만든 어떤 모든 컴포넌트들이 배치될 수 있다 선언
interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <LayoutStyle>{children}</LayoutStyle>
            <Footer />
        </>
    );
}

const LayoutStyle = styled.main`
    width: 100%;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.width.large};
    padding: 20px 0%;
`;

export default Layout;