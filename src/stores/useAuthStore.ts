import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  toggleLoggedIn: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  isLoggedIn: false,
  toggleLoggedIn: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
}));

export default useAuthStore;
