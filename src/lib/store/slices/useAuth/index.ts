import { create } from 'zustand';

import { type IAuthUser } from './user-types';

interface IAuthUserState {
  authUser?: IAuthUser;
  setAuthUser: (authUser?: IAuthUser) => void;
}

export const useAuthUser = create<IAuthUserState>((set) => ({
  authUser: undefined,
  setAuthUser: (authUser) => set({ authUser }),
}));
