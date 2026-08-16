import type { GameResults } from "@tmr/shared";

export default function FinalPage({ results }: { results: GameResults | null }) {
  if (!results) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <p style={{ color: "var(--dim)" }}>Waiting for final results...</p>
      </div>
    );
  }

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 24 }}>
      <h1 style={{ fontSize: 48, fontWeight: 900, color: "var(--pink)", margin: 0 }}>🏁 GAME OVER</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 400 }}>
        {results.results.slice(0, 10).map((r, i) => (
          <div key={r.teamId} className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px" }}>
            <span style={{ fontSize: 22 }}>{medals[i] ?? `#${r.rank}`}</span>
            <span style={{ flex: 1, fontWeight: 800 }}>{r.teamName}</span>
            <span style={{ fontWeight: 900, color: "var(--purple)" }}>{r.score.toLocaleString()} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
