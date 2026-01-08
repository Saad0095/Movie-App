import { Client, Databases, ID, Query } from "react-native-appwrite";


const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = "favorites"
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;

const client = new Client().setProject(PROJECT_ID).setEndpoint(ENDPOINT);
const database = new Databases(client);

export const addFavorite = async (userId: string, movie: any) => {
  return await database.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    {
      userId,
      movieId: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      addedDate: new Date().toISOString(),
    },
    [
      `read("user:${userId}")`,
      `update("user:${userId}")`,
      `delete("user:${userId}")`,
    ]
  );
};

export const removeFavorite = async (docId: string) => {
  return await database.deleteDocument(
    DATABASE_ID,
    COLLECTION_ID,
    docId
  );
};

export const getFavorites = async (userId: string) => {
  const res = await database.listDocuments(
    DATABASE_ID,
    COLLECTION_ID,
    [Query.equal("userId", userId)]
  );
  return res.documents;
};
