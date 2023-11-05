'use client';

import { useQuery } from '@tanstack/react-query';

import { MiniLoader } from '~/components/common/MiniLoader';
import { TweetCard } from '~/components/common/TweetCard';
import { axiosPrivate } from '~/lib/configs';
import { getErrorMessage } from '~/lib/utils/helpers';
import { type TypeTweetData } from '~/types/tweet-types';

async function fetchUserTimeline() {
  try {
    const response = await axiosPrivate.get<{ data: TypeTweetData[] }>(
      '/tweet/timeline'
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export const HomeFeed: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userTimeline'],
    queryFn: fetchUserTimeline,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isError) return <section>Error...</section>;

  if (!isLoading && (!data || data.length === 0))
    return <section>No tweets found</section>;

  return (
    <section>
      {data?.map((tweet) => <TweetCard key={tweet._id} tweetData={tweet} />)}

      {isLoading && <MiniLoader />}
    </section>
  );
};
