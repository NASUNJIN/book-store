import { useLocation } from "react-router-dom";
import { fetchBooks } from "../api/books.api";
import { QUERYSTIRNG } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useBooksInfinite = () => {
    const location = useLocation();
    
    // 화면이 업데이트 될 때마다 pageParam 계속 변경
    const getBooks = ({ pageParam }: { pageParam: number }) => {
        const params = new URLSearchParams(location.search);
        const category_id = params.get(QUERYSTIRNG.CATEGORY_ID) 
                    ? Number(params.get(QUERYSTIRNG.CATEGORY_ID)) 
                    : undefined;
        const newBooks = params.get(QUERYSTIRNG.NEWS) ? true : undefined;
        const limit = LIMIT;
        const currentPage = pageParam;

        return fetchBooks({
            category_id,
            newBooks,
            limit,
            currentPage,
        });
    };

    const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
        queryKey: ["books", location.search],
        queryFn: getBooks,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const isLastPage = Math.ceil(lastPage.pagination.totalCount / LIMIT) === lastPage.pagination.currentPage;
            return isLastPage ? null : lastPage.pagination.currentPage + 1;
        }
    });

    const books = data ? data.pages.flatMap((page) => page.books) : [];
    const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
    const isEmpty = books.length === 0;

    return {
        books,
        pagination,
        isEmpty,
        isBooksLoading : isFetching,
        fetchNextPage,
        hasNextPage,
    };
};