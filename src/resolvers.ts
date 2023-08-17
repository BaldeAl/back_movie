import { IResolvers } from '@graphql-tools/utils'; 
import { IMovie } from './models/movie';
//pourquoi on a pas besoin de faire un import de IContext  ? 
//parce que IContext est déja importé dans le fichier index.ts
//et index.ts est importé dans le fichier server.ts
//et server.ts est importé dans le fichier index.ts de src
//
interface IContext {
  dataSources: {
    movies: {
      getMovies: () => Promise<IMovie[]>;
      getMovie: (id: string) => Promise<IMovie | null>;
      createMovie: (movie: IMovie) => Promise<IMovie>;
      updateMovie: (movie: IMovie) => Promise<IMovie | null>;
      deleteMovie: (id: string) => Promise<IMovie | null>;
    };
  };
}
 //IResolvers est une interface qui prend deux paramètres génériques 
  //le premier est le type de l'objet qui est retourné par la requête
  //le deuxième est le type de l'objet qui est passé en paramètre de la requête
  //ici j'ai mis any pour le premier paramètre car on ne sait pas encore quel type d'objet sera retourné
export const resolvers: IResolvers<any, IContext> = {
  Query: {
    getMovies: async (_, _args, { dataSources: { movies } }) => {
      return movies.getMovies();
    },
    getMovie: async (_, { id }, { dataSources: { movies } }) => {
      return movies.getMovie(id);
    }
  },
  Mutation: {
    createMovie: async (_, args, { dataSources: { movies } }) => {
      return movies.createMovie(args);
    },
    updateMovie: async (_, args, { dataSources: { movies } }) => {
      return movies.updateMovie(args);
    },
    deleteMovie: async (_, { _id }, { dataSources: { movies } }) => {
      return movies.deleteMovie(_id);
    }
  }
}
