import PredefinedGame from "../../models/PredefinedGame";

export async function listPredefinedGames () {
    try {
      const games = await PredefinedGame.find({});
      return games;
    } catch (error) {
      console.error('Error fetching predefined games:', error);
      throw new Error('Failed to fetch predefined games');
    }
}
