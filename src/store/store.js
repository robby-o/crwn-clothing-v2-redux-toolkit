// import { compose, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean)

// const composeEnhancer =
//   (process.env.NODE_ENV !== 'production' &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose

const persistConfig = {
  key: 'root',
  storage,
  whitlist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleWares),
})

export const persistor = persistStore(store)
