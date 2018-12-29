exports.resolvers = {
  Query: {
    getAllArticles: async (root, args, { Article }) => {
      const allArticles = await Article.find().sort({
        updatedAt: 'desc',
      });
      return allArticles;
    },
  },
};
