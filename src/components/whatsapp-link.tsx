"use client";

import * as React from "react";
import { trackWhatsappClick } from "@/lib/gtag";

type WhatsappLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  source: string;
};

export function WhatsappLink({ source, onClick, ...rest }: WhatsappLinkProps) {
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      trackWhatsappClick(source);
      if (onClick) {
        onClick(event);
      }
    },
    [onClick, source]
  );

  return <a {...rest} onClick={handleClick} />;
}
