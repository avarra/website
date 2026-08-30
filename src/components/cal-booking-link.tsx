"use client";

import { getCalApi } from "@calcom/embed-react";
import type { MouseEvent, ReactNode } from "react";
import { useEffect } from "react";
import { calBooking, calBookingUi } from "@/lib/cal-booking";

type Props = {
  children: ReactNode;
  className?: string;
  cursorLabel?: string;
};

let calApiPromise: ReturnType<typeof getCalApi> | undefined;
const modalStyleId = "avarra-cal-modal-shell";

const styleBookingModalShell = () => {
  const modal = document.querySelector("cal-modal-box");
  const shadowRoot = modal?.shadowRoot;

  if (!shadowRoot) return false;
  if (shadowRoot.getElementById(modalStyleId)) return true;

  const style = document.createElement("style");
  style.id = modalStyleId;
  style.textContent = `
    .modal-box {
      width: calc(100% - 64px);
      max-width: 1408px;
    }

    ::slotted(iframe) {
      border-radius: 0 !important;
    }

    @media (max-width: 900px) {
      .modal-box {
        width: calc(100% - 32px);
      }
    }

    @media (max-width: 680px) {
      .modal-box {
        width: 100%;
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  `;
  shadowRoot.append(style);

  return true;
};

const getBookingCalApi = () => {
  calApiPromise ??= getCalApi({ namespace: calBooking.namespace }).then(
    (cal) => {
      cal("ui", calBookingUi);
      return cal;
    },
  );
  return calApiPromise;
};

export function CalBookingLink({
  children,
  className,
  cursorLabel = "Book",
}: Props) {
  useEffect(() => {
    void getBookingCalApi().catch(() => {
      // The href remains a working fallback if the embed script is blocked.
    });
  }, []);

  const openBookingModal = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    void getBookingCalApi()
      .then((cal) => {
        cal("modal", {
          calLink: calBooking.calLink,
          config: { layout: calBooking.layout },
        });

        let observer: MutationObserver | undefined;

        if (!styleBookingModalShell()) {
          observer = new MutationObserver(() => {
            if (styleBookingModalShell()) {
              observer?.disconnect();
            }
          });
          observer.observe(document.body, { childList: true });
        }

        window.setTimeout(() => {
          observer?.disconnect();
          if (!document.querySelector("cal-modal-box")) {
            window.location.assign(calBooking.url);
          }
        }, 8000);
      })
      .catch(() => {
        window.location.assign(calBooking.url);
      });
  };

  return (
    <a
      className={className}
      href={calBooking.url}
      onClick={openBookingModal}
      data-cal-namespace={calBooking.namespace}
      data-cal-link={calBooking.calLink}
      data-cal-config={JSON.stringify({ layout: calBooking.layout })}
      data-cursor-label={cursorLabel}
    >
      {children}
    </a>
  );
}
