const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Book } = require('../models');


const resolvers = {

    Query: {
        //users by username
        me: async (parent, args, context) => {
            const { username } = context.user;
            return User.findOne({ username }).populate('books');
          },
        },

    Mutation: {

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return {token, user};
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
    
        },

        saveBook: async (parent, args, context) => {
            if (context.user) {
            
             const updatedUser =  await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.input } },
                { new: true }
              );
          
            return updatedUser;
            }
          
            throw new AuthenticationError('Log in first!');
        },



        removeBook: async (parent, args, context) => {
            if(context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );

            return updatedUser;
            }

            throw new AuthenticationError('Log in first!');
        }
    }
};

module.exports = resolvers;