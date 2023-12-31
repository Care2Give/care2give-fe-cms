import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  toggleLoggedIn: () => void;
  role: string;
  setRole: (role: string) => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  isLoggedIn: false,
  toggleLoggedIn: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
  role: "",
  setRole: (role) => set({ role }),
}));

export default useAuthStore;
