import { useState } from "react";
import type { Book } from "../types/book";

type StarsProps = {
  rating: number;
};

const Stars = ({ rating }: StarsProps) => (
  <span style={{ letterSpacing: "2px" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        style={{
          color: i <= rating ? "#e8a838" : "#3a3a4a",
          fontSize: "14px",
        }}
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
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        background: hovered
          ? "linear-gradient(145deg, #2a2a3a, #252535)"
          : "#222233",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        gap: "18px",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered
          ? "0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,168,110,0.15)"
          : "0 4px 20px rgba(0,0,0,0.2)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          width: "80px",
          minWidth: "80px",
          height: "115px",
          borderRadius: "6px",
          overflow: "hidden",
          background: "#1a1a2a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "2px 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        {!imgError ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              fontSize: "11px",
              color: "#6a6a7a",
              textAlign: "center",
              padding: "8px",
              fontFamily: "'Noto Sans JP', sans-serif",
              lineHeight: 1.4,
            }}
          >
            {book.title}
          </div>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          style={{
            margin: "0 0 6px 0",
            fontSize: "15px",
            fontWeight: 600,
            color: "#e8e8f0",
            fontFamily: "'Noto Sans JP', sans-serif",
            lineHeight: 1.4,
          }}
        >
          {book.title}
        </h3>
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: "12px",
            color: "#7a7a8a",
            fontFamily: "'Noto Sans JP', sans-serif",
          }}
        >
          {book.author}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "8px",
          }}
        >
          <Stars rating={book.rating} />
          <span
            style={{
              fontSize: "11px",
              color: "#5a5a6a",
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
          >
            {book.readDate}
          </span>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: "#8a8a9a",
            lineHeight: 1.6,
            fontFamily: "'Noto Sans JP', sans-serif",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {book.memo}
        </p>
      </div>
    </div>
  );
}
