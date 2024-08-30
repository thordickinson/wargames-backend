import mongoose from 'mongoose';                                                                                                                                                      
                                                                                                                                                                                       
const predefinedGameSchema = new mongoose.Schema({                                                                                                                                    
  key: String,                                                                                                                                                                        
  name: String,                                                                                                                                                                       
  description: String,                                                                                                                                                                
  teams: [                                                                                                                                                                            
    {                                                                                                                                                                                 
      key: String,                                                                                                                                                                    
      name: String,                                                                                                                                                                   
      description: String,                                                                                                                                                            
      color: String,                                                                                                                                                                  
    },                                                                                                                                                                                
  ],                                                                                                                                                                                  
  roles: [                                                                                                                                                                            
    {                                                                                                                                                                                 
      key: String,                                                                                                                                                                    
      name: String,                                                                                                                                                                   
      description: String,                                                                                                                                                            
    },                                                                                                                                                                                
  ],                                                                                                                                                                                  
});                                                                                                                                                                                   
                                                                                                                                                                                      
const PredefinedGame = mongoose.model('games', predefinedGameSchema);                                                                                                        
                                                                                                                                                                                      
export default PredefinedGame;
