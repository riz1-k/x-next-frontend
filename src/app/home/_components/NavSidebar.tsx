import Link from 'next/link';
import { BiBookmark } from 'react-icons/bi';
import { BsFillPeopleFill, BsFillPersonFill } from 'react-icons/bs';
import { FiMail, FiSearch } from 'react-icons/fi';
import { GoHomeFill } from 'react-icons/go';
import { IoNotificationsOutline } from 'react-icons/io5';
import { LiaListUlSolid } from 'react-icons/lia';
import { RiTwitterXFill } from 'react-icons/ri';

export const NavSidebar: React.FC = () => {
  return (
    <aside className='py-4'>
      <div className='px-3'>
        <RiTwitterXFill size={28} />
      </div>
      <ul className='flex flex-col py-2'>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className='flex items-center gap-x-4 rounded-full p-3 transition-all hover:bg-gray-800 '
            >
              {link.icon}
              <span className='hidden text-xl font-medium lg:block '>
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const navLinks = [
  {
    href: '/',
    icon: <GoHomeFill size={28} />,
    label: 'Home',
  },
  {
    href: '/explore',
    icon: <FiSearch size={28} />,
    label: 'Explore',
  },
  {
    href: '/notifications',
    icon: <IoNotificationsOutline size={28} />,
    label: 'Notifications',
  },
  {
    href: '/messages',
    icon: <FiMail size={28} />,
    label: 'Messages',
  },
  {
    href: '/bookmarks',
    icon: <BiBookmark size={28} />,
    label: 'Bookmarks',
  },
  {
    href: '/lists',
    icon: <LiaListUlSolid size={28} />,
    label: 'Lists',
  },
  {
    href: '/group',
    icon: <BsFillPersonFill size={28} />,
    label: 'Groups',
  },
  {
    href: '/more',
    icon: <RiTwitterXFill size={28} />,
    label: 'More',
  },
  {
    href: '/profile',
    icon: <BsFillPeopleFill size={28} />,
    label: 'Profile',
  },
];
