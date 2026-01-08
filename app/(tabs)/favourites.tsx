import MovieCard from "@/components/MovieCard";
import { useAuth } from "@/context/AuthContext";
import { getFavorites } from "@/services/favourites";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);

  const loadFavorites = useCallback(async () => {
    if (!user) return;
    const fav = await getFavorites(user.$id);
    setFavorites(fav);
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  return (
    <View className="flex-1 bg-primary px-5 py-5">
      <Text className="text-white text-2xl font-bold mb-4">My Favorites</Text>

      {favorites.length === 0 ? (
        <Text className="text-gray-400 text-center mt-10">No favorites yet</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <MovieCard
              id={item.movieId}
              title={item.title}
              poster_path={item.poster_path}
              vote_average={item.vote_average}
            />
          )}
          numColumns={3}
        />
      )}
    </View>
  );
}
