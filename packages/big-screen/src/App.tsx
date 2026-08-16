import { useEffect, useState } from "react";
import { useGameSocket } from "./socket/useGameSocket.js";
import LobbyPage from "./pages/LobbyPage.js";
import CountdownPage from "./pages/CountdownPage.js";
import DashboardPage from "./pages/DashboardPage.js";
import FinalPage from "./pages/FinalPage.js";
import AdminPage from "./pages/AdminPage.js";
import type { GameResults } from "@tmr/shared";

export default function App() {
  const { connected, gameState, getSocket } = useGameSocket();
  const [countdown, setCountdown] = useState<number | string>(3);
  const [results, setResults] = useState<GameResults | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    const onTick = (n: number) => setCountdown(n > 0 ? n : "GO!");
    const onEnded = (r: GameResults) => setResults(r);
    socket.on("game:countdownTick", onTick);
    socket.on("game:ended", onEnded);
    return () => {
      socket.off("game:countdownTick", onTick);
      socket.off("game:ended", onEnded);
    };
  }, [getSocket, gameState]);

  if (!connected || !gameState) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "var(--dim)" }}>
        Connecting to server...
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <button
        onClick={() => setShowAdmin((v) => !v)}
        style={{ position: "absolute", top: 8, right: 8, zIndex: 10, fontSize: 11, padding: "6px 10px", borderRadius: 8, border: "1px solid var(--line)", background: "white" }}
      >
        {showAdmin ? "← Back to Big Screen" : "⚙️ Admin"}
      </button>

      {showAdmin ? (
        <AdminPage gameState={gameState} getSocket={getSocket} />
      ) : gameState.phase === "lobby" ? (
        <LobbyPage gameState={gameState} />
      ) : gameState.phase === "countdown" ? (
        <CountdownPage count={countdown} />
      ) : gameState.phase === "ended" ? (
        <FinalPage results={results} />
      ) : (
        <DashboardPage gameState={gameState} />
      )}
    </div>
  );
}
