import { api } from "@/shared/api";
import { IListingItem, TModerateRequest } from "../model/types";

export const getListingsListApi = async (search?: string) => {
  const response = await api.get<IListingItem[]>("/advertisements/", {
    params: {
      search: search,
    },
  });
  return response.data;
};

export const getModerationListApi = async () => {
  const response = await api.get<IListingItem[]>("/advertisements/moderate/");
  return response.data;
};

export const postModerationApi = async (data: TModerateRequest, id: string) => {
  const response = await api.post<IListingItem[]>(
    `/advertisements/moderate/${id}/`,
    data
  );
  return response.data;
};

export const getListingItemApi = async (id: string) => {
  const response = await api.get<IListingItem>(`/advertisements/${id}/`);
  return response.data;
};

export const createListingApi = async (data: FormData) => {
  const response = await api.post<IListingItem>(
    "/advertisements/create/",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const editListingApi = async (data: FormData, id: string) => {
  const response = await api.put<IListingItem>(`/advertisements/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getUserListingsApi = async () => {
  const response = await api.get<IListingItem[]>("/advertisements/my/");
  return response.data;
};

export const getFavoritesListinsgApi = async () => {
  const response = await api.get<IListingItem[]>("/advertisements/favorites/");
  return response.data;
};

export const favoriteListingApi = async (id: string) => {
  const response = await api.post<IListingItem>(
    `/advertisements/favorites/${id}/`
  );
  return response.data;
};

export const unFavoriteListingApi = async (id: string) => {
  const response = await api.delete<IListingItem>(
    `/advertisements/favorites/${id}/`
  );
  return response.data;
};

export const deleteAdApi = async (id: string) => {
  const response = await api.delete<IListingItem>(`/advertisements/${id}/`);
  return response.data;
};
