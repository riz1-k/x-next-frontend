import { z } from 'zod';

const tweetSchema = z.object({
  _id: z.string(),
  text: z.string(),
  likes: z.array(z.string()),
  comments: z.array(z.unknown()),
  author: z.object({
    _id: z.string(),
    username: z.string(),
    fullname: z.string(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export type TypeTweetData = z.infer<typeof tweetSchema>;
export type TypeTweetAuthor = TypeTweetData['author'];
