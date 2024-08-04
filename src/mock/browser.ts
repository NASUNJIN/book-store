import { setupWorker } from "msw/browser";
import { reviewsById } from "./review";

const handlers = [reviewsById];

console.log("reviewsById", reviewsById);

export const worker = setupWorker(...handlers);