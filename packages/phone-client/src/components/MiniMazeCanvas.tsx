import { useEffect, useRef } from "react";
import type { MazeLayout, GridPosition } from "@tmr/shared";

interface Props {
  maze: MazeLayout;
  myPosition: GridPosition | null;
  myColor: string;
}

/** Original visual identity: rounded barriers, diamond crystals, blob monsters — not a Pac-Man clone. */
export default function MiniMazeCanvas({ maze, myPosition, myColor }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const cell = size / maze.gridWidth;

    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "#f4f1fb";
    ctx.fillRect(0, 0, size, size);

    // Barriers
    ctx.fillStyle = "#c4b5fd";
    for (const c of maze.cells) {
      if (c.type === "wall") {
        roundRect(ctx, c.x * cell + 1, c.y * cell + 1, cell - 2, cell - 2, cell * 0.2);
        ctx.fill();
      } else if (c.type === "gate_closed") {
        ctx.fillStyle = "#fca5a5";
        roundRect(ctx, c.x * cell + 1, c.y * cell + 1, cell - 2, cell - 2, cell * 0.2);
        ctx.fill();
        ctx.fillStyle = "#c4b5fd";
      }
    }

    // Crystals (diamonds)
    for (const col of maze.collectibleSpawns) {
      if (!col.active) continue;
      ctx.save();
      ctx.translate(col.position.x * cell + cell / 2, col.position.y * cell + cell / 2);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = col.type === "crystal_special" ? "#f9a8d4" : col.type === "boost_shield" ? "#fde68a" : "#86efac";
      const s = cell * 0.22;
      ctx.fillRect(-s / 2, -s / 2, s, s);
      ctx.restore();
    }

    // Monsters (blob with eye-slits, original design)
    for (const m of maze.monsterSpawns) {
      if (m.spawnPosition.x < 0) continue; // temporarily defeated
      const mx = m.spawnPosition.x * cell + cell / 2;
      const my = m.spawnPosition.y * cell + cell / 2;
      ctx.fillStyle = "#fca5a5";
      ctx.beginPath();
      ctx.ellipse(mx, my, cell * 0.32, cell * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2b2440";
      ctx.fillRect(mx - cell * 0.14, my - cell * 0.06, cell * 0.1, cell * 0.14);
      ctx.fillRect(mx + cell * 0.04, my - cell * 0.06, cell * 0.1, cell * 0.14);
    }

    // My player (orb with outline)
    if (myPosition) {
      const px = myPosition.x * cell + cell / 2;
      const py = myPosition.y * cell + cell / 2;
      ctx.fillStyle = myColor;
      ctx.beginPath();
      ctx.arc(px, py, cell * 0.32, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#2b2440";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [maze, myPosition, myColor]);

  return <canvas ref={canvasRef} width={300} height={300} style={{ width: "100%", maxWidth: 300, borderRadius: 14, border: "1px solid var(--line)" }} />;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
