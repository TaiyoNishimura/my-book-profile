import { useState, useMemo } from "react";
import "./App.css";
import Header from "./components/Header";
import Stats from "./components/Stats";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import { useBooks } from "./hooks/useBooks";
import type { Book } from "./types/book";

export default function App() {
  const { books, loading } = useBooks();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const allTags = useMemo(
    () => [...new Set(books.flatMap((b) => b.tags))],
    [books]
  );

  const booksFilteredByTag = useMemo(
    () =>
      selectedTag ? books.filter((b) => b.tags.includes(selectedTag)) : books,
    [books, selectedTag]
  );

  if (loading) {
    return <div className="app-loading">読み込み中...</div>;
  }

  return (
    <div className="app">
      <Header />
      <Stats books={books} />
      <BookList
        filtered={booksFilteredByTag}
        allTags={allTags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        onSelectBook={setSelectedBook}
      />
      <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}
