import { create } from 'zustand';

const useStore = create((set) => ({
    // 메뉴
    activeMenu: 'deposit',
    setActiveMenu: (menu) => set({ activeMenu: menu }),

    // 사용자
    isLogin: false,
    user: null,
    isLoading: true,

    setLogin: (user) =>
        set({
            isLogin: true,
            user,
            userName: user.name,
            isLoading: false,
        }),

    logout: () =>
        set({
            isLogin: false,
            user: null,
            userName: '',
            isLoading: false,
        }),

    setLoading: (value) =>
        set({
            isLoading: value,
        }),

    // 사용자 이름
    userName: '',
    setUserName: (name) => set({ userName: name }),
}));

export default useStore;