export default function Header() {
  return (
    <header
      style={{
        padding: "60px 24px 40px",
        textAlign: "center",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          color: "#c8a86e",
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: "12px",
          fontWeight: 500,
        }}
      >
        Book Profile
      </p>
      <h1
        style={{
          fontSize: "28px",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 500,
          color: "#f0f0f8",
          marginBottom: "12px",
          fontStyle: "italic",
        }}
      >
        My Reading Journey
      </h1>
      <p
        style={{
          fontSize: "13px",
          color: "#6a6a7a",
          maxWidth: "400px",
          margin: "0 auto",
          lineHeight: 1.7,
        }}
      >
        読んだ本の記録と、そこから得た学びをまとめています。
      </p>
    </header>
  );
}
