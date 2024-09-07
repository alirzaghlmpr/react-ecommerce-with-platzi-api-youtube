import { create } from "zustand";

const useStore = create((set) => ({
  access_token: null,
  refresh_token: null,
  setState: (data) =>
    set({
      access_token: data?.access_token,
      refresh_token: data?.refresh_token,
    }),

  removeState: () => set({ access_token: null, refresh_token: null }),
}));

export default useStore;
