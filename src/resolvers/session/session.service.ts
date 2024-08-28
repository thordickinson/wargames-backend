import * as yup from "yup"
import PredefinedGame from "../../models/PredefinedGame";
import { createNotFoundError } from "../../utils/exception.utils";
import GameSession from "../../models/GameSession";

const CreateSessionInputSchema = yup.object().shape({
    gameId: yup.string().required(),
    planningDuration: yup.number().required()
})

export async function createGameSession(input: never){
    const {gameId, planningDuration} = await CreateSessionInputSchema.validate(input);
    const game = await PredefinedGame.findById(gameId);
    if(!game) throw createNotFoundError("Game not found");

    const session = {
        gameId,
        planning: {
            configuration: { 
                planningDuration
            }
        }
    }   
    const created = await GameSession.create(session);
    return created._id
}

export async function getGameSessionDetails({sessionId}: {sessionId: string}){
    const session = await GameSession.findById(sessionId);
    if(!session) throw createNotFoundError("Session not found");
    return session
}
