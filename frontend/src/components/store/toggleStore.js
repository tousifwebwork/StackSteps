/**
 * Theme Toggle Store (Zustand)
 * Manages dark/light theme state with localStorage persistence
 */

import { create } from "zustand";

// ============================================
// Toggle Store
// ============================================

const useToggleStore = create((set) => ({
    // Current theme ('light' or 'dark'), initialized from localStorage
    theme: localStorage.getItem("theme") || "light",

    /**
     * Toggle between light and dark themes
     * Persists selection to localStorage
     */
    toggle: () => set((state) => {
        const newTheme = state.theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        return { theme: newTheme };
    }),
}));

export default useToggleStore;
