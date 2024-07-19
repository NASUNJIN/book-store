import { render, screen } from '@testing-library/react';
import Title from './Title';
import { BookStoreThemeProvider } from '../../context/themeContext';


describe("Title 컴포넌트 테스트", () => {
    it("렌더를 확인", () => {
        // 렌더
        render(
            <BookStoreThemeProvider>
                <Title size="large">제목</Title>
            </BookStoreThemeProvider>
        );

        // 확인
        expect(screen.getByText('제목')).toBeInTheDocument();
    });

    it("size props 적용", () => {
        // render를 한 곳에서 selector를 하기 때문에 container 불러옴
        const { container } = render(
            <BookStoreThemeProvider>
                <Title size="large">제목</Title>
            </BookStoreThemeProvider>
        );

        expect(container?.firstChild).toHaveStyle({ fontSize: "2rem" })
    });

    it("color porps 적용", () => {
        const { container } = render(
            <BookStoreThemeProvider>
                <Title size="large" color="primary">제목</Title>
            </BookStoreThemeProvider>
        );

        expect(container?.firstChild).toHaveStyle({ color: "brown" })
    })
});