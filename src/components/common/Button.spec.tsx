import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import Button from './Button';

describe("Button 컴포넌트 테스트", () => {
    it("렌더를 확인", () => {
        // 렌더
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary">버튼</Button>
            </BookStoreThemeProvider>
        );

        // 확인
        expect(screen.getByText('버튼')).toBeInTheDocument();
    });

    it("size props 적용", () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary">버튼</Button>
            </BookStoreThemeProvider>
        );

        expect(screen.getByRole("button")).toHaveStyle({ fontSize: "1.5rem" });
    });

    it("color props 적용", () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary">버튼</Button>
            </BookStoreThemeProvider>
        );

        expect(screen.getByRole("button")).toHaveStyle({ color: "white" });
        expect(screen.getByRole("button")).toHaveStyle({ backgroundColor: "midnightblue" });
    });

    it("disabled props 적용", () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary" disabled>버튼</Button>
            </BookStoreThemeProvider>
        );

        const button = screen.getByRole("button");
        expect(button).toHaveStyle({ opacity: 0.5 });
        expect(button).toHaveAttribute("disabled");
        expect(button).toHaveStyle({ pointerEvents: "none" });
    });

    it("isLoading props 적용", () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary" isLoading>버튼</Button>
            </BookStoreThemeProvider>
        );

        // isLoading 관련 스타일/표시 확인
        const button = screen.getByRole("button");
        // isLoading 상태에서의 추가 스타일이나 내용 확인
    });
});
