import { fetchReviewAll } from "@/api/review.api";
import { BookReviewItem } from "@/models/book.model";
import { useEffect, useState } from "react"

export const useMain = () => {
    // react-query로 해보기
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);

    useEffect(() => {
        fetchReviewAll().then((reviews) => {
            setReviews(reviews);
        })
    }, []);

    return { reviews };
};