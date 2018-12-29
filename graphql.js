const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const Article = require('./models/article.model');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    Article,
  },
});

module.exports = app => server.applyMiddleware({ app });
