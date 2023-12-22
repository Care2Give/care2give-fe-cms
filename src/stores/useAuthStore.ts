import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  // increase: (by: number) => void;
  toggleLoggedIn: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  isLoggedIn: false,
  // increase: (by) => set((state) => ({ bears: state.bears + by })),
  toggleLoggedIn: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
}));

export default useAuthStore;
