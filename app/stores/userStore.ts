// stores/userStore.ts
import { create } from "zustand";
import { User } from "../types/user";
import { persist } from "zustand/middleware";

interface UserStore {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  setError: (msg: string | null) => void;
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User) => void;
  updateUser: (user: User) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      selectedUser: null,
      loading: false,
      error: null,
      setUsers: (users) => set({ users }),
      setError: (msg) => set({ error: msg }),
      fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/api/users");
          if (!res.ok) throw new Error("Failed to fetch users");

          const data = await res.json();
          set({ users: data.users }); // Use the key from your API response
        } catch (err) {
          console.error(err);
          set({ error: "Error fetching users" });
        } finally {
          set({ loading: false });
        }
      },
      setSelectedUser: (user: User) => set({ selectedUser: user }),

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
      name: "user-store", // storage key
      partialize: (state) => ({
        selectedUser: state.selectedUser,
      }),
    }
  )
);
