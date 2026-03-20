import { useState } from "react";
import Stars from "../Stars";
import type { Book } from "../../types/book";
import styles from "./BookCard.module.css";

type BookCardProps = {
  book: Book;
  onClick: () => void;
};

export default function BookCard({ book, onClick }: BookCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div onClick={onClick} className={styles.bookCard}>
      <div className={styles.bookCardCover}>
        {!imgError ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.bookCardCoverFallback}>{book.title}</div>
        )}
      </div>

      <div className={styles.bookCardBody}>
        <h3 className={styles.bookCardTitle}>{book.title}</h3>
        <p className={styles.bookCardAuthor}>{book.author}</p>
        <div className={styles.bookCardRating}>
          <Stars rating={book.rating} />
          <span className={styles.bookCardDate}>{book.readDate}</span>
        </div>
        <p className={styles.bookCardMemo}>{book.memo}</p>
      </div>
    </div>
  );
}
