import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import FormFieldSlice from './FormFieldSlice';
import OptionSlice from './OptionSlice';
import FieldEditorSlice from './FieldEditorSlice';
import FormSlice from './FormSlice';

// export const store = configureStore({
//   reducer: {
//     cart: CartSlice,
//   },
// });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    formField: FormFieldSlice,
    option: OptionSlice,
    fieldEditor: FieldEditorSlice,
    savedForm: FormSlice,
  }),
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export { store };
