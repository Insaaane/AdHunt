import { createAsyncThunk } from "@reduxjs/toolkit";

import { isAxiosError } from "axios";
import {
  createListingApi,
  deleteAdApi,
  editListingApi,
  favoriteListingApi,
  getFavoritesListinsgApi,
  getListingItemApi,
  getListingsListApi,
  getModerationListApi,
  getUserListingsApi,
  postModerationApi,
  unFavoriteListingApi,
} from "../api/Listing.api";
import { TModerateRequest } from "./types";

export const getListingsFull = createAsyncThunk(
  "listing/getListingsFull",
  async function (search: string, { rejectWithValue }) {
    try {
      const response = await getListingsListApi(search);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const getModerationList = createAsyncThunk(
  "listing/getModerationList",
  async function (_, { rejectWithValue }) {
    try {
      const response = await getModerationListApi();
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const postModerationStatus = createAsyncThunk(
  "listing/postModerationStatus",
  async function (
    newData: { data: TModerateRequest; id: string },
    { rejectWithValue }
  ) {
    try {
      const response = await postModerationApi(newData.data, newData.id);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const createNewListing = createAsyncThunk(
  "listing/createNewListing",
  async function (data: FormData, { rejectWithValue }) {
    try {
      const response = await createListingApi(data);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const editListing = createAsyncThunk(
  "listing/editListing",
  async function (
    newData: { data: FormData; id: string },
    { rejectWithValue }
  ) {
    try {
      const response = await editListingApi(newData.data, newData.id);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const getUserListings = createAsyncThunk(
  "listing/getUserListings",
  async function (_, { rejectWithValue }) {
    try {
      const response = await getUserListingsApi();
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const getListingItem = createAsyncThunk(
  "listing/getListingItem",
  async function (id: string, { rejectWithValue }) {
    try {
      const response = await getListingItemApi(id);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const getFavoriteListings = createAsyncThunk(
  "listing/getFavoriteListings",
  async function (_, { rejectWithValue }) {
    try {
      const response = await getFavoritesListinsgApi();
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const favoriteListing = createAsyncThunk(
  "listing/favoriteListing",
  async function (id: string, { rejectWithValue }) {
    try {
      const response = await favoriteListingApi(id);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const unFavoriteListing = createAsyncThunk(
  "listing/unFavoriteListing",
  async function (id: string, { rejectWithValue }) {
    try {
      const response = await unFavoriteListingApi(id);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const deleteListing = createAsyncThunk(
  "listing/deleteListing",
  async function (id: string, { rejectWithValue }) {
    try {
      const response = await deleteAdApi(id);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);
