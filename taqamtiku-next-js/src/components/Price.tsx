export default function Price({ amount }: { amount: number }) {
  return (
    <span className="price">
      {new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)}{" "}
    </span>
  );
}
