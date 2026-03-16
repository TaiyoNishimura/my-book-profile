import BookCard from "./BookCard";
import type { Book } from "../types/book";

type TagProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const Tag = ({ label, active, onClick }: TagProps) => (
  <button
    onClick={onClick}
    style={{
      padding: "5px 14px",
      borderRadius: "20px",
      border: active ? "1.5px solid #c8a86e" : "1.5px solid #3a3a4a",
      background: active ? "rgba(200,168,110,0.15)" : "transparent",
      color: active ? "#c8a86e" : "#8a8a9a",
      cursor: "pointer",
      fontSize: "12px",
      fontFamily: "'Noto Sans JP', sans-serif",
      fontWeight: 500,
      transition: "all 0.25s ease",
      letterSpacing: "0.5px",
    }}
  >
    {label}
  </button>
);

type BookListProps = {
  filtered: Book[];
  allTags: string[];
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  onSelectBook: (book: Book) => void;
};

export default function BookList({
  filtered,
  allTags,
  selectedTag,
  setSelectedTag,
  onSelectBook,
}: BookListProps) {
  return (
    <>
      {/* Tags */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px",
          padding: "0 24px 32px",
        }}
      >
        <Tag
          label="すべて"
          active={selectedTag === null}
          onClick={() => setSelectedTag(null)}
        />
        {allTags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            active={selectedTag === tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
          />
        ))}
      </div>

      {/* Book Grid */}
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "0 24px 60px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {filtered.map((book, i) => (
          <div
            key={book.id}
            style={{
              animation: `slideUp 0.4s ease ${i * 0.06}s both`,
            }}
          >
            <BookCard book={book} onClick={() => onSelectBook(book)} />
          </div>
        ))}
        {filtered.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#5a5a6a",
              padding: "40px 0",
              fontSize: "14px",
            }}
          >
            該当する本がありません
          </p>
        )}
      </div>
    </>
  );
}
