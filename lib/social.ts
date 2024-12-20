import { headers } from 'next/headers';

export function getBlurredImageUrl(gameId: string) {
  return `/api/blur/${gameId}`;
}

export function createTwitterShareUrl({
  text,
  url,
  gameId
}: {
  text: string;
  url: string;
  gameId: string;
}) {
  const twitterUrl = new URL('https://twitter.com/intent/tweet');
  twitterUrl.searchParams.set('text', `${text} ${url}`);
  return twitterUrl.toString();
}