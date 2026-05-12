import { create } from 'zustand';

const useMenuStore = create((set) => ({
    activeMenu: 'deposit',
    setActiveMenu: (menu) => set({ activeMenu: menu }),
}));

export default useMenuStore;