import { useState } from "react";

const SAMPLE_BOOKS = [
  {
    id: "1",
    title: "リーダブルコード",
    author: "Dustin Boswell",
    readDate: "2024-08-15",
    rating: 5,
    tags: ["技術書", "プログラミング"],
    memo: "変数名の付け方が実務で即役立った。コードレビューで指摘する基準が明確になった。チーム全員に勧めたい一冊。",
    coverUrl: "https://books.google.com/books/content?id=Wx1dLwEACAAJ&printsec=frontcover&img=1&zoom=1",
  },
  {
    id: "2",
    title: "プログラマの数学 第2版",
    author: "結城 浩",
    readDate: "2024-06-20",
    rating: 4,
    tags: ["技術書", "数学"],
    memo: "数学が苦手でもスラスラ読める。論理的思考の土台を作ってくれた本。特に帰納法の章が分かりやすかった。",
    coverUrl: "https://books.google.com/books/content?id=P6i5jwEACAAJ&printsec=frontcover&img=1&zoom=1",
  },
  {
    id: "3",
    title: "FACTFULNESS",
    author: "ハンス・ロスリング",
    readDate: "2024-03-10",
    rating: 5,
    tags: ["教養", "データ"],
    memo: "思い込みで世界を見ていたことに気づかされた。データに基づいて考える習慣がついた。",
    coverUrl: "https://books.google.com/books/content?id=jYx2DwAAQBAJ&printsec=frontcover&img=1&zoom=1",
  },
  {
    id: "4",
    title: "コーヒーが冷めないうちに",
    author: "川口俊和",
    readDate: "2024-01-05",
    rating: 4,
    tags: ["小説", "ファンタジー"],
    memo: "不思議な喫茶店で過去に戻れるという設定が面白い。それぞれの短編が心に残る。読後の温かさが好き。",
    coverUrl: "https://books.google.com/books/content?id=1FxKDwAAQBAJ&printsec=frontcover&img=1&zoom=1",
  },
  {
    id: "5",
    title: "チームトポロジー",
    author: "Matthew Skelton",
    readDate: "2023-11-20",
    rating: 4,
    tags: ["技術書", "組織論"],
    memo: "チーム構造がアーキテクチャに影響するという話が目から鱗。自分のチームの課題が整理できた。",
    coverUrl: "https://books.google.com/books/content?id=2TdJzgEACAAJ&printsec=frontcover&img=1&zoom=1",
  },
  {
    id: "6",
    title: "嫌われる勇気",
    author: "岸見 一郎",
    readDate: "2023-09-12",
    rating: 5,
    tags: ["教養", "心理学"],
    memo: "アドラー心理学の入門として最高。対話形式で読みやすく、承認欲求との向き合い方を学んだ。",
    coverUrl: "https://books.google.com/books/content?id=ZSyyAwAAQBAJ&printsec=frontcover&img=1&zoom=1",
  },
];

const ALL_TAGS = [...new Set(SAMPLE_BOOKS.flatMap((b) => b.tags))];

const Stars = ({ rating }) => (
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

const Tag = ({ label, active, onClick }) => (
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

const BookCard = ({ book, onClick }) => {
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
};

const DetailModal = ({ book, onClose }) => {
  if (!book) return null;
  const [imgError, setImgError] = useState(false);

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
            e.target.style.borderColor = "#c8a86e";
            e.target.style.color = "#c8a86e";
          }}
          onMouseOut={(e) => {
            e.target.style.borderColor = "#3a3a4a";
            e.target.style.color = "#8a8a9a";
          }}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const filtered = selectedTag
    ? SAMPLE_BOOKS.filter((b) => b.tags.includes(selectedTag))
    : SAMPLE_BOOKS;

  const thisYear = SAMPLE_BOOKS.filter((b) =>
    b.readDate.startsWith("2024")
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #181828, #12121e)",
        color: "#e0e0e8",
        fontFamily: "'Noto Sans JP', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;1,500&display=swap');
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #3a3a4a; border-radius: 3px; }
      `}</style>

      {/* Header */}
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

      {/* Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          padding: "32px 24px",
        }}
      >
        {[
          { label: "Total", value: SAMPLE_BOOKS.length },
          { label: "2024", value: thisYear },
          {
            label: "Avg Rating",
            value: (
              SAMPLE_BOOKS.reduce((s, b) => s + b.rating, 0) /
              SAMPLE_BOOKS.length
            ).toFixed(1),
          },
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
        {ALL_TAGS.map((tag) => (
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
            <BookCard book={book} onClick={() => setSelectedBook(book)} />
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

      {/* Detail Modal */}
      <DetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
}
