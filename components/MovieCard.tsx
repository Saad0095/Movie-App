import { useAuth } from "@/context/AuthContext";
import { addFavorite, getFavorites, removeFavorite } from "@/services/favourites";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

  const [fav, setFav] = useState(false);
  const [favDocId, setFavDocId] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!user) return;
      const favorites = await getFavorites(user.$id);
      const existing = favorites.find((fav: any) => fav.movieId === id);
      if (existing) {
        setFav(true);
        setFavDocId(existing.$id);
      }
    };
    checkIfFavorite();
  }, [user, id]);

  const toggleFavorite = async () => {
    if (!user) return;

    try {
      if (fav && favDocId) {
        await removeFavorite(favDocId);
        setFav(false);
        setFavDocId(null);
      } else {
        const response = await addFavorite(user.$id, {
          id,
          title,
          poster_path: `https://image.tmdb.org/t/p/w500${poster_path}`,
          vote_average,
        });
        setFav(true);
        setFavDocId(response.$id);
      }
    } catch (err) {
      console.error("Favorite error", err);
    }
  };

  return (
    <View style={{ width: CARD_WIDTH }}>
      <Link href={`/movie/${id}`} asChild>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={{ position: "relative" }}>
            <Image
              source={{
                uri: poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : "https://placehold.co/300x450/1a1a1a/FFFFFF.png",
              }}
              style={{
                width: "100%",
                height: IMAGE_HEIGHT,
                borderRadius: 10,
                backgroundColor: "#1a1a1a",
              }}
            />

            <TouchableOpacity
              onPress={toggleFavorite}
              activeOpacity={0.7}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(0,0,0,0.6)",
                padding: 6,
                borderRadius: 20,
              }}
            >
              <Ionicons
                name={fav ? "heart" : "heart-outline"}
                size={16}
                color={fav ? "#facc15" : "#ffffff"}
              />
            </TouchableOpacity>
          </View>

          {/* Title */}
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

          {/* Rating */}
          <Text
            style={{
              color: "#9ca3af",
              fontSize: 10,
              marginTop: 2,
            }}
          >
            ⭐ {vote_average?.toFixed(1)}
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
