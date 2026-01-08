import { icons } from '@/constants/icons';
import { MovieDetails as MovieDetailsType } from '@/interfaces/interfaces';
import { fetchMovieDetails } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MovieDetailsScreen = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams();
    const [movie, setMovie] = useState<MovieDetailsType | null>(null)
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        try {
            setLoading(true);
            const movieId = typeof id === "string" ? id : id?.[0] || "";
            const data = await fetchMovieDetails(movieId);
            setMovie(data);

            if (data) {
                await updateSearchCount(data.title, {
                    id: data.id,
                    title: data.title,
                    poster_path: data.poster_path,
                    vote_average: data.vote_average,
                });
            }
        } catch (error) {
            console.error("Error fetching movie details:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id])

    if (loading) {
        return (
            <View className='flex-1 bg-primary justify-center items-center'>
                <ActivityIndicator size="large" color="#AB8BFF" />
            </View>
        )
    }

    if (!movie) {
        return (
            <View className='flex-1 bg-primary justify-center items-center'>
                <Text className='text-white text-lg'>Movie not found</Text>
            </View>
        )
    }

    return (
        <ScrollView className='flex-1 bg-primary' contentContainerStyle={{ paddingBottom: 40 }}>
            <TouchableOpacity
                onPress={() => router.back()}
                className='absolute top-6 left-6 z-20 bg-black/50 rounded-full p-2 rotate-180'
            >
                <Image
                    source={icons.arrow}
                    style={{ width: 24, height: 24 }}
                    tintColor="white"
                />
            </TouchableOpacity>

            {
                movie.backdrop_path && (
                    <Image
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                        }}
                        style={{ width: '100%', height: 250, backgroundColor: '#1a1a1a' }}
                    />
                )
            }

            <View className='px-5 py-6'>
                <Text className='text-white text-3xl font-bold mb-2'>{movie.title}</Text>

                <View className='flex-row items-center mb-4'>
                    {movie.release_date && (
                        <Text className='text-gray-400 text-sm mr-4'>
                            {new Date(movie.release_date).getFullYear()}
                        </Text>
                    )}
                    <View className='flex-row items-center bg-purple-600 px-3 py-1 rounded'>
                        <Text className='text-yellow-300 text-sm font-bold'>★</Text>
                        <Text className='text-white text-sm font-bold ml-1'>
                            {movie.vote_average.toFixed(1)}/10
                        </Text>
                    </View>
                </View>

                {movie.genres && movie.genres.length > 0 && (
                    <View className='flex-row flex-wrap mb-6'>
                        {movie.genres.map((genre) => (
                            <View key={genre.id} className='bg-gray-800 rounded-full px-3 py-1 mr-2 mb-2'>
                                <Text className='text-gray-300 text-xs'>{genre.name}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View className='mb-6'>
                    <Text className='text-white text-lg font-bold mb-2'>Overview</Text>
                    <Text className='text-gray-300 text-base leading-6'>
                        {movie.overview || 'No overview available'}
                    </Text>
                </View>

                <View className='flex-row justify-between mb-6'>
                    {movie.runtime && (
                        <View>
                            <Text className='text-gray-400 text-sm'>Runtime</Text>
                            <Text className='text-white text-lg font-bold'>{movie.runtime} min</Text>
                        </View>
                    )}
                    {movie.budget && movie.budget > 0 && (
                        <View>
                            <Text className='text-gray-400 text-sm'>Budget</Text>
                            <Text className='text-white text-lg font-bold'>
                                ${(movie.budget / 1000000).toFixed(1)}M
                            </Text>
                        </View>
                    )}
                    {movie.revenue && movie.revenue > 0 && (
                        <View>
                            <Text className='text-gray-400 text-sm'>Revenue</Text>
                            <Text className='text-white text-lg font-bold'>
                                ${(movie.revenue / 1000000).toFixed(1)}M
                            </Text>
                        </View>
                    )}
                </View>

                {movie.popularity && (
                    <View className='bg-gray-800 rounded-lg p-4 mb-6'>
                        <Text className='text-gray-400 text-sm'>Popularity Score</Text>
                        <View className='flex-row items-center mt-2'>
                            <View className='flex-1 h-2 bg-gray-700 rounded-full overflow-hidden'>
                                <View
                                    style={{ width: `${Math.min(movie.popularity / 10, 100)}%` }}
                                    className='h-full bg-purple-500'
                                />
                            </View>
                            <Text className='text-white ml-3 font-bold'>{movie.popularity.toFixed(1)}</Text>
                        </View>
                    </View>
                )}

                <View className='flex-row justify-between mb-6'>
                    {movie.original_language && (
                        <View>
                            <Text className='text-gray-400 text-sm'>Language</Text>
                            <Text className='text-white text-lg font-bold uppercase'>
                                {movie.original_language}
                            </Text>
                        </View>
                    )}
                    {movie.original_title && movie.original_title !== movie.title && (
                        <View>
                            <Text className='text-gray-400 text-sm'>Original Title</Text>
                            <Text className='text-white text-lg font-bold'>{movie.original_title}</Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView >
    )
}

export default MovieDetailsScreen

const styles = StyleSheet.create({})