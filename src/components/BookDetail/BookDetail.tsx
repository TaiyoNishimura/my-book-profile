import { useState } from "react";
import { Stars } from "../BookCard";
import type { Book } from "../../types/book";
import "./BookDetail.css";

type BookDetailProps = {
  book: Book | null;
  onClose: () => void;
};

export default function BookDetail({ book, onClose }: BookDetailProps) {
  const [imgError, setImgError] = useState(false);

  if (!book) return null;

  return (
    <div onClick={onClose} className="detail-overlay">
      <div onClick={(e) => e.stopPropagation()} className="detail-modal">
        <div className="detail-header">
          <div className="detail-cover">
            {!imgError ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="detail-cover-fallback">{book.title}</div>
            )}
          </div>

          <div>
            <h2 className="detail-title">{book.title}</h2>
            <p className="detail-author">{book.author}</p>
            <Stars rating={book.rating} />
            <p className="detail-read-date">読了日: {book.readDate}</p>
            <div className="detail-tags">
              {book.tags.map((tag) => (
                <span key={tag} className="detail-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="detail-memo-section">
          <h4 className="detail-memo-heading">感想・メモ</h4>
          <p className="detail-memo-text">{book.memo}</p>
        </div>

        <button onClick={onClose} className="detail-close-button">
          閉じる
        </button>
      </div>
    </div>
  );
}
