# MovieApp 🎬

A modern mobile application built with Expo and React Native that allows users to discover, search, and manage their favorite movies. The app integrates with The Movie Database (TMDB) API and Appwrite backend for user authentication and data persistence.

## Features ✨

- **Authentication**: User sign-up and login with Appwrite
- **Movie Discovery**: Browse trending and popular movies
- **Search Functionality**: Search for movies by title
- **Favorites Management**: Save and manage your favorite movies
- **Movie Details**: View detailed information about each movie
- **User Profile**: Personalized user profile page
- **Responsive UI**: Beautiful UI built with NativeWind (Tailwind CSS for React Native)
- **Smooth Animations**: Fluid animations powered by React Native Reanimated
- **TypeScript Support**: Full TypeScript support for type safety

## Tech Stack 🛠️

### Frontend
- **Framework**: React Native with Expo
- **Navigation**: Expo Router (v6)
- **Styling**: NativeWind (Tailwind CSS) + Custom CSS
- **Animations**: React Native Reanimated (v3.17)
- **Gestures**: React Native Gesture Handler
- **Icons**: Expo Vector Icons
- **Language**: TypeScript

### Backend & Services
- **Authentication**: Appwrite
- **Database**: Appwrite
- **Movie Data**: The Movie Database (TMDB) API
- **Safe Area**: React Native Safe Area Context

### Build & Deployment
- **Build Tool**: Expo EAS Build
- **Package Manager**: npm
- **Android**: Native Android build support

## Prerequisites 📋

Before running this project, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **Git**
- **Appwrite Account**: For backend services
- **TMDB API Key**: Get it from [themoviedb.org](https://www.themoviedb.org/settings/api)

## Installation 🚀

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Mobile App Development/Building First App"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   EXPO_PUBLIC_APPWRITE_PROJECT_NAME=your_appwrite_project_name
   EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
   EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   ```

## Running the App 📱

### Development Mode
```bash
npm start
```

Then:
- Press `a` for Android
- Press `i` for iOS
- Press `w` for web

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### Web
```bash
npm run web
```

## Project Structure 📁

```
├── app/                          # Expo Router app directory
│   ├── _layout.tsx              # Root layout
│   ├── global.css               # Global styles
│   ├── (auth)/                  # Auth screens group
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── (tabs)/                  # Tab navigation group
│   │   ├── _layout.tsx
│   │   ├── index.tsx            # Home/Discovery
│   │   ├── search.tsx           # Search movies
│   │   ├── favourites.tsx       # Saved favorites
│   │   └── profile.tsx          # User profile
│   └── movie/
│       └── [id].tsx             # Movie detail page
├── assets/                       # Static assets
│   ├── fonts/
│   ├── icons/
│   └── images/
├── components/                   # Reusable components
│   ├── MovieCard.tsx            # Movie display card
│   └── SearchBar.tsx            # Search input
├── constants/                    # App constants
│   ├── icons.ts
│   └── images.ts
├── context/                      # React Context
│   └── AuthContext.tsx          # Authentication context
├── interfaces/                   # TypeScript interfaces
│   └── interfaces.d.ts
├── services/                     # API services
│   ├── api.ts                   # TMDB API integration
│   ├── appwrite.ts              # Appwrite client setup
│   ├── auth.ts                  # Authentication logic
│   └── favourites.ts            # Favorites management
├── types/                        # TypeScript types
│   └── images.d.ts
├── app.json                      # Expo configuration
├── eas.json                      # EAS Build configuration
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── metro.config.js
└── babel.config.js
```

## Key Dependencies 📦

| Package | Version | Purpose |
|---------|---------|---------|
| `react-native` | 0.81.5 | Core React Native framework |
| `expo` | ~54.0.30 | Expo framework |
| `expo-router` | ~6.0.21 | Navigation |
| `react-native-reanimated` | ^3.17.0 | Animations |
| `react-native-gesture-handler` | ~2.28.0 | Gesture handling |
| `nativewind` | ^4.2.1 | Tailwind CSS support |
| `react-native-appwrite` | ^0.19.0 | Appwrite SDK |
| `react-native-screens` | ~4.16.0 | Screen navigation |
| `react-native-safe-area-context` | ~5.6.0 | Safe area handling |

## Building for Production 🏗️

### Using EAS Build (Recommended)

1. **Setup EAS CLI**
   ```bash
   npm install -g eas-cli
   eas login
   ```

2. **Build for Android**
   ```bash
   eas build --platform android
   ```

3. **Build for iOS**
   ```bash
   eas build --platform ios
   ```

### Build Profiles

The project includes several build profiles in `eas.json`:
- **development**: Development client build
- **preview**: Internal testing build
- **production**: Release build with auto-incrementing version code

## Configuration ⚙️

### Appwrite Setup

1. Create an Appwrite account at [appwrite.io](https://appwrite.io)
2. Create a new project
3. Create a database and collection for storing user favorites
4. Generate an API key for your application
5. Add these values to your `.env.local` file

### TMDB API Setup

1. Sign up at [themoviedb.org](https://www.themoviedb.org)
2. Go to Settings → API
3. Generate an API key
4. Add it to `.env.local` as `EXPO_PUBLIC_MOVIE_API_KEY`

## Scripts 📜

```bash
npm start          # Start development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Run ESLint
npm run reset-project  # Reset project to template state
```

## Styling 🎨

The project uses **NativeWind** for styling, which provides Tailwind CSS utilities for React Native. Update styles in:
- Global styles: `app/global.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Use className prop with Tailwind classes

## Architecture Highlights 🏛️

### Authentication Flow
- Uses Appwrite for secure user authentication
- AuthContext manages global auth state
- Protected routes via Expo Router middleware

### State Management
- React Context API for global state
- Local component state for UI logic
- AsyncStorage for persistent user data

### API Integration
- Centralized API service (`services/api.ts`)
- TMDB API for movie data
- Appwrite SDK for backend operations

## Troubleshooting 🔧

### Common Issues

**Build fails with Java/Gradle errors:**
- Use EAS Cloud Build instead of local builds on Windows
- Run `eas build --platform android` (requires account)

**Environment variables not loading:**
- Ensure `.env.local` file exists in root directory
- Restart the dev server after adding new variables
- Use `EXPO_PUBLIC_` prefix for public variables

**Module not found errors:**
- Run `npm install` to ensure all dependencies are installed
- Clear cache: `npx expo start --clear`

## Contributing 🤝

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License 📄

This project is private. Contact the project owner for licensing information.

## Support 💬

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Contact the development team

## Version History 📚

- **v1.0.0** (Current)
  - Initial release
  - Authentication system
  - Movie discovery and search
  - Favorites management
  - User profile

---

Built with ❤️ using React Native and Expo
