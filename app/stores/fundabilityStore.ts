import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FundabilityStore {
  id: number;
  fundabilityScore: number;
  reason: string;
  setFundabilityScore: (score: number) => void;
  setId: (id: number) => void;
  setReason: (reason: string) => void;
}

export const useFundabilityStore = create<FundabilityStore>()(
  persist(
    (set) => ({
      id: 0,
      fundabilityScore: 0,
      reason: "",
      setFundabilityScore: (score) => set({ fundabilityScore: score }),
      setId: (id) => set({ id }),
      setReason: (reason) => set({ reason }),
    }),
    {
      name: "fundability-storage", // Key in localStorage
    }
  )
);
