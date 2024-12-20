// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Google Analytics initialization options
export const GA_OPTIONS = {
  debug: process.env.NODE_ENV === 'development'
};

// Helper to check if GA is enabled
export const isGAEnabled = () => {
  return GA_TRACKING_ID && typeof window !== 'undefined';
};