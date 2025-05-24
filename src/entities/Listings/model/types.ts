import { IUser } from "@/entities/User";
import { TStatus } from "@/shared/model";

export interface IListingItem {
  id: number;
  title: string;
  description: string;
  price: string;
  status: TListingStatus;
  created_at: Date;
  updated_at: Date;
  author: IUser;
  images: TImage[];
  is_favorite: boolean;
}

export type TImage = {
  id: 0;
  image: string;
};

export type TListingStatus = "pending" | "active" | "rejected";

export interface IListingState {
  listingsList: IListingItem[];
  userListings: IListingItem[];
  favoriteListings: IListingItem[];
  moderateListings: IListingItem[];
  currentItem: IListingItem | null;
  getStatus: TStatus;
  postStatus: TStatus;
}

export type TModerateRequest = {
  status: Omit<TListingStatus, "pending">;
};