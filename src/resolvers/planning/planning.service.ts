import * as yup from "yup"
import GameSession from "../../models/GameSession";
import { createInputError, createNotFoundError } from "../../utils/exception.utils";
import { Types } from "mongoose";


const CreateSessionInputSchema = yup.object().shape({
    gameSessionId: yup.string().required()
}) 

export async function createPlanningSession(input: never){
    const {gameSessionId} = await CreateSessionInputSchema.validate(input);
    const session = await GameSession.findById(gameSessionId);
    if(!session) throw createNotFoundError("Session not found");
    if(session.startedAt == null) 
        throw createInputError("Cannot create planning session non started game session");
    if(session.endedAt != null)
        throw createInputError("Cannot create planning session for an ended game session");

    const planningId = new Types.ObjectId();
    const sessions = session.planning.sessions?? []
    
    //find if there is a planning session already running
    if(sessions.some((s: any) => !s.endedAt)) 
        throw createNotFoundError("Cannot create planning while there is an ongoing session");
    
    sessions.push({_id: planningId})
    session.planning.sessions = sessions;
    await session.save();
    return planningId
}
const stopPlanningSessionInputSchema = yup.object().shape({
    gameSessionId: yup.string().required(),
    planningSessionId: yup.string().required(),
    manual: yup.boolean().required()
})

export async function stopPlanningSession(input: never){
    const {gameSessionId, planningSessionId, manual} = await stopPlanningSessionInputSchema.validate(input);
    const session = await GameSession.findById(gameSessionId);
    if(!session) throw createNotFoundError("Session not found");
    if( session.status !== "started" ) 
        throw createNotFoundError("Cannot stop planning session for an non-running session");
    if(!session.planning.sessions || !session.planning.sessions.some((s: any) => s._id.toString() === planningSessionId)) 
        throw createNotFoundError("Unable to find given planning session");
    
    const planning = session.planning.sessions.find((s: any) => s._id.toString() === planningSessionId);
    planning.endedAt = new Date();
    planning.endTrigger = manual? "manual": "auto";
    await session.save();
    return true
}
