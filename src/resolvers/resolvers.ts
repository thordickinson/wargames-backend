import { wrapResolver } from '../utils/grapqhl.utils';
import { getGameDetails, listPredefinedGames } from './game/game.service';
import { createPlanningSession, stopPlanningSession } from './planning/planning.service';
import { cancelGameSession, closeGammingSession, createGameSession, getGameSessionDetails, 
  joinUserToSession, startGameSession } from './session/session.service';

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
    createPlanningSession: wrapResolver(createPlanningSession),
    stopPlanningSession: wrapResolver(stopPlanningSession),
    closeGameSession: wrapResolver(closeGammingSession)
  }
};

export default resolvers;
