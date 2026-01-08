import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

export default function Search() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (!search.trim()) return;

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await fetchMovies({ query: search });
        setMovies(data);
        if(search.trim() && data?.length > 0 && data?.[0]) {
          await updateSearchCount(search, data[0])
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <View className="flex-1 bg-primary px-5 py-5">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#AB8BFF" />
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard {...item} />}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 16,
          }}
          ListHeaderComponent={
            <>
              <Image source={icons.logo} className="w-16 h-16 self-center my-6" />
              <SearchBar search={search} onChangeText={setSearch} />
              <Text className="text-white text-2xl font-bold mt-6 mb-4">
                {search ? (
                  <>
                    Search Results for <Text className="text-purple-700">"{search.trim()}"</Text>
                  </>
                ) : (
                  "Search for a movie"
                )}
              </Text>

            </>
          }
          ListEmptyComponent={
            <Text className="text-white text-center mt-20 text-lg">
              {search ? "No movies found" : "Start typing to search"}
            </Text>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
