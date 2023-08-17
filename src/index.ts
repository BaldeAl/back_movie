import 'dotenv/config'
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { Movie as MovieModel } from './models/movie';
import Movies from './dataSources/movies';

const mongodbPassword = process.env.MONGODB_PASSWORD;
const mongodbDatabase = process.env.MONGODB_DATABASE;
const mongodbHost = process.env.MONGODB_HOST;
//
mongoose
    .connect(`mongodb+srv://alseny:${mongodbPassword}@${mongodbHost}/${mongodbDatabase}?retryWrites=true&w=majority`)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

const dataSources = () => ({
  movies: new Movies(MovieModel),
});

const server = new ApolloServer({ typeDefs, resolvers, dataSources })

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
