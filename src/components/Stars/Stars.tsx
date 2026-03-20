import "./Stars.css";

type StarsProps = {
  rating: number;
};

export default function Stars({ rating }: StarsProps) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`star ${i <= rating ? "star--active" : "star--inactive"}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}
