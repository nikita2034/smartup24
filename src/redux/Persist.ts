import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web and AsyncStorage for React Native

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Add the slices you want to persist
};

export default persistConfig;