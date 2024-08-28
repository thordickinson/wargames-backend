import PredefinedGame from '../models/PredefinedGame';

const resolvers = {
  Query: {
    listPredefinedGames: async () => {
      try {
        const games = await PredefinedGame.find({});
        return games;
      } catch (error) {
        console.error('Error fetching predefined games:', error);
        throw new Error('Failed to fetch predefined games');
      }
    },
  },
};

export default resolvers;
