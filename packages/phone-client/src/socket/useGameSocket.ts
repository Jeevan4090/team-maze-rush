import { useEffect, useRef, useState, useCallback } from "react";
import { io, type Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  PlayerSelfView,
  MazeLayout,
  Direction,
  PlayerJoinAck,
  GameState,
} from "@tmr/shared";

type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

export function useGameSocket() {
  const socketRef = useRef<AppSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [self, setSelf] = useState<PlayerSelfView | null>(null);
  const [teamName, setTeamName] = useState<string | null>(null);
  const [maze, setMaze] = useState<MazeLayout | null>(null);
  const [moveRejectedAt, setMoveRejectedAt] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const socket: AppSocket = io(SERVER_URL, { transports: ["websocket", "polling"] });
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("player:selfUpdate", (view) => setSelf(view));
    socket.on("player:mazeAssigned", (m) => setMaze(m));
    socket.on("player:moveRejected", () => setMoveRejectedAt(Date.now()));
    socket.on("game:stateUpdate", (state) => setGameState(state));

    return () => {
      socket.disconnect();
    };
  }, []);

  const join = useCallback((name: string): Promise<PlayerJoinAck> => {
    return new Promise((resolve) => {
      const socket = socketRef.current;
      if (!socket) return resolve({ ok: false, error: "Not connected" });
      socket.emit("player:join", { name }, (ack) => {
        if (ack.ok && ack.player) {
          setSelf(ack.player);
          setTeamName(ack.teamName ?? null);
        }
        resolve(ack);
      });
    });
  }, []);

  const move = useCallback((direction: Direction) => {
    socketRef.current?.emit("player:move", { direction });
  }, []);

  return { connected, self, teamName, maze, moveRejectedAt, gameState, join, move };
}
