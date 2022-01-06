import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import favPersonsReducer from './reducers/favPersons';

const configPersist = {
  key: 'root',
  storage: AsyncStorage,
};

const reducerPersist = persistReducer(configPersist, favPersonsReducer);

export const Store = createStore(reducerPersist);
export const Persistor = persistStore(Store);