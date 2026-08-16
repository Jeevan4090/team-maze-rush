import type { PlayerSelfView, MazeLayout, GameState, Direction } from "@tmr/shared";
import ScoreHud from "../components/ScoreHud.js";
import ObjectiveBar from "../components/ObjectiveBar.js";
import MiniMazeCanvas from "../components/MiniMazeCanvas.js";
import DPad from "../components/DPad.js";

const LEVEL_NAMES: Record<1 | 2 | 3, string> = { 1: "BOOT SEQUENCE", 2: "FIREWALL BREACH", 3: "SYSTEM OVERLOAD" };

interface Props {
  self: PlayerSelfView;
  maze: MazeLayout;
  gameState: GameState | null;
  onMove: (d: Direction) => void;
}

export default function PlayPage({ self, maze, gameState, onMove }: Props) {
  const myTeam = gameState?.teams.find((t) => t.players.some((p) => p.id === self.id));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 16, gap: 12 }}>
      <ScoreHud teamName={myTeam?.name ?? "Your Team"} teamColor={myTeam?.color ?? "#7c3aed"} score={myTeam?.score ?? self.score} />

      {myTeam && (
        <ObjectiveBar
          level={myTeam.progress.level}
          levelName={LEVEL_NAMES[myTeam.progress.level]}
          progress={myTeam.progress.objectiveProgress}
          target={myTeam.progress.objectiveTarget}
        />
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <MiniMazeCanvas maze={maze} myPosition={self.position} myColor={myTeam?.color ?? "#7c3aed"} />
      </div>

      <DPad onMove={onMove} />
    </div>
  );
}
