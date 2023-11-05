import { NavSidebar } from '~/app/home/_components/NavSidebar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-auto flex w-[90%] flex-row gap-x-10 lg:max-w-[1250px]'>
      <NavSidebar />
      <main className='flex min-h-screen flex-grow flex-col border-x-2 border-border'>
        {children}
      </main>
    </div>
  );
}
