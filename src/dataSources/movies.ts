import { MongoDataSource } from "apollo-datasource-mongodb";
import { IMovie } from "../models/movie";

// La classe Movies étend la classe MongoDataSource, qui fournit des méthodes de base pour interagir avec la base de données.
// elle est utilisée par le serveur GraphQL pour accéder aux données.
// La classe MongoDataSource prend en charge les méthodes CRUD de base, telles que find, findOneById, create, update et delete.
// Elle prend également en charge les méthodes de pagination, telles que paginate et count.
export default class Movies extends MongoDataSource<IMovie> {
  async getMovies(): Promise<IMovie[]> {
    return await this.model.find();
  }
// La méthode getMovie prend un paramètre id et renvoie un film unique.
  async getMovie(id: string): Promise<IMovie | null| undefined> {
    return await this.findOneById(id);
  }

  async createMovie(movieInput: IMovie): Promise<IMovie> {
    const { title, rating, year } = movieInput;
    return await this.model.create({ title, rating, year });
  }

  async updateMovie(movieInput: IMovie): Promise<IMovie | null> {
    const { _id, title, rating, year } = movieInput;
    if (!_id) throw new Error("L'ID du film doit être fourni pour la mise à jour.");
    return await this.model.findByIdAndUpdate(
      _id,
      { title, rating, year },
      { new: true }  // Cette option garantit que la méthode retourne le document mis à jour.
    );
  }

  async deleteMovie(_id: string): Promise<IMovie | null> {
    return await this.model.findByIdAndRemove(_id);
  }
}
