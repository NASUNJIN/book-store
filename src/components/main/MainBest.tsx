import { Book } from "@/models/book.model";
import styled from "styled-components";
import BookBestItem from "../books/BookBestItem";

interface Props {
    books: Book[];
}

function MainBest({ books }: Props) {
    return (
        <MainBestStyle>
            {books.map((item, index) => (
                <BookBestItem key={item.id} book={item} itemIndex={index} />
            ))}
        </MainBestStyle>
    );
};

const MainBestStyle = styled.div`
    padding: 12px 0 0 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;

    @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export default MainBest;