export default function Stats({ books }) {
  const currentYear = String(new Date().getFullYear());
  const numBooksReadThisYear = books.filter((b) => b.readDate.startsWith(currentYear)).length;

  const avgRating =
    books.length > 0
      ? (books.reduce((s, b) => s + b.rating, 0) / books.length).toFixed(1)
      : "0.0";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        padding: "32px 24px",
      }}
    >
      {[
        { label: "Total", value: books.length },
        { label: currentYear, value: numBooksReadThisYear },
        { label: "Avg Rating", value: avgRating },
      ].map((stat) => (
        <div key={stat.label} style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#c8a86e",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {stat.value}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#5a5a6a",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
