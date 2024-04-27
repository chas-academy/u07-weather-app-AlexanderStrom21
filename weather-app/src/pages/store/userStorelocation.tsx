import { create } from "zustand";

export const useUserLocationStore = create((set) => ({
  userLocation: {
    latitude: 0,
    longitude: 0,
  },
  updateUserLocation: (updatedLocation: any) =>
    set({ userLocation: updatedLocation }),
}));
