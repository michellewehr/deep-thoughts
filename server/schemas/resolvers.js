const { User, Thought } = require('../models');


const resolvers = {
    Query: {
        //get all thoughts
        thoughts: async (parent, {username}) => {
            // we use ternary operator to check if username exists if it does we set params to object wiht username key set to that value
            const params = username ? {username}: {};
            return Thought.find(params).sort({ createdAt: -1 })  
        },
        // place this inside of the `Query` nested object right after `thoughts` 
        thought: async (parent, { _id }) => {
        return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
    }
};

module.exports = resolvers;