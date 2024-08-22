import { createStore,combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit' 
import storage from 'redux-persist/lib/storage';

import rootReducer from "./reducers/rootreducer"
import counterReducer from './reducers/counterReducer';
const persistConfig = {
  key: 'root',
  storage,
};


// const combred = combineReducers({
//   authReducer,
//   counterReducer
// })


const root = persistReducer(persistConfig, rootReducer);

//export const store = createStore(persistedReducer);
export const store = configureStore({
  reducer: {
  root,
  },
})
export const persistor = persistStore(store);