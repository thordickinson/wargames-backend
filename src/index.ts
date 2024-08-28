import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import typeDefs from './schema/schema';
import resolvers from './resolvers/resolvers';

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mydatabase', {
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
