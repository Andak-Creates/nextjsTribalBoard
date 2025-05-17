import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/user";

interface BusinessStore {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;

  updateUser: (user: User) => void;
  fetchUsers: () => Promise<void>;
}

export const useBusinessStore = create<BusinessStore>()(
  persist(
    (set) => ({
      users: [],
      loading: false,
      error: null,

      selectedUser: null,

      fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/api/users");
          if (!res.ok) throw new Error("failed to fetch users");

          const data = await res.json();
          set({ users: data.users });
        } catch (err) {
          console.error(err);
          set({ error: "error fetching users" });
        } finally {
          set({ loading: false });
        }
      },

      setSelectedUser: (user) => set({ selectedUser: user }),

      updateUser: (updatedUser: User) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          ),
          selectedUser:
            state.selectedUser?.id === updatedUser.id
              ? updatedUser
              : state.selectedUser,
        })),
    }),
    {
      name: "business-storage", // Key in localStorage
      partialize: (state) => ({ selectedUser: state.selectedUser }), // Persist only selectedUser
    }
  )
);
