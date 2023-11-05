import { TweetCard } from '~/components/common/TweetCard';
import { env } from '~/lib/configs';
import { type TypeTweetData } from '~/types/tweet-types';

import { CommentsSection } from '../_components/CommentsSection';
import { CreateComment } from '../_components/CreateComment';

async function getTweetData(tweetId: string) {
  try {
    const response = await fetch(`${env.BACKEND_URL}/tweet/${tweetId}`, {
      next: {
        revalidate: 60 * 5,
      },
    });
    const data: { data: TypeTweetData } = await response.json();
    return data.data;
  } catch {
    return null;
  }
}

interface Props {
  params: {
    tweetId: string;
  };
}

export default async function Page({ params }: Props) {
  const tweetData = await getTweetData(params.tweetId);

  if (!tweetData) {
    return <div className='text-center'>Tweet not found</div>;
  }

  return (
    <section>
      <TweetCard tweetData={tweetData} />
      <CreateComment tweetId={params.tweetId} />
      <CommentsSection tweetId={params.tweetId} />
    </section>
  );
}
