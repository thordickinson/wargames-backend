import 'dotenv/config'

import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import typeDefs from './schema/schema';
import resolvers from './resolvers/resolvers';



const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017/wargames';

const startServer = async () => {
  console.log('Connecting to the database: ' + MONGO_URL);
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const server = new ApolloServer({ typeDefs, resolvers });

    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
};

startServer();
