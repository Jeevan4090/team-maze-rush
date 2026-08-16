export default function CountdownPage({ count }: { count: number | string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <div style={{ fontSize: 220, fontWeight: 900, color: "var(--purple)" }}>{count}</div>
    </div>
  );
}
