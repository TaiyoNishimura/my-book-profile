import { useState, useEffect, useMemo } from "react";

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/books.json`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  const allTags = useMemo(
    () => [...new Set(books.flatMap((b) => b.tags))],
    [books]
  );

  const filtered = useMemo(
    () =>
      selectedTag
        ? books.filter((b) => b.tags.includes(selectedTag))
        : books,
    [books, selectedTag]
  );

  return { books, filtered, allTags, selectedTag, setSelectedTag, loading };
}
