import { useState } from "react";
import type { Book } from "../../types/book";
import "./BookCard.css";

type StarsProps = {
  rating: number;
};

const Stars = ({ rating }: StarsProps) => (
  <span className="stars">
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className={`star ${i <= rating ? "star--active" : "star--inactive"}`}
      >
        ★
      </span>
    ))}
  </span>
);

export { Stars };

type BookCardProps = {
  book: Book;
  onClick: () => void;
};

export default function BookCard({ book, onClick }: BookCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div onClick={onClick} className="book-card">
      <div className="book-card-cover">
        {!imgError ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="book-card-cover-fallback">{book.title}</div>
        )}
      </div>

      <div className="book-card-body">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.author}</p>
        <div className="book-card-rating">
          <Stars rating={book.rating} />
          <span className="book-card-date">{book.readDate}</span>
        </div>
        <p className="book-card-memo">{book.memo}</p>
      </div>
    </div>
  );
}
