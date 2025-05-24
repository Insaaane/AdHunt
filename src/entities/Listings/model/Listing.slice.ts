import { createSlice } from "@reduxjs/toolkit";
import { IListingState } from "./types";
import {
  createNewListing,
  deleteListing,
  editListing,
  favoriteListing,
  getFavoriteListings,
  getListingItem,
  getListingsFull,
  getModerationList,
  getUserListings,
  postModerationStatus,
  unFavoriteListing,
} from "./Listings.thunks";

const initialState: IListingState = {
  listingsList: [],
  userListings: [],
  favoriteListings: [],
  moderateListings: [],
  currentItem: null,
  getStatus: {
    isLoading: false,
    error: null,
  },
  postStatus: {
    isLoading: false,
    error: null,
  },
};

const listingsSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET FULL LISTINGS
      .addCase(getListingsFull.pending, (state) => {
        state.getStatus.isLoading = true;
        state.getStatus.error = null;
      })
      .addCase(getListingsFull.fulfilled, (state, action) => {
        state.getStatus.isLoading = false;
        state.listingsList = action.payload;
      })
      .addCase(getListingsFull.rejected, (state, action) => {
        state.getStatus.isLoading = false;
        state.getStatus.error = action.payload as string;
      })

      // CREATE NEW LISTING
      .addCase(createNewListing.pending, (state) => {
        state.postStatus.isLoading = true;
        state.postStatus.error = null;
      })
      .addCase(createNewListing.fulfilled, (state) => {
        state.postStatus.isLoading = false;
      })
      .addCase(createNewListing.rejected, (state, action) => {
        state.postStatus.isLoading = false;
        state.postStatus.error = action.payload as string;
      })

      // GET USER LISTINGS
      .addCase(getUserListings.pending, (state) => {
        state.getStatus.isLoading = true;
        state.getStatus.error = null;
      })
      .addCase(getUserListings.fulfilled, (state, action) => {
        state.getStatus.isLoading = false;
        state.userListings = action.payload;
      })
      .addCase(getUserListings.rejected, (state, action) => {
        state.getStatus.isLoading = false;
        state.getStatus.error = action.payload as string;
      })

      // GET MODERATE LISTINGS
      .addCase(getModerationList.pending, (state) => {
        state.getStatus.isLoading = true;
        state.getStatus.error = null;
      })
      .addCase(getModerationList.fulfilled, (state, action) => {
        state.getStatus.isLoading = false;
        state.moderateListings = action.payload;
      })
      .addCase(getModerationList.rejected, (state, action) => {
        state.getStatus.isLoading = false;
        state.getStatus.error = action.payload as string;
      })

      // POST MODERATE STATUS
      .addCase(postModerationStatus.pending, (state) => {
        state.postStatus.isLoading = true;
        state.postStatus.error = null;
      })
      .addCase(postModerationStatus.fulfilled, (state) => {
        state.postStatus.isLoading = false;
      })
      .addCase(postModerationStatus.rejected, (state, action) => {
        state.postStatus.isLoading = false;
        state.postStatus.error = action.payload as string;
      })

      // GET LISTING ITEM
      .addCase(getListingItem.pending, (state) => {
        state.getStatus.isLoading = true;
        state.getStatus.error = null;
      })
      .addCase(getListingItem.fulfilled, (state, action) => {
        state.getStatus.isLoading = false;
        state.currentItem = action.payload;
      })
      .addCase(getListingItem.rejected, (state, action) => {
        state.getStatus.isLoading = false;
        state.getStatus.error = action.payload as string;
      })

      // GET USER FAVORITE LISTINGS
      .addCase(getFavoriteListings.pending, (state) => {
        state.getStatus.isLoading = true;
        state.getStatus.error = null;
      })
      .addCase(getFavoriteListings.fulfilled, (state, action) => {
        state.getStatus.isLoading = false;
        state.favoriteListings = action.payload;
      })
      .addCase(getFavoriteListings.rejected, (state, action) => {
        state.getStatus.isLoading = false;
        state.getStatus.error = action.payload as string;
      })

      // LIKE LISTING
      .addCase(favoriteListing.pending, (state) => {
        state.postStatus.isLoading = true;
        state.postStatus.error = null;
      })
      .addCase(favoriteListing.fulfilled, (state, action) => {
        state.postStatus.isLoading = false;
        if (state.currentItem && state.currentItem.id === action.payload.id) {
          state.currentItem.is_favorite = action.payload.is_favorite;
        }
      })
      .addCase(favoriteListing.rejected, (state, action) => {
        state.postStatus.isLoading = false;
        state.postStatus.error = action.payload as string;
      })

      // DISLIKE LISTING
      .addCase(unFavoriteListing.pending, (state) => {
        state.postStatus.isLoading = true;
        state.postStatus.error = null;
      })
      .addCase(unFavoriteListing.fulfilled, (state, action) => {
        state.postStatus.isLoading = false;
        if (state.currentItem && state.currentItem.id === action.payload.id) {
          state.currentItem.is_favorite = action.payload.is_favorite;
        }
      })
      .addCase(unFavoriteListing.rejected, (state, action) => {
        state.postStatus.isLoading = false;
        state.postStatus.error = action.payload as string;
      })

      // DELETE AD
      .addCase(deleteListing.pending, (state) => {
        state.postStatus.isLoading = true;
        state.postStatus.error = null;
      })
      .addCase(deleteListing.fulfilled, (state) => {
        state.postStatus.isLoading = false;
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.postStatus.isLoading = false;
        state.postStatus.error = action.payload as string;
      })

      // EDIT LISTING
      .addCase(editListing.pending, (state) => {
        state.postStatus.isLoading = true;
        state.postStatus.error = null;
      })
      .addCase(editListing.fulfilled, (state, action) => {
        state.postStatus.isLoading = false;
        if (state.currentItem && state.currentItem.id === action.payload.id) {
          state.currentItem = action.payload;
        }
      })
      .addCase(editListing.rejected, (state, action) => {
        state.postStatus.isLoading = false;
        state.postStatus.error = action.payload as string;
      });
  },
  selectors: {
    getListingsRequestStatus: (state) => state.getStatus,
    getListingsPostStatus: (state) => state.postStatus,
    getListingsFullInfo: (state) => state.listingsList,
    getModerateInfo: (state) => state.moderateListings,
    getUserListingsInfo: (state) => state.userListings,
    getUserActiveListings: (state) =>
      state.userListings.filter((item) => item.status === "active"),
    getUserPendingListings: (state) =>
      state.userListings.filter((item) => item.status === "pending"),
    getUserRejectedListings: (state) =>
      state.userListings.filter((item) => item.status === "rejected"),
    getCurrentListingItemInfo: (state) => state.currentItem,
    getFavoriteListingsInfo: (state) => state.favoriteListings,
  },
});

export default listingsSlice.reducer;
export const {
  getListingsRequestStatus,
  getListingsFullInfo,
  getUserListingsInfo,
  getUserActiveListings,
  getUserPendingListings,
  getUserRejectedListings,
  getCurrentListingItemInfo,
  getFavoriteListingsInfo,
  getListingsPostStatus,
  getModerateInfo,
} = listingsSlice.selectors;
