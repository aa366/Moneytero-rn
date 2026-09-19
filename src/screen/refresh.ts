import { create } from "zustand";

type AccountRefreshState = {
  refreshTick: number;
  triggerRefresh: () => void;
};

export const useRefresh = create<AccountRefreshState>((set) => ({
  refreshTick: 0,
  triggerRefresh: () =>
    set((state) => ({
      refreshTick: state.refreshTick + 1,
    })),
}));
