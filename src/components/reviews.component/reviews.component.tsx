'use client'

import { IReview } from "@/Interfaces";
import { ReviewService } from "@/services/review.service";
import { useEffect, useState } from "react";
import { ReviewItem } from "./reviewItem.component";

import "./reviews.component.css";

export function Review() {
  const __reviewService = new ReviewService();
  const [reviews, setReviews] = useState<IReview[]>();

  useEffect(() => {
    __reviewService.getReview().then(newData => setReviews(newData))
                               .catch(error => console.error(error));
  }, []);

  return (
    <div className="review-component--list">
      {reviews?.map(review => <ReviewItem key={review.id} className="review-component--list--item" htmlContent={review.text} />)}
    </div>
  )
}