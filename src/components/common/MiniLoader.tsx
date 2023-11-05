import { TbLoader2 } from 'react-icons/tb';

export function MiniLoader() {
  return (
    <div className='flex justify-center py-4'>
      <TbLoader2 size={28} className='animate-spin text-primary' />
    </div>
  );
}
