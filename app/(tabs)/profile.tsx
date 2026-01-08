import { icons } from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Auth guard will automatically redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#AB8BFF" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <Text className="text-white text-lg">Please login</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1 px-5">
      <View className="flex-1 justify-center items-center">
        <View className="bg-gray-800 rounded-2xl p-6 w-full">
          <View className="flex items-center mb-6">
            <Image source={icons.person} className="size-16" tintColor="#AB8BFF" />
          </View>

          <View className="mb-6">
            <Text className="text-gray-400 text-sm mb-2">Name</Text>
            <Text className="text-white text-xl font-bold">{user.name}</Text>
          </View>

          <View className="mb-6">
            <Text className="text-gray-400 text-sm mb-2">Email</Text>
            <Text className="text-white text-lg">{user.email}</Text>
          </View>

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-600 py-3 rounded-lg"
          >
            <Text className="text-white text-center font-bold text-lg">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;