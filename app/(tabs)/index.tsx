import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { TrendingMovie } from "@/interfaces/interfaces";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

export default function Index() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTrending = async () => {
      try {
        const data = await getTrendingMovies()
        if (data && data.length > 0) {
          setTrendingMovies(data)
        } else {
          console.log("No trending movies data or empty array");
        }
      } catch (error) {
        console.error("Error in getTrending:", error);
      }
    }
    getTrending();
  }, [])
  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await fetchMovies({ query: search });
        setMovies(data);
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
      <ScrollView>
        <Image source={icons.logo} className="w-12 h-12 self-center my-6" />

        <SearchBar search={search} onChangeText={setSearch} />

        <Text className="text-white text-2xl font-bold mt-6 mb-4">
          Trending Movies
        </Text>

        <FlatList
          data={trendingMovies}
          keyExtractor={(item) => item.movie_id.toString()}
          renderItem={({ item }) => (
            <MovieCard 
              id={item.movie_id}
              title={item.title}
              poster_path={item.poster_path}
              vote_average={0}
            />
          )}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 16,
          }}
          showsVerticalScrollIndicator={false}
        />

        <Text className="text-white text-2xl font-bold mt-6 mb-4">
          Latest Movies
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#AB8BFF" />
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
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </View>
  );
}
