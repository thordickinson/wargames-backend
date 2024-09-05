import 'dotenv/config'

import mongoose from 'mongoose';
import typeDefs from './schema/schema';
import resolvers from './resolvers/resolvers';
import express from 'express'
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { handleAfterFileUpload } from './file/upload.handler';

const app = express()
app.use(express.json())

app.use("/healtcheck", (req, res) => {
  res.sendStatus(200)
})

app.post("/api/audio", handleAfterFileUpload)

const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017/wargames';
const PORT = process.env.PORT ?? 4001;

const startServer = async () => {
  console.log('Connecting to the database: ' + MONGO_URL);
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));
    app.listen({ port: PORT }, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
};

startServer();
