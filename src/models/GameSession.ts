import mongoose from 'mongoose';                                                                                                                                                      
                                                                                                                                                                                       
const gameSessionSchema = new mongoose.Schema({                                                                                                                                       
  createdAt: String,                                                                                                                                                                  
  status: String,                                                                                                                                                                     
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'PredefinedGame' },                                                                                                            
  players: [                                                                                                                                                                          
    {                                                                                                                                                                                 
      name: String,                                                                                                                                                                   
      role: String,                                                                                                                                                                   
      team: String,                                                                                                                                                                   
    },                                                                                                                                                                                
  ],                                                                                                                                                                                  
  planningSessions: [                                                                                                                                                             
    {                                                                                                                                                                                 
      _id: mongoose.Schema.Types.ObjectId,                                                                                                                                            
      startedAt: String,                                                                                                                                                              
      endedAt: String,                                                                                                                                                                
      endTrigger: String,                                                                                                                                                             
      plannedLength: String,                                                                                                                                                          
    },                                                                                                                                                                                
  ],                                                                                                                                                                                  
});                                                                                                                                                                                   
                                                                                                                                                                                      
const GameSession = mongoose.model('GameSession', gameSessionSchema);                                                                                                                 
                                                                                                                                                                                      
export default GameSession;
