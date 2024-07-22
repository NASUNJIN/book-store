export interface Book {
    id: number;
    title: string;
    img: number;
    category_id: number;
    summary: string;
    author: string;
    price: string;
    likes: number;
    form: string;
    isbn: string;
    detail: string;
    pages: number;
    contents: string;
    pubDate: string;
};

export interface BookDetail extends Book {
    categoryName: string;
    liked: boolean;
}