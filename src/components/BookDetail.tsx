import { useState } from "react";
import { Stars } from "./BookCard";
import type { Book } from "../types/book";

type BookDetailProps = {
  book: Book | null;
  onClose: () => void;
};

export default function BookDetail({ book, onClose }: BookDetailProps) {
  const [imgError, setImgError] = useState(false);

  if (!book) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(160deg, #252538, #1e1e30)",
          borderRadius: "16px",
          padding: "36px",
          maxWidth: "520px",
          width: "100%",
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          border: "1px solid rgba(200,168,110,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginBottom: "24px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "120px",
              minWidth: "120px",
              height: "172px",
              borderRadius: "8px",
              overflow: "hidden",
              background: "#1a1a2a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "4px 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            {!imgError ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                onError={() => setImgError(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  fontSize: "12px",
                  color: "#6a6a7a",
                  textAlign: "center",
                  padding: "12px",
                }}
              >
                {book.title}
              </div>
            )}
          </div>

          <div>
            <h2
              style={{
                margin: "0 0 8px 0",
                fontSize: "20px",
                fontWeight: 700,
                color: "#f0f0f8",
                fontFamily: "'Noto Sans JP', sans-serif",
                lineHeight: 1.3,
              }}
            >
              {book.title}
            </h2>
            <p
              style={{
                margin: "0 0 12px 0",
                fontSize: "14px",
                color: "#8a8a9a",
                fontFamily: "'Noto Sans JP', sans-serif",
              }}
            >
              {book.author}
            </p>
            <Stars rating={book.rating} />
            <p
              style={{
                margin: "10px 0 0 0",
                fontSize: "12px",
                color: "#5a5a6a",
                fontFamily: "'Noto Sans JP', sans-serif",
              }}
            >
              読了日: {book.readDate}
            </p>
            <div
              style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                marginTop: "10px",
              }}
            >
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "3px 10px",
                    borderRadius: "12px",
                    background: "rgba(200,168,110,0.12)",
                    color: "#c8a86e",
                    fontSize: "11px",
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "20px",
          }}
        >
          <h4
            style={{
              margin: "0 0 10px 0",
              fontSize: "13px",
              color: "#c8a86e",
              fontWeight: 600,
              fontFamily: "'Noto Sans JP', sans-serif",
              letterSpacing: "1px",
            }}
          >
            感想・メモ
          </h4>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#b0b0c0",
              lineHeight: 1.8,
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
          >
            {book.memo}
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "24px",
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #3a3a4a",
            background: "transparent",
            color: "#8a8a9a",
            cursor: "pointer",
            fontSize: "13px",
            fontFamily: "'Noto Sans JP', sans-serif",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            const target = e.currentTarget;
            target.style.borderColor = "#c8a86e";
            target.style.color = "#c8a86e";
          }}
          onMouseOut={(e) => {
            const target = e.currentTarget;
            target.style.borderColor = "#3a3a4a";
            target.style.color = "#8a8a9a";
          }}
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
