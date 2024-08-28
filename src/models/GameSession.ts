import mongoose from "mongoose";

const PlanningSessionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  startedAt: { default: Date.now, type: Date },
  endedAt: Date,
  endTrigger: { type: String, enum: ["manual", "auto"] },
});

const gameSessionSchema = new mongoose.Schema({
  createdAt: { default: Date.now, type: Date },
  status: {
    default: "created",
    type: String,
    enum: ["created", "started", "ended"],
  },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: "PredefinedGame" },
  players: [
    {
      name: String,
      role: String /* Any role inside the game */,
      team: String /* Any team inside the game */,
    },
  ],
  planning: {
    sessions: [PlanningSessionSchema],
  },
});

const GameSession = mongoose.model("GameSession", gameSessionSchema);

export default GameSession;
