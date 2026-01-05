import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface SearchBarProps {
    search?: string;
    placeholder?: string;
    onChangeText?: (text: string) => void;
}

const SearchBar = ({
    search = '',
    placeholder = 'Search for a movie',
    onChangeText,
}: SearchBarProps) => {
    return (
        <View className="flex-row items-center bg-gray-800 rounded-full px-5 py-4">
            <Image
                source={icons.search}
                className="w-6 h-6"
                resizeMode="contain"
            />

            <TextInput
                value={search}
                onChangeText={onChangeText}
                placeholder={placeholder}
                className="flex-1 ml-3"
                placeholderTextColor="#6B7280"
                style={{ color: "#FFFFFF" }}
            />
        </View>
    );
};

export default SearchBar;
