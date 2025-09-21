const getDataLayer = (): unknown[] | undefined => {
  if (typeof window === "undefined") return undefined;
  const w = window as typeof window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  return w.dataLayer;
};

export const pushToDataLayer = (eventData: Record<string, unknown>): void => {
  const dataLayer = getDataLayer();
  if (!dataLayer) return;
  dataLayer.push(eventData);
};

export const trackWhatsappClick = (source: string) => {
  pushToDataLayer({
    event: "whatsapp_click",
    source,
  });
};
