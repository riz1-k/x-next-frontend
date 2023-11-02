import '../styles/tailwind.css';
import '../styles/main.css';

import { headers } from 'next/headers';
import { Toaster } from 'sonner';

import { ClientWrapper } from '~/components/common/client-wrapper';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = headers().get('x-user');

  const clientWrapperData = {
    userDataString: userData,
  };

  return (
    <html lang='en' data-theme='dark'>
      <body>
        <ClientWrapper {...clientWrapperData} />
        {children}
      </body>
      <Toaster richColors />
    </html>
  );
}
