import { ApolloServer } from "apollo-server-lambda";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { Movie as MovieModel } from './models/movie';
import  Movies  from "./dataSources/movies";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const mongodbPassword = process.env.MONGODB_PASSWORD;
const mongodbDatabase = process.env.MONGODB_DATABASE;
const mongodbHost = process.env.MONGODB_HOST;
// 
mongoose
    .connect(`mongodb+srv://alseny:Azerty123@clusterbalde.ouik6bm.mongodb.net/Movie_D?retryWrites=true&w=majority`)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

const dataSources = () => ({
  movies: new Movies(MovieModel),
});
console.log(`mongodbPassword: ${mongodbPassword}`);
console.log(`mongodbDatabase: ${mongodbDatabase}`);
console.log(`mongodbHost: ${mongodbHost}`);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    



});

exports.graphqlHandler = server.createHandler();