import { HomeFeed } from '~/app/home/_components/feed';

import { CreateTweet } from './_components/feed/CreateTweet';

export default function HomePage() {
  return (
    <main>
      <CreateTweet />
      <HomeFeed />
    </main>
  );
}
