import type { GameState } from "@tmr/shared";

const PHONE_URL = import.meta.env.VITE_PHONE_CLIENT_URL || "http://localhost:5174";

export default function LobbyPage({ gameState }: { gameState: GameState }) {
  const qrTarget = encodeURIComponent(PHONE_URL);
  const qrImgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${qrTarget}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 24, textAlign: "center" }}>
      <h1 style={{ fontSize: 48, fontWeight: 900, color: "var(--purple)", margin: 0 }}>TEAM MAZE RUSH</h1>
      <p style={{ color: "var(--dim)", margin: 0 }}>Scan → Enter your name → Get your team</p>

      <img src={qrImgSrc} alt="Scan to join" width={220} height={220} style={{ borderRadius: 16, border: "4px solid var(--ink)" }} />

      <div style={{ display: "flex", gap: 48 }}>
        <div>
          <div style={{ fontSize: 40, fontWeight: 900, color: "var(--pink)" }}>{gameState.totalPlayers}</div>
          <div style={{ fontSize: 12, color: "var(--dim)", fontWeight: 700, letterSpacing: 1 }}>PLAYERS JOINED</div>
        </div>
        <div>
          <div style={{ fontSize: 40, fontWeight: 900, color: "var(--pink)" }}>{gameState.teams.length}</div>
          <div style={{ fontSize: 12, color: "var(--dim)", fontWeight: 700, letterSpacing: 1 }}>TEAMS FORMING</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", maxWidth: 700 }}>
        {gameState.teams.map((t) => (
          <div key={t.id} className="card" style={{ padding: "10px 16px", display: "flex", gap: 8, alignItems: "center", borderColor: t.color }}>
            <span>{t.icon}</span>
            <span style={{ fontWeight: 800, fontSize: 13 }}>{t.name}</span>
            <span style={{ color: "var(--dim)", fontSize: 12 }}>{t.players.length}/5</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, color: "var(--dim)" }}>Waiting for organizer to start the game...</p>
    </div>
  );
}
