import { IProduct } from "@/Interfaces";

export class ProductService {
  public async getReview(page: number = 1, pageSize: number = 1): Promise<IProduct[]> {
    const reviews: Promise<IProduct[]> = fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&page_size=${pageSize}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(response => response.items)
      .catch(error => {
        console.error('Произошла ошибка при выполнении запроса:', error);
      });
    return reviews;
  }
}