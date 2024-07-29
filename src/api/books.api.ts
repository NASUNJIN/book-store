import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http"

interface FetchBooksParams {
    category_id?: number;
    newBooks?: boolean;
    currentPage?: number;
    limit: number;
};

interface FetchBooksResponse {
    books: Book[];
    pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
    try {
        const response = await httpClient.get<FetchBooksResponse>("/books", {
            params: params,
        });
    
        return response.data;
    } catch (error) {
        return {
            books: [],
            pagination: {
                totalCount: 0,
                currentPage: 1,
            },
        };
    }
    
};

export const fetchBook = async (bookId: string) => { // router에서 받아오기 때문에 string으로 처리
    const response = await httpClient.get<BookDetail>(`/books/${bookId}`);

    return response.data;
};

// 좋아요
export const likeBook = async (bookId: number) => {
    try {
        const token = localStorage.getItem('token');

        if (token) {
            const response = await httpClient.post(`/likes/${bookId}`, {}, {
                headers: {
                    Authorization : token,
                },
            });
            return response.data;
        } else {
            throw new Error("No token found in local storage");
        }
    } catch(error) {
        console.error("Failed to like the book:", error);
        throw error;
    }
};

// 좋아요 취소
export const unLikeBook = async (bookId: number) => {
    const response = await httpClient.delete(`/likes/${bookId}`);

    return response.data;
};