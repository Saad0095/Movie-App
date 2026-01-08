import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { TrendingMovie } from "@/interfaces/interfaces";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingTrending, setLoadingTrending] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoadingTrending(true);
        const data = await getTrendingMovies();
        if (data && data.length > 0) {
          setTrendingMovies(data);
        }
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoadingTrending(false);
      }
    };
    fetchTrending();
  }, []);

  const fetchLatest = async () => {
    try {
      setLoading(true);
      const data = await fetchMovies({ query: "" });
      setMovies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLatest()
  }, [])

  return (
    <View className="flex-1 bg-primary px-5 py-5">
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <>
            <Image source={icons.logo} className="w-12 h-12 self-center my-6" />

            <Text className="text-white text-2xl font-bold mt-6 mb-4">
              Trending Movies
            </Text>

            {loadingTrending ? (
              <ActivityIndicator size="small" color="#AB8BFF" />
            ) : trendingMovies.length > 0 ? (
              <FlatList
                horizontal
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
                contentContainerStyle={{ gap: 8, paddingRight: 16 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
              />
            ) : (
              <Text className="text-white text-center mt-2">No trending movies</Text>
            )}

            <Text className="text-white text-2xl font-bold mt-6 mb-4">
              Latest Movies
            </Text>

            {loading && <ActivityIndicator size="large" color="#AB8BFF" className="mb-4" />}
          </>
        }
        ListEmptyComponent={
          !loading ? (
            <Text className="text-white text-center mt-10 text-lg">No movies found</Text>
          ) : null
        }
      />
    </View>
  );
}
