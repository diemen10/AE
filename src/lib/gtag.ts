export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

type GtagEventParams = Record<string, string | number | boolean | undefined>;

const getGtag = () => {
  if (typeof window === "undefined") return undefined;
  return (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
};

export const trackEvent = (eventName: string, params: GtagEventParams = {}): void => {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", eventName, params);
};

export const trackWhatsappClick = (source: string) => {
  trackEvent("whatsapp_click", {
    source,
  });
};
