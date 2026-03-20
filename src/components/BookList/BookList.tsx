import BookCard from "../BookCard";
import type { Book } from "../../types/book";
import styles from "./BookList.module.css";

type TagProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const Tag = ({ label, active, onClick }: TagProps) => (
  <button
    onClick={onClick}
    className={`${styles.tag} ${active ? styles.tagActive : ""}`}
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
      <div className={styles.tagList}>
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
      <div className={styles.bookGrid}>
        {filtered.map((book, i) => (
          <div
            key={book.id}
            style={{ animation: `slideUp 0.4s ease ${i * 0.06}s both` }}
          >
            <BookCard book={book} onClick={() => onSelectBook(book)} />
          </div>
        ))}
        {filtered.length === 0 && (
          <p className={styles.bookGridEmpty}>該当する本がありません</p>
        )}
      </div>
    </>
  );
}
