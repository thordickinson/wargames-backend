import { wrapResolver } from '../utils/grapqhl.utils';
import { getGameDetails, listPredefinedGames } from './game/game.service';
import { createGameSession, getGameSessionDetails, joinUserToSession } from './session/session.service';

const resolvers = {
  Query: {
    listPredefinedGames: wrapResolver(listPredefinedGames),
    getGameDetails: wrapResolver(getGameDetails),
    getGameSessionDetails: wrapResolver(getGameSessionDetails)
  },
  Mutation: {
    createGameSession: wrapResolver(createGameSession),
    joinToSession: wrapResolver(joinUserToSession)
  }
};

export default resolvers;
