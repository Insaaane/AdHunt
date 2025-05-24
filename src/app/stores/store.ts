import { listingsReducer } from "@/entities/Listings";
import { userReducer } from "@/entities/User";
import { resetStore } from "@/shared/store";
import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  user: userReducer,
  listing: listingsReducer,
});

type RootState = ReturnType<typeof rootReducer>;

const appReducer = (
  state: RootState | undefined,
  action: AnyAction
): RootState => {
  if (action.type === resetStore.type) {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: appReducer,
  devTools: process.env.NODE_ENV === "development",
});
