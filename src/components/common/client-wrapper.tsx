'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useEffect, useState } from 'react';

import { useAuthUser } from '~/lib/store';
import { authUserSchema } from '~/lib/store/slices/useAuth/user-types';

interface Props {
  userDataString: string | null;
  children: ReactNode;
}

export const ClientWrapper: React.FC<Props> = ({
  userDataString,
  children,
}) => {
  const { setAuthUser } = useAuthUser();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

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

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
