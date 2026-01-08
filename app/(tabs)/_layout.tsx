import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'

const TabIcon = ({ focused, icon, title }: any) => {
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center overflow-hidden"
            >
                <Image source={icon} tintColor="#151312" className='size-5' />
                <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
            </ImageBackground>
        )
    }
    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor="#A8B5DB" className="size-5" />
        </View>)
}

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                // tabBarStyle: {
                //     backgroundColor: "#0F0D23",
                //     borderRadius: 50,
                //     marginHorizontal: 20,
                //     marginBottom: 36,
                //     height: 52,
                //     position: "absolute",
                //     overflow: "hidden",
                // },
                tabBarStyle: {
                    backgroundColor: "#0F0D23",
                    paddingBottom: 36,
                    height: 100,
                    position: "absolute",
                    overflow: "hidden",
                },
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: "Index",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon focused={focused} icon={icons.home} title="Home" />
                        )
                    }
                }}

            />
            <Tabs.Screen
                name='search'
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon focused={focused} icon={icons.search} title="Search" />
                        )
                    }
                }}
            />
            <Tabs.Screen
                name='favourites'
                options={{
                    title: "Favourites",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon focused={focused} icon={icons.heart} title="Favourites" />
                        )
                    }
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon focused={focused} icon={icons.person} title="Profile" />
                        )
                    }
                }}
            />
        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})