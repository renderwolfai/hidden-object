import { event } from '../index';

export const trackShare = ({
  platform,
  gameId,
  title
}: {
  platform: 'twitter';
  gameId: string;
  title: string;
}) => {
  event({
    action: 'share',
    category: 'social',
    label: `${platform}:${title} (${gameId})`
  });
};