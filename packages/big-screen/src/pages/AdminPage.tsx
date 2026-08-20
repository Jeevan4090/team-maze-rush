import { useState } from "react";
import type { GameState } from "@tmr/shared";
import type { Socket } from "socket.io-client";

interface Props {
  gameState: GameState;
  getSocket: () => Socket | null;
}

export default function AdminPage({ gameState, getSocket }: Props) {
  const [adminToken, setAdminToken] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  function emit(event: string, payload: Record<string, unknown> = {}) {
    const socket = getSocket();
    if (!socket) return;
    socket.emit(event as never, { adminToken, ...payload } as never);
  }

  if (!unlocked) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 14 }}>
        <h2 style={{ color: "var(--purple)" }}>Admin Access</h2>
        <input
          type="password"
          placeholder="Admin token"
          value={adminToken}
          onChange={(e) => setAdminToken(e.target.value)}
          style={{ padding: 12, borderRadius: 10, border: "2px solid var(--line)", width: 260, textAlign: "center" }}
        />
        <button className="btn btn-primary" onClick={() => setUnlocked(true)}>Unlock Admin Panel</button>
        <p style={{ fontSize: 11, color: "var(--dim)" }}>Token isn't verified until your first action — the server rejects it silently if wrong.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16, height: "100%", overflowY: "auto" }}>
      <h2 style={{ color: "var(--purple)", margin: 0 }}>⚙️ Admin Panel — Team Maze Rush</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ fontSize: 12, color: "var(--dim)", letterSpacing: 1 }}>GAME CONTROL</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn-primary" id="startBtn" onClick={() => emit("admin:startGame")}>▶ Start</button>
            <button className="btn btn-neutral" id="pauseBtn" onClick={() => emit("admin:pauseGame")}>⏸ Pause</button>
            <button className="btn btn-primary" id="resumeBtn" onClick={() => emit("admin:resumeGame")}>⏵ Resume</button>
            <button className="btn btn-danger" id="endBtn" onClick={() => emit("admin:endGame")}>⏹ End</button>
            <button className="btn btn-neutral" id="resetBtn" onClick={() => emit("admin:resetGame")}>↺ Reset</button>
          </div>
          <p style={{ fontSize: 11, color: "var(--dim)", marginTop: 8 }}>Phase: <b>{gameState.phase}</b></p>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ fontSize: 12, color: "var(--dim)", letterSpacing: 1 }}>TRIGGER LIVE EVENT</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn btn-primary" id="gateOpenBtn" onClick={() => emit("admin:triggerEvent", { type: "gate_open" })}>Gate Open</button>
            <button className="btn btn-primary" id="gateCloseBtn" onClick={() => emit("admin:triggerEvent", { type: "gate_close" })}>Gate Close</button>
            <button className="btn btn-primary" id="energySurgeBtn" onClick={() => emit("admin:triggerEvent", { type: "energy_surge" })}>Energy Surge</button>
            <button className="btn btn-primary" id="monsterSurgeBtn" onClick={() => emit("admin:triggerEvent", { type: "monster_surge" })}>Monster Surge</button>
            <button className="btn btn-primary" id="obstacleShiftBtn" onClick={() => emit("admin:triggerEvent", { type: "obstacle_shift" })}>Obstacle Shift</button>
          </div>
          <p style={{ fontSize: 11, color: "var(--dim)", marginTop: 8 }}>Applies to a random active team (per-team targeting is a future add).</p>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ fontSize: 12, color: "var(--dim)", letterSpacing: 1 }}>FEATURED TEAM (BIG SCREEN)</h3>
          <select
            style={{ width: "100%", padding: 8, borderRadius: 8 }}
            value={gameState.featuredTeamId ?? ""}
            onChange={(e) => emit("admin:setFeaturedTeam", { teamId: e.target.value })}
          >
            <option value="">— pick a team —</option>
            {gameState.teams.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="card" style={{ padding: 16, flex: 1, overflowY: "auto" }}>
        <h3 style={{ fontSize: 12, color: "var(--dim)", letterSpacing: 1 }}>LIVE TEAM STATUS</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "var(--dim)", fontSize: 10 }}>
              <th style={{ padding: 6 }}>Team</th>
              <th style={{ padding: 6 }}>Level</th>
              <th style={{ padding: 6 }}>Players</th>
              <th style={{ padding: 6 }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {gameState.teams.map((t) => (
              <tr key={t.id} style={{ borderTop: "1px solid var(--line)" }}>
                <td style={{ padding: 6 }}>{t.icon} {t.name}</td>
                <td style={{ padding: 6 }}>L{t.progress.level}</td>
                <td style={{ padding: 6 }}>{t.players.filter((p) => p.status === "connected").length}/{t.players.length}</td>
                <td style={{ padding: 6 }}>{t.score.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
