
const typeDefs = `#grapqhl
# JSON scalar type to handle dynamic data structures.
scalar JSON
scalar DateTime

type Query {
  # List the names of predefined games to display in the frontend.
  listPredefinedGames: [PredefinedGame]

  # Fetch the details of a specific game, including default roles and teams configured for the game.
  getGameDetails(gameId: ID!): GameDetails

  # Fetch the session details for a game session, including participants, roles, teams, and start time.
  getGameSessionDetails(sessionId: ID!): GameSessionDetails

  # Generate and fetch the QR code and session details, allowing clients to join the session.
  getSessionQRCode(sessionId: ID!): QRCodeDetails

  # Fetch the basic information of a planning session, including the session ID, game session ID, start date, and status.
  getPlanningSessionInfo(planningSessionId: ID!): PlanningSessionInfo

  # Fetch the results of a game session, including the processing status and a JSON object with the data.
  getGameSessionResults(sessionId: ID!): GameSessionResults
}

# Unified Mutations

type Mutation {
  # Create a new game session using the selected game ID and configuration details.
  createGameSession(gameId: ID!, planningDuration: Int!): ID!

  # Allows a user to join a game session.
  joinToSession(sessionId: String!, name: String!, team: String!, role: String!): Boolean!

  # Start the game session, moving it from 'created' to 'started', which stops more users from joining.
  startGameSession(sessionId: ID!): Boolean!

  # Cancel a game session, removing it from the system entirely.
  cancelGameSession(sessionId: ID!): Boolean!

  # Create a new planning session within an existing game session.
  createPlanningSession(gameSessionId: ID!): ID!

  # Stop the planning session, either automatically by a timer or manually by the user.
  stopPlanningSession(gameSessionId: ID!, planningSessionId: ID!, manual: Boolean!): Boolean!

  # Close the entire game session, triggering asynchronous processing of results, and redirecting to the results screen.
  closeGameSession(sessionId: ID!): Boolean!
}

# Types

# Represents a predefined game with its ID and name.
type PredefinedGame {
  id: ID!
  name: String!
}

# Represents the details of a game, including default roles and teams.
type GameDetails {
  id: ID!
  name: String!
  roles: [Role]
  teams: [Team]
}

# Represents the details of a game session, including participants, roles, teams, and start time.
type GameSessionDetails {
  id: ID!
  gameId: ID!
  players: [SessionPlayer]
  planning: PlanningInfo!
  createdAt: DateTime!
  startedAt: DateTime
  endedAt: DateTime
}

type PlanningInfo {
  configuration: JSON
  sessions: [PlanningSessionInfo1]
}

type PlanningSessionInfo1 {
  _id: ID!
  startedAt: DateTime!
  endedAt: DateTime
  endTrigger: String
}

type SessionPlayer {
  name: String!
  role: String!
  team: String!
}

# Represents the details of a QR code used to join a session.
type QRCodeDetails {
  qrCode: String!
  sessionId: ID!
}


# Represents the information of a planning session, including its ID, game session ID, start date, status, and duration.
type PlanningSessionInfo {
  planningSessionId: ID!
  gameSessionId: ID!
  startDate: String!
  status: String!
  duration: Int!
}

# Represents the results of a game session, including the processing status and a JSON object with the data.
type GameSessionResults {
  status: String!
  data: JSON
}

# Represents a role within a game.
type Role {
  id: ID!
  key: String!
  name: String!
  description: String
}

# Represents a team within a game.
type Team {
  id: ID!
  key: String!
  name: String!
  description: String
  color: String
}

`;

export default typeDefs;
