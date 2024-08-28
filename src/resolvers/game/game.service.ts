import PredefinedGame from "../../models/PredefinedGame";

export async function getGameDetails(gameId: string) {
    try {
      const game = await PredefinedGame.findById(gameId);
      if (!game) {
        throw new Error('Game not found');
      }
      return {
        id: game._id,
        name: game.name,
        roles: game.roles,
        teams: game.teams,
      };
    } catch (error) {
      console.error('Error fetching game details:', error);
      throw new Error('Failed to fetch game details');
    }
}

export async function listPredefinedGames() {
    try {
      const games = await PredefinedGame.find({});
      return games;
    } catch (error) {
      console.error('Error fetching predefined games:', error);
      throw new Error('Failed to fetch predefined games');
    }
}
