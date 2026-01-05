import { Link } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

export default function MovieCard({
  id,
  title,
  poster_path,
  vote_average,
}: Movie) {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/300x450/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-44 rounded-lg"
        />

        <Text
          numberOfLines={2}
          className="text-white text-xs mt-2 font-semibold"
        >
          {title}
        </Text>

        <Text className="text-gray-400 text-xs mt-1">
          ⭐ {vote_average.toFixed(1)}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
