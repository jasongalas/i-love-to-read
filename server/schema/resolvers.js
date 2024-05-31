const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        getUser: async (parent, { _id }) => {
            return User.find({ _id }).populate("Books");
        }
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const newUser = await User.create({ username, email, password });
            const token = signToken(newUser);
            return { token, newUser };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
        saveBook: async (parent, { bookInput }, context) => {
            if (!context.user) {
                throw AuthenticationError
            }

            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $addToSet: { savedBooks: bookInput } },
                { new: true }
            ).populate("savedBooks");

            return updatedUser;
        },

        removeBook: async (parent, { bookId }, context) => {
            if (!context.user) {
                throw AuthenticationError
            }

            const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            ).populate("savedBooks");

            return updatedUser;
        },

    },
};

module.exports = resolvers;