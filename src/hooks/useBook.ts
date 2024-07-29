import { useEffect, useState } from "react"
import { BookDetail } from "../models/book.model"
import { fetchBook, likeBook, unLikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";

export const useBook = (bookId: string | undefined) => {
    const[book, setBook] = useState<BookDetail | null>(null);
    const { isloggedIn } = useAuthStore();
    const showAlert = useAlert();

    const likeToggle = () => {
        // 권한 확인
        if (!isloggedIn) {
            showAlert('로그인이 필요합니다.');
            return;
        }

        if (!book) return;

        try {
            if (book.liked) {
                // 라이크 상태 -> 언라이크 실행
                unLikeBook(book.id).then(() => {
                    setBook({
                        ...book,
                        liked:false,
                        likes: book.likes - 1,
                    })
                })
            } else {
                // 언라이크 상태 -> 라이크 실행
                likeBook(book.id).then(() => {
                    // 성공 처리
                    setBook({
                        ...book,
                        liked: true,
                        likes: book.likes + 1,
                    });
                });
            }
        } catch (error) {
            console.error("Failed to toggle like:", error);
        }
    };

    useEffect(() => {
        if(!bookId) return;
        
        fetchBook(bookId).then((book) => {
            setBook(book);
        });
    },[bookId]);

    return { book, likeToggle };
};