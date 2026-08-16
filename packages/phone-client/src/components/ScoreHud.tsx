export default function ScoreHud({ teamName, teamColor, score }: { teamName: string; teamColor: string; score: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", border: "1px solid var(--line)", borderRadius: 999, padding: "6px 14px", fontWeight: 800, fontSize: 12.5 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: teamColor }} />
        {teamName}
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: "var(--purple)" }}>{score.toLocaleString()}</div>
        <div style={{ fontSize: 9, color: "var(--dim)", fontWeight: 700, letterSpacing: 1 }}>SCORE</div>
      </div>
    </div>
  );
}
