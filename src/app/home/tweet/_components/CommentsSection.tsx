'use client';

import { useQuery } from '@tanstack/react-query';

import { MiniLoader } from '~/components/common/MiniLoader';
import { TweetCard } from '~/components/common/TweetCard';
import { axiosPrivate } from '~/lib/configs';
import { getErrorMessage } from '~/lib/utils/helpers';
import { type TypeTweetData } from '~/types/tweet-types';

async function getTweetComments(tweetId: string) {
  try {
    const response = await axiosPrivate.get<{ data: TypeTweetData[] }>(
      `/tweet/comments/${tweetId}`
    );
    return response.data.data;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

interface Props {
  tweetId: string;
}

export const CommentsSection: React.FC<Props> = (props) => {
  const { tweetId } = props;
  const { data, isLoading } = useQuery({
    queryKey: ['tweet-comments', tweetId],
    queryFn: async () => await getTweetComments(tweetId),
  });

  if (data && data.length === 0) {
    return <div className='py-4 text-center'>No comments yet</div>;
  }

  return (
    <section>
      {data?.map((comment) => (
        <TweetCard key={comment._id} tweetData={comment} />
      ))}
      {isLoading && <MiniLoader />}
    </section>
  );
};
