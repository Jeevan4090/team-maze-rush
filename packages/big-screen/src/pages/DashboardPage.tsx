import { useMemo } from "react";
import type { GameState, LeaderboardRow, Team } from "@tmr/shared";

function buildRows(teams: Team[]): LeaderboardRow[] {
  const rows: LeaderboardRow[] = [];
  let rank = 0;
  for (const level of [3, 2, 1] as const) {
    const group = teams.filter((t) => t.progress.level === level).sort((a, b) => b.score - a.score);
    for (const t of group) {
      rank++;
      rows.push({
        rank,
        team: { id: t.id, name: t.name, color: t.color, darkColor: t.darkColor, icon: t.icon },
        level: t.progress.level,
        score: t.score,
        playersActive: t.players.filter((p) => p.status === "connected").length,
        playersTotal: t.players.length,
      });
    }
  }
  return rows;
}

function timeString(sec: number | null): string {
  if (sec === null) return "--:--";
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function DashboardPage({ gameState }: { gameState: GameState }) {
  const rows = useMemo(() => buildRows(gameState.teams), [gameState.teams]);
  const featured = gameState.teams.find((t) => t.id === gameState.featuredTeamId) ?? gameState.teams[0];

  const grouped: Record<1 | 2 | 3, LeaderboardRow[]> = { 1: [], 2: [], 3: [] };
  for (const r of rows) grouped[r.level].push(r);

  const levelLabel: Record<1 | 2 | 3, string> = { 1: "LEVEL 1 — EASY", 2: "LEVEL 2 — HARD", 3: "LEVEL 3 — EXTREME" };
  const levelColor: Record<1 | 2 | 3, string> = { 1: "var(--green)", 2: "var(--orange)", 3: "var(--pink)" };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 16, gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "var(--purple)", margin: 0 }}>TEAM MAZE RUSH</h1>
        <div className="card" style={{ padding: "8px 18px", textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: "var(--pink)" }}>{timeString(gameState.timeRemainingSec)}</div>
          <div style={{ fontSize: 10, color: "var(--dim)", fontWeight: 700 }}>TIME REMAINING</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, flex: 1, minHeight: 0 }}>
        {/* Leaderboard */}
        <div className="card" style={{ flex: 1.3, overflowY: "auto", padding: 14 }}>
          {[3, 2, 1].map((level) => (
            <div key={level}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: levelColor[level as 1 | 2 | 3], padding: "10px 4px 6px" }}>
                {levelLabel[level as 1 | 2 | 3]}
              </div>
              {grouped[level as 1 | 2 | 3].length === 0 && (
                <div style={{ fontSize: 11, color: "var(--dim)", padding: "2px 6px 8px" }}>No teams here yet</div>
              )}
              {grouped[level as 1 | 2 | 3].map((row) => (
                <div
                  key={row.team.id}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 12,
                    background: row.rank === 1 ? "#fff7e0" : "#faf8ff", border: "1px solid var(--line)", marginBottom: 6,
                  }}
                >
                  <div style={{ width: 20, textAlign: "center", fontWeight: 900, color: row.rank === 1 ? "#ca8a04" : "var(--dim)" }}>{row.rank}</div>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: row.team.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
                    {row.team.icon}
                  </div>
                  <div style={{ flex: "0 0 100px", fontWeight: 800, fontSize: 12.5 }}>{row.team.name}</div>
                  <div style={{ flex: 1, display: "flex", gap: 2 }}>
                    {Array.from({ length: row.playersTotal }).map((_, i) => (
                      <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i < row.playersActive ? row.team.color : "var(--line)" }} />
                    ))}
                  </div>
                  <div style={{ fontWeight: 900, fontSize: 14, minWidth: 60, textAlign: "right" }}>{row.score.toLocaleString()}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Live Now + Events */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minHeight: 0 }}>
          <div className="card" style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 11, color: "var(--dim)", fontWeight: 700, letterSpacing: 1 }}>LIVE NOW</div>
            <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>{featured?.name ?? "—"}</div>
            <div style={{ flex: 1, background: "#f4f1fb", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--dim)", fontSize: 12 }}>
              Maze canvas renders here — hook up MazeLayout from player:mazeAssigned / team data
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: 8, fontSize: 12 }}>
              <div><b style={{ display: "block", fontSize: 16, color: "var(--purple)" }}>{featured?.progress.level ?? "-"}</b>Level</div>
              <div><b style={{ display: "block", fontSize: 16, color: "var(--purple)" }}>{featured?.score.toLocaleString() ?? 0}</b>Score</div>
              <div><b style={{ display: "block", fontSize: 16, color: "var(--purple)" }}>{featured?.players.length ?? 0}/5</b>Players</div>
            </div>
          </div>

          <div className="card" style={{ padding: 12, maxHeight: 160, overflowY: "auto" }}>
            <div style={{ fontSize: 11, color: "var(--dim)", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>RECENT EVENTS</div>
            {gameState.recentEvents.length === 0 && <div style={{ fontSize: 12, color: "var(--dim)" }}>No events yet</div>}
            {gameState.recentEvents.map((e) => (
              <div key={e.id} style={{ fontSize: 12.5, padding: "6px 0", borderBottom: "1px solid var(--line)" }}>{e.message}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
