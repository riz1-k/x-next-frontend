import { type Metadata } from 'next';
import Link from 'next/link';

import { Button } from '~/components/ui/button';

import { LoginDialog, RegisterDialog } from './_index/auth-dialogs';

export const metadata: Metadata = {
  title: `Y. It's what's happening / Y`,
  description: `Y is what's happening in the world and what people are talking about right now.`,
};

export default function Index() {
  return (
    <main>
      <section className='my-10 grid h-full min-h-[85vh] grid-cols-1 gap-x-10 md:grid-cols-2'>
        <div className='hidden md:block'></div>
        <div className='flex flex-col justify-center max-md:items-center'>
          <h1 className=' text-4xl font-bold md:text-6xl'>Happening Now</h1>
          <h4 className='mb-3 mt-10 text-xl font-bold md:text-2xl '>
            Join today.
          </h4>
          <div className='my-5 flex w-80 flex-col gap-y-4'>
            <Button type='button' variant='secondary'>
              Sign up with Google
            </Button>
            <Button type='button' variant='secondary'>
              Sign up with Apple
            </Button>
            <div className='flex items-center gap-x-3'>
              <span className='h-[1px] w-full bg-secondary' />
              <span className='text-sm'>or</span>
              <span className='h-[1px] w-full bg-secondary' />
            </div>
            <RegisterDialog />
            <p className='text-xs'>
              By signing up, you agree to the{' '}
              <Link href='/tos'>Terms of Serbice</Link> and{' '}
              <Link href='/privacy'>Privacy Policy</Link>, Including{' '}
              <Link href='y-cookies'>Cookie Use.</Link>
            </p>

            <h4 className='mb-3 mt-10 text-lg font-semibold'>
              Already have an account?
            </h4>
            <LoginDialog />
          </div>
        </div>
      </section>
      <footer className='flex flex-col items-center gap-y-2 px-2'>
        <div className='flex flex-wrap items-center justify-center gap-3 '>
          {footerLinks.map((link) => (
            <Link
              href={link.link}
              key={link.label}
              className='text-sm text-gray-500 underline-offset-2 hover:underline'
            >
              {link.label}
            </Link>
          ))}
        </div>
        <span className='text-center text-sm text-gray-500'>
          © 2023 Y Corp.
        </span>
      </footer>
    </main>
  );
}

const footerLinks = [
  { label: 'About', link: 'https://about.y.com' },
  {
    label: 'Download the X app',
    link: 'https://help.y.com/using-x/download-the-x-app',
  },
  { label: 'Help Center', link: 'https://help.y.com' },
  { label: 'Terms of Service', link: 'https://y.com/tos' },
  { label: 'Privacy Policy', link: 'https://y.com/privacy' },
  { label: 'Cookie Policy', link: 'https://support.y.com/articles/20170514' },
  {
    label: 'Accessibility',
    link: 'https://help.y.com/resources/accessibility',
  },
  { label: 'Ads info', link: 'https://blog.y.com' },
  { label: 'Status', link: 'https://status.y.com' },
  { label: 'Careers', link: 'https://careers.y.com' },
  { label: 'Brand Resources', link: 'https://about.y.com/press/brand-assets' },
  { label: 'Advertising', link: 'https://ads.y.com/?ref=gl-tw-tw-y-advertise' },
  { label: 'Marketing', link: 'https://marketing.y.com' },
  {
    label: 'X for Business',
    link: 'https://business.y.com/?ref=web-twc-ao-gbl-yforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=yforbusiness',
  },
  { label: 'Developers', link: 'https://developer.y.com' },
  { label: 'Directory', link: 'https://y.com/i/directory/profiles' },
  { label: 'Settings', link: '/settings' },
];
