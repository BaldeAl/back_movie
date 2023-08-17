import mongoose, { Document, Model, Schema } from 'mongoose';

// pour éviter l'erreur de compilation 
// "Cannot overwrite model once compiled."
// l'interface doit être déclarée avant le modèle

export interface IMovie extends Document {
  title: string;
  rating: number;
  year: number;
}
// le modèle

const movieSchema: Schema = new Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  year: { type: Number, required: true },
});

export const Movie: Model<IMovie> = mongoose.model<IMovie>('Movie', movieSchema);
