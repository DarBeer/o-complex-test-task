import { IReview } from "@/Interfaces";

export class ReviewService {
  public async getReview(): Promise<IReview[]> {
    const reviews: Promise<IReview[]> = fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Произошла ошибка при выполнении запроса:', error);
      });
    return reviews;
  }
}