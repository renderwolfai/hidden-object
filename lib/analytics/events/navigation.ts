import { event } from '../index';

export const trackLogoClick = () => {
  event({
    action: 'click_logo',
    category: 'navigation'
  });
};