import { useGameSocket } from "./socket/useGameSocket.js";
import JoinPage from "./pages/JoinPage.js";
import WaitingPage from "./pages/WaitingPage.js";
import PlayPage from "./pages/PlayPage.js";

export default function App() {
  const { connected, self, teamName, maze, gameState, join, move } = useGameSocket();

  if (!connected) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "var(--dim)" }}>
        Connecting...
      </div>
    );
  }

  if (!self) {
    return <JoinPage onJoin={join} />;
  }

  const isLive = gameState?.phase === "live";

  if (!isLive || !maze) {
    return <WaitingPage teamName={teamName} />;
  }

  return <PlayPage self={self} maze={maze} gameState={gameState} onMove={move} />;
}
