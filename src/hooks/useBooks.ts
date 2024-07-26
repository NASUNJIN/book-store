import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTIRNG } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";

export const useBooks = () => {
    const location = useLocation();

    const [books, setBooks] = useState<Book[]>([]);
    const [pagination, setPagination] = useState<Pagination> 
    ({
        totalCount: 0,
        currentPage: 1,
    });

    const [isEmpty, setIsEmpty] = useState(true);  // true인 이유 : Books[] 배열도 ([]) 빈배열이기 때문에


    // fetch 및 상태 검증
    useEffect(() => {
        const params = new URLSearchParams(location.search);

        fetchBooks({
            category_id: params.get(QUERYSTIRNG.CATEGORY_ID) 
                ? Number(params.get(QUERYSTIRNG.CATEGORY_ID)) 
                : undefined,
            newBooks: params.get(QUERYSTIRNG.NEWS) ? true : undefined,
            currentPage: params.get(QUERYSTIRNG.PAGE) ? Number(params.get(QUERYSTIRNG.PAGE)) : 1,
            limit: LIMIT,
        }).then(({ books, pagination }) => {
            setBooks(books);
            setPagination(pagination);
            setIsEmpty(books.length === 0);
        });
    }, [location.search]);

    return { books, pagination, isEmpty };
};