'use client';

import { useEffect } from 'react';

import { useAuthUser } from '~/lib/store';
import { authUserSchema } from '~/lib/store/slices/useAuth/user-types';

interface Props {
  userDataString: string | null;
}

export const ClientWrapper: React.FC<Props> = ({ userDataString }) => {
  const { setAuthUser } = useAuthUser();

  useEffect(() => {
    function saveUser() {
      if (!userDataString) return;
      try {
        const userData = authUserSchema.parse(JSON.parse(userDataString));
        setAuthUser(userData);
      } catch (err) {
        console.log(err);
      }
    }
    saveUser();
  }, []);

  return null;
};
