import { wrapResolver } from '../utils/grapqhl.utils';
import { getGameDetails, listPredefinedGames } from './game/game.service';
import { createGameSession, getGameSessionDetails } from './session/session.service';

const resolvers = {
  Query: {
    listPredefinedGames: wrapResolver(listPredefinedGames),
    getGameDetails: wrapResolver(getGameDetails),
    getGameSessionDetails: wrapResolver(getGameSessionDetails)
  },
  Mutation: {
    createGameSession: wrapResolver(createGameSession),
  }
};

export default resolvers;
