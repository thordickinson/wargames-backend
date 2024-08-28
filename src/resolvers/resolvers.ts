import User from '../models/User';

const resolvers = {
  Query: {
    users: async () => await User.find(),
  },
};

export default resolvers;
