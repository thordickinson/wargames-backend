import * as yup from "yup"
import GameSession from "../../models/GameSession";
import { createNotFoundError } from "../../utils/exception.utils";
import { Types } from "mongoose";


const CreateSessionInputSchema = yup.object().shape({
    gameSessionId: yup.string().required()
}) 

export async function createPlanningSession(input: never){
    const {gameSessionId} = await CreateSessionInputSchema.validate(input);
    const session = await GameSession.findById(gameSessionId);
    if(!session) throw createNotFoundError("Session not found");
    if(session.status !== "started") throw createNotFoundError("Cannot create planning session for an ended session");
    
    const planningId = new Types.ObjectId();
    const sessions = session.planning.sessions?? []
    
    //find if there is a planning session already running
    if(sessions.some((s: any) => !s.endedAt)) throw createNotFoundError("Cannot create planning while there is an ongoing session");
    
    sessions.push({_id: planningId})
    session.planning.sessions = sessions;
    await session.save();
    return planningId
}