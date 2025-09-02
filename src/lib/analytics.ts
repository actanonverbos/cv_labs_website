declare global {
  interface Window {
    umami: {
      track: (event: string, data?: Record<string, string | number>) => void;
    };
  }
}

export function trackEvent(eventName: string, props?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, props);
  }
}

// Predefined tracking events for the landing page
export const trackCTAClick = (ctaLocation: string, ctaText: string) => {
  trackEvent('CTA Click', {
    location: ctaLocation,
    text: ctaText
  });
};

export const trackPortfolioView = (portfolioItem: string) => {
  trackEvent('Portfolio View', {
    item: portfolioItem
  });
};

export const trackPricingView = (pricingTier: string) => {
  trackEvent('Pricing View', {
    tier: pricingTier
  });
};

export const trackFAQOpen = (question: string) => {
  trackEvent('FAQ Open', {
    question: question.substring(0, 50) // Limit length
  });
};

export const trackScrollDepth = (section: string) => {
  trackEvent('Scroll Depth', {
    section
  });
};
