import { Link } from "expo-router";
import { Dimensions, Image, Text, TouchableOpacity } from "react-native";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null | undefined;
  vote_average: number;
}

const screenWidth = Dimensions.get("window").width;

export default function MovieCard({
  id,
  title,
  poster_path,
  vote_average,
}: Movie) {
  const CARD_WIDTH = screenWidth * 0.28;
  const IMAGE_HEIGHT = CARD_WIDTH * 1.5; 

  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity style={{ width: CARD_WIDTH }}>
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/300x450/1a1a1a/FFFFFF.png",
          }}
          style={{
            width: "100%",
            height: IMAGE_HEIGHT,
            borderRadius: 8,
            backgroundColor: "#1a1a1a",
          }}
        />

        <Text
          numberOfLines={2}
          style={{
            color: "white",
            fontWeight: "600",
            fontSize: 12,
            marginTop: 6,
          }}
        >
          {title}
        </Text>

        <Text style={{ color: "gray", fontSize: 10, marginTop: 2 }}>
          ⭐ {vote_average.toFixed(1)}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
