import { BookReviewItem, BookReviewItemWrite } from "@/models/book.model";
// import { requestHandler } from "./http";

export const fetchBookReview = async (bookId: string) => {
    // return await requestHandler<BookReviewItem[]>("get", `/reviews/${bookId}`);

    const response = await fetch(`http://localhost:3000/reviews/${bookId}`);
    const data = await response.json();
    return data;
};

// interface AddBookReviewResponse {
//     message: string;
// }

export const addBookReview = async (bookId: string, reviewData:BookReviewItemWrite) => {
    // return await requestHandler<AddBookReviewResponse>("post", `/reviews/${bookId}`, )

    const response = await fetch(`http://localhost:3000/reviews/${bookId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewData)
    });

    if (!response.ok) {
        throw new Error(`Failed to add review: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
};