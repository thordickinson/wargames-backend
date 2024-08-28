import { Types } from "mongoose";
import PredefinedGame from "../../models/PredefinedGame";

export async function getGameDetails({ gameId }: {gameId: string }) {
  const game = await PredefinedGame.findById(new Types.ObjectId(gameId));
  if (!game) {
    throw new Error("Game not found");
  }
  return {
    id: game._id,
    name: game.name,
    roles: game.roles,
    teams: game.teams,
  };
}

export async function listPredefinedGames() {
  const games = await PredefinedGame.find({});
  return games;
}
