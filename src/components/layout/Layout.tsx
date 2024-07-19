import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";

// children에 표시된 type에 React로만든 어떤 모든 컴포넌트들이 배치될 수 있다 선언
interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;