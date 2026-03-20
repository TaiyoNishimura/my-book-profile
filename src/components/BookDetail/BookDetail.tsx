import { useState } from "react";
import Stars from "../Stars";
import type { Book } from "../../types/book";
import styles from "./BookDetail.module.css";

type BookDetailProps = {
  book: Book | null;
  onClose: () => void;
};

export default function BookDetail({ book, onClose }: BookDetailProps) {
  const [imgError, setImgError] = useState(false);

  if (!book) return null;

  return (
    <div onClick={onClose} className={styles.detailOverlay}>
      <div onClick={(e) => e.stopPropagation()} className={styles.detailModal}>
        <div className={styles.detailHeader}>
          <div className={styles.detailCover}>
            {!imgError ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className={styles.detailCoverFallback}>{book.title}</div>
            )}
          </div>

          <div>
            <h2 className={styles.detailTitle}>{book.title}</h2>
            <p className={styles.detailAuthor}>{book.author}</p>
            <Stars rating={book.rating} />
            <p className={styles.detailReadDate}>読了日: {book.readDate}</p>
            <div className={styles.detailTags}>
              {book.tags.map((tag) => (
                <span key={tag} className={styles.detailTag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.detailMemoSection}>
          <h4 className={styles.detailMemoHeading}>感想・メモ</h4>
          <p className={styles.detailMemoText}>{book.memo}</p>
        </div>

        <button onClick={onClose} className={styles.detailCloseButton}>
          閉じる
        </button>
      </div>
    </div>
  );
}
