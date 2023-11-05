'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { BsChat } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { PiHeart, PiHeartFill } from 'react-icons/pi';
import { RxLoop } from 'react-icons/rx';

import { axiosPrivate } from '~/lib/configs';
import { useAuthUser } from '~/lib/store';
import { cn } from '~/lib/utils';
import { getErrorMessage } from '~/lib/utils/helpers';
import { type TypeTweetData } from '~/types/tweet-types';

import { Button } from '../ui/button';

interface Props {
  tweetData: TypeTweetData;
}

export const TweetCard: React.FC<Props> = (props) => {
  const [tweetData, setTweetData] = useState<TypeTweetData>(props.tweetData);

  const { authUser } = useAuthUser();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async function () {
      try {
        await axiosPrivate.post(`/user/interactions/like/${tweetData._id}`);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
  });

  function handleLike() {
    setTweetData((prev) => ({
      ...prev,
      likes: hasLiked
        ? prev.likes.filter((id) => id !== authUser?._id)
        : [...prev.likes, authUser?._id ?? ''],
    }));
    mutate();
  }

  const tweetCreateTime = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(tweetData.createdAt));

  const hasLiked = useMemo(
    () => tweetData.likes.includes(authUser?._id ?? ''),
    [tweetData.likes, authUser]
  );

  return (
    <article
      onClick={() => router.push(`/home/tweet/${tweetData._id}`)}
      className='flex cursor-pointer gap-x-4 border-b border-border p-5 transition-all hover:bg-accent/30'
    >
      <CgProfile size={34} />
      <div className='flex flex-col gap-y-2'>
        <div className='space-y-2'>
          <div className='flex items-center gap-x-2'>
            <span>{tweetData.author.fullname}</span>
            <span>@{tweetData.author.username}</span>
            <span>{tweetCreateTime}</span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: tweetData.text }} />
        </div>
        <div className='flex items-center gap-x-5'>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='flex items-center gap-x-2 hover:text-primary'
          >
            <BsChat size={18} />
            {tweetData.comments.length}
          </Button>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='hidden items-center gap-x-2 hover:text-green-500'
          >
            <RxLoop size={20} /> 0
          </Button>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={(event) => {
              event.stopPropagation();
              handleLike();
            }}
            className={cn(
              'flex items-center gap-x-2 hover:text-pink-500',
              hasLiked && 'text-pink-500'
            )}
          >
            {hasLiked ? <PiHeartFill size={20} /> : <PiHeart size={20} />}

            {tweetData.likes.length}
          </Button>
        </div>
      </div>
    </article>
  );
};
