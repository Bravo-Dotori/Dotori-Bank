import { create } from 'zustand';

const useStore = create((set) => ({
    // 메뉴
    activeMenu: 'deposit',
    setActiveMenu: (menu) => set({ activeMenu: menu }),

    // 사용자 이름
    userName: '',
    setUserName: (name) => set({ userName: name }),
}));

export default useStore;