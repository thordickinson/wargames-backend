import { wrapResolver } from '../utils/grapqhl.utils';
import { getGameDetails, listPredefinedGames } from './game/game.service';
import { createPlanningSession } from './planning/planning.service';
import { cancelGameSession, createGameSession, getGameSessionDetails, joinUserToSession, startGameSession } from './session/session.service';

const resolvers = {
  Query: {
    listPredefinedGames: wrapResolver(listPredefinedGames),
    getGameDetails: wrapResolver(getGameDetails),
    getGameSessionDetails: wrapResolver(getGameSessionDetails)
  },
  Mutation: {
    createGameSession: wrapResolver(createGameSession),
    joinToSession: wrapResolver(joinUserToSession),
    startGameSession: wrapResolver(startGameSession),
    cancelGameSession: wrapResolver(cancelGameSession),
    createPlanningSession: wrapResolver(createPlanningSession)
  }
};

export default resolvers;
