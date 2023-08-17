import { gql } from 'apollo-server';

// Construire le schéma de l'API
// https://www.apollographql.com/docs/apollo-server/schema/schema/
// https://graphql.org/learn/schema/
//
// ce schéma est utilisé par le serveur pour valider les requêtes
export const typeDefs = gql`
  type Movie {
    _id: ID!
    title: String!
    rating: Float!
    year: Int!
  }

  type Query {
    getMovies: [Movie!]!,
    getMovie(id: ID!): Movie!
  }

  type Mutation {
    createMovie(title: String!, rating: Float!, year: Int!): Movie!
    updateMovie(_id: ID!, title: String, rating: Float, year: Int): Movie!
    deleteMovie(_id: ID!): Movie!
  }
`;
