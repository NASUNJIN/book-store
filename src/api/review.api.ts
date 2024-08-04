import { BookReviewItem } from "@/models/book.model";
import { requestHandler } from "./http";

export const fetchBookReview = async (bookId: string) => {
    // return await requestHandler<BookReviewItem[]>("get", `/reviews/${bookId}`);

    const response = await fetch(`http://localhost:3000/reviews/${bookId}`);
    const data = await response.json();
    return data;
};