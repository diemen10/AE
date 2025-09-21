const ADS_WHATSAPP_SEND_TO = process.env.NEXT_PUBLIC_GADS_WHATSAPP_SEND_TO ?? "";

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

export const trackConversion = (sendTo: string) => {
  if (!sendTo) return;
  trackEvent("conversion", {
    send_to: sendTo,
  });
};

export const trackWhatsappClick = (source: string) => {
  trackEvent("whatsapp_click", {
    source,
  });

  if (ADS_WHATSAPP_SEND_TO) {
    trackConversion(ADS_WHATSAPP_SEND_TO);
  }
};
