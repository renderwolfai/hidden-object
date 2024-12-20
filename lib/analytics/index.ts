import { GA_TRACKING_ID, isGAEnabled } from './config';

// Initialize Google Analytics
export const initGA = () => {
  if (!isGAEnabled()) return;

  // Load Google Analytics script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID);
};

// Track page views
export const pageview = (url: string) => {
  if (!isGAEnabled()) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Track custom events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!isGAEnabled()) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};