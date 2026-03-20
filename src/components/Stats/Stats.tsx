import type { Book } from "../../types/book";
import "./Stats.css";

type StatsProps = {
  books: Book[];
};

export default function Stats({ books }: StatsProps) {
  const currentYear = String(new Date().getFullYear());
  const numBooksReadThisYear = books.filter((b) => b.readDate.startsWith(currentYear)).length;

  const avgRating =
    books.length > 0
      ? (books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1)
      : "0.0";

  const stats = [
    { label: "Total", value: books.length },
    { label: currentYear, value: numBooksReadThisYear },
    { label: "Avg Rating", value: avgRating },
  ];

  return (
    <div className="stats">
      {stats.map((stat) => (
        <div key={stat.label} className="stats-item">
          <div className="stats-value">{stat.value}</div>
          <div className="stats-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
