import PredefinedGame from "../../models/PredefinedGame";
import { createNotFoundError } from "../../utils/exception.utils";

export async function getGameDetails({ gameId }: {gameId: string }) {
  const game = await PredefinedGame.findById(gameId);
  if (!game) {
    throw createNotFoundError("Game not found");
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
