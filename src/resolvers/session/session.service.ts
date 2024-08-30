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


const JoinUserToSessionInputSchema = yup.object().shape({
    sessionId: yup.string().required(),
    name: yup.string().required(),
    team: yup.string().required(),
    role: yup.string().required()
})

export async function joinUserToSession(input: never){
    const { sessionId, name, team, role } = await JoinUserToSessionInputSchema.validate(input);
    const session = await GameSession.findById(sessionId);
    if(!session) throw createNotFoundError("Session not found");

    if(session.startedAt != null) throw createNotFoundError("Cannot join to an already started session");
    //TODO: Still need to validate team and role, by now just trust that they are valid
    
    //Check if another user with same name is already in the session, then skip
    if(session.players.some((p: any) => p.name === name)) return false;

    session.players.push({name, team, role});
    await session.save();
    return true
}

const SesionIdInputSchema = yup.object().shape({
    sessionId: yup.string().required()
})

export async function startGameSession(input: never){
    const {sessionId} = await SesionIdInputSchema.validate(input);
    const filter = { _id: sessionId, startedAt: null };
    const updated = await GameSession.updateOne(filter, {startedAt: new Date()});
    return updated.nModified > 0
}

export async function cancelGameSession(input: never) {
    const {sessionId} = await SesionIdInputSchema.validate(input);
    const updated = await GameSession.deleteOne({_id: sessionId, startedAt: null});
    return updated.deletedCount > 0
}

export async function closeGammingSession(input: never){
    const {sessionId} = await SesionIdInputSchema.validate(input);
    const filter = {_id: sessionId, startedAt: {$ne: null}, endedAt: null};
    const updated = await GameSession.updateOne(filter, {endedAt: new Date()});
    return updated.nModified > 0
}

