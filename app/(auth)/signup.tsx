import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

const SignupScreen = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    if (!email || !password || !name) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await signup(email, password, name);
      router.replace("/(tabs)");
    } catch (err: any) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-primary px-5 justify-center">
      <Text className="text-white text-3xl font-bold mb-8 text-center">Create Account</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        className="bg-gray-800 text-white px-4 py-3 rounded-lg mb-4"
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="bg-gray-800 text-white px-4 py-3 rounded-lg mb-4"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-gray-800 text-white px-4 py-3 rounded-lg mb-4"
      />

      {error && <Text className="text-red-500 mb-4 text-center">{error}</Text>}

      <TouchableOpacity
        onPress={handleSignup}
        disabled={loading}
        className="bg-purple-600 py-3 rounded-lg mb-4"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-bold text-lg">Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text className="text-gray-400 text-center">
          Already have an account? <Text className="text-purple-400 font-bold">Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
