 

import { create } from "zustand";
 
const useToggleStore = create((set) => ({ 
    theme: localStorage.getItem("theme") || "light",
 
    toggle: () => set((state) => {
        const newTheme = state.theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        return { theme: newTheme };
    }),
}));

export default useToggleStore;
