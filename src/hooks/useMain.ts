import { fetchBanners } from "@/api/banner.api";
import { fetchBestBooks, fetchBooks } from "@/api/books.api";
import { fetchReviewAll } from "@/api/review.api";
import { Banner } from "@/models/banner.model";
import { Book, BookReviewItem } from "@/models/book.model";
import { useEffect, useState } from "react"

export const useMain = () => {
    // react-query로 해보기
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    const [newBooks, setNewBooks] = useState<Book[]>([]);
    const [bestBooks, setBestBooks] = useState<Book[]>([]);
    const [banners, setBanners] = useState<Banner[]>([]);

    useEffect(() => {
        fetchReviewAll().then((reviews) => {
            setReviews(reviews);
            console.log("fetchReviewAll 성공");
        }).catch(error => console.log("fetchReviewAll 실패", error));

        fetchBooks({
            category_id: undefined,
            newBooks: true,
            currentPage: 1,
            limit: 4
        }).then(({ books }) => {
            setNewBooks(books);
            console.log("fetchBooks 성공")
        }).catch(error => console.log("fetchBook 실패", error));

        fetchBestBooks().then((books) => {
            setBestBooks(books);
            console.log("fetchBestBooks 성공");
        }).catch(error => console.log("fetchBestBooks 실패", error));

        fetchBanners().then((banners) => {
            setBanners(banners);
            console.log("fetchBanners 성공")
        }).catch(error => console.log("fetchBanners 실패", error));;

    }, []);

    return { reviews, newBooks, bestBooks, banners };
};