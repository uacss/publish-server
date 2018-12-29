exports.typeDefs = `
  type Article {
    _id: ID
    title: String!
    text: String!
    author_id: String!
    author_name: String!
    created_at: String
    updated_at: String
  }
  type Query {
    getAllArticles: [Article]
  }
`;
