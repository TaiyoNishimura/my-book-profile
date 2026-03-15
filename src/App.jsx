import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Stats from "./components/Stats";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import { useBooks } from "./hooks/useBooks";

export default function App() {
  const { books, filtered, allTags, selectedTag, setSelectedTag, loading } =
    useBooks();
  const [selectedBook, setSelectedBook] = useState(null);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #181828, #12121e)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6a6a7a",
          fontFamily: "'Noto Sans JP', sans-serif",
        }}
      >
        読み込み中...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #181828, #12121e)",
        color: "#e0e0e8",
        fontFamily: "'Noto Sans JP', sans-serif",
      }}
    >
      <Header />
      <Stats books={books} />
      <BookList
        filtered={filtered}
        allTags={allTags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        onSelectBook={setSelectedBook}
      />
      <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}
