export default function WaitingPage({ teamName }: { teamName: string | null }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12, textAlign: "center" }}>
      <div style={{ fontSize: 16, fontWeight: 800 }}>
        You're in <span style={{ color: "var(--purple)" }}>{teamName ?? "your team"}</span>
      </div>
      <div style={{ fontSize: 13, color: "var(--dim)" }}>Waiting for the game to start...</div>
    </div>
  );
}
