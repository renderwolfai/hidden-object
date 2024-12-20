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
  
  // Ensure we have absolute URLs
  const baseUrl = url.split('/game/')[0]; // Get base URL from current page URL
  const blurredImageUrl = new URL(getBlurredImageUrl(gameId), baseUrl).toString();
  
  // Twitter card metadata
  twitterUrl.searchParams.set('text', text);
  twitterUrl.searchParams.set('url', url);
  twitterUrl.searchParams.set('card', 'summary_large_image');
  twitterUrl.searchParams.set('image', blurredImageUrl);
  
  return twitterUrl.toString();
}