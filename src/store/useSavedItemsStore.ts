import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface SavedFlight {
  id: string;
  data: any;
}
export interface SavedHotel {
  id: string;
  data: any;
}
export interface SavedActivity {
  id: string;
  data: any;
}

interface SavedItemsState {
  flights: SavedFlight[];
  hotels: SavedHotel[];
  activities: SavedActivity[];
  addFlight: (flight: SavedFlight) => void;
  removeFlight: (id: string) => void;
  addHotel: (hotel: SavedHotel) => void;
  removeHotel: (id: string) => void;
  addActivity: (activity: SavedActivity) => void;
  removeActivity: (id: string) => void;
}

export const useSavedItemsStore = create<SavedItemsState>()(
  persist(
    (set, get) => ({
      flights: [],
      hotels: [],
      activities: [],
      addFlight: (flight) =>
        set((state) => ({ flights: [...state.flights, flight] })),
      removeFlight: (id) =>
        set((state) => ({ flights: state.flights.filter((f) => f.id !== id) })),
      addHotel: (hotel) =>
        set((state) => ({ hotels: [...state.hotels, hotel] })),
      removeHotel: (id) =>
        set((state) => ({ hotels: state.hotels.filter((h) => h.id !== id) })),
      addActivity: (activity) =>
        set((state) => ({ activities: [...state.activities, activity] })),
      removeActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((a) => a.id !== id),
        })),
    }),
    {
      name: "saved-items",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
