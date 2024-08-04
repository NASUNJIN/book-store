import { useLocation } from "react-router-dom"
import { fetchBooks } from "../api/books.api";
import { QUERYSTIRNG } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useQuery } from "@tanstack/react-query";

export const useBooks = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const { data: booksData, isLoading: isBooksLoading} = useQuery({
        queryKey: ["books", location.search],
        queryFn: () => {
            return fetchBooks({
                category_id: params.get(QUERYSTIRNG.CATEGORY_ID) 
                    ? Number(params.get(QUERYSTIRNG.CATEGORY_ID)) 
                    : undefined,
                newBooks: params.get(QUERYSTIRNG.NEWS) ? true : undefined,
                currentPage: params.get(QUERYSTIRNG.PAGE) ? Number(params.get(QUERYSTIRNG.PAGE)) : 1,
                limit: LIMIT,
            });
        },
    });

    return {
        books: booksData?.books,
        pagination: booksData?.pagination,
        isEmpty: booksData?.books.length === 0,
        isBooksLoading,
    };
};