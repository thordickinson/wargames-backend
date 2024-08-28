import PredefinedGame from '../models/PredefinedGame';
import { listPredefinedGames } from './game/game.service';

const resolvers = {
  Query: {
    listPredefinedGames: listPredefinedGames,
  },
};

export default resolvers;
