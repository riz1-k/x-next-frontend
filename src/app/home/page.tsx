'use client';

import { useAuthUser } from '~/lib/store';

export default function HomePage() {
  const { authUser } = useAuthUser();
  console.log(authUser);
  return <h1>Hello world</h1>;
}
