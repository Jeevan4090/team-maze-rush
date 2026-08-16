import type { Direction } from "@tmr/shared";

const btnStyle: React.CSSProperties = {
  borderRadius: 16, border: "2px solid var(--purple)", background: "white",
  color: "var(--purple)", fontSize: 24, display: "flex", alignItems: "center",
  justifyContent: "center", boxShadow: "0 4px 0 var(--purple-light)",
};

export default function DPad({ onMove }: { onMove: (d: Direction) => void }) {
  function press(d: Direction) {
    if (navigator.vibrate) navigator.vibrate(12);
    onMove(d);
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "66px 66px 66px", gridTemplateRows: "66px 66px 66px", gap: 8, margin: "auto auto 6px" }}>
      <div />
      <button style={{ ...btnStyle, gridColumn: 2, gridRow: 1 }} onClick={() => press("U")}>▲</button>
      <div />
      <button style={{ ...btnStyle, gridColumn: 1, gridRow: 2 }} onClick={() => press("L")}>◀</button>
      <div style={{ ...btnStyle, gridColumn: 2, gridRow: 2, borderColor: "var(--line)", color: "var(--dim)", boxShadow: "none" }}>◈</div>
      <button style={{ ...btnStyle, gridColumn: 3, gridRow: 2 }} onClick={() => press("R")}>▶</button>
      <div />
      <button style={{ ...btnStyle, gridColumn: 2, gridRow: 3 }} onClick={() => press("D")}>▼</button>
      <div />
    </div>
  );
}
