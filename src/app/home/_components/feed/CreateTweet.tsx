'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BsEmojiSmile } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiImage } from 'react-icons/fi';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { axiosPrivate } from '~/lib/configs';
import { getErrorMessage } from '~/lib/utils/helpers';

const createTweetSchema = z.object({
  text: z.string().min(1).max(280),
});

type TypeCreateTweet = z.infer<typeof createTweetSchema>;

export const CreateTweet: React.FC = () => {
  const { register, formState, handleSubmit, reset } = useForm<TypeCreateTweet>(
    {
      resolver: zodResolver(createTweetSchema),
      defaultValues: {
        text: '',
      },
    }
  );

  async function handleCreateTweet(payload: TypeCreateTweet) {
    try {
      await axiosPrivate.post('/tweet', payload);
      toast.success('Tweet created Successfully');
      reset();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateTweet)}
      className='flex w-full gap-x-4 border-b-2 border-border p-5 '
    >
      <div>
        <CgProfile size={34} />
      </div>
      <div className='flex w-full flex-col gap-y-4'>
        <textarea
          {...register('text')}
          placeholder='What is happening?!'
          className='h-full w-full resize-none bg-background outline-none'
        />
        <div className='flex justify-between'>
          <div className='flex items-center '>
            <Button variant='ghost' size='icon' type='button'>
              <FiImage size={18} className='text-primary' />
            </Button>
            <Button variant='ghost' size='icon' type='button'>
              <BsEmojiSmile size={18} className='text-primary' />
            </Button>
          </div>
          <Button
            type='submit'
            variant='default'
            disabled={!formState.isValid}
            loading={formState.isSubmitting}
          >
            Post
          </Button>
        </div>
      </div>
    </form>
  );
};
