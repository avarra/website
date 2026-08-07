export const calBooking = {
  url: "https://cal.com/avarra.dev/30min",
  calLink: "avarra.dev/30min",
  namespace: "avarra-30min",
  layout: "month_view",
} as const;

const themeVariables = {
  "cal-brand": "#f96c39",
  "cal-brand-emphasis": "#d95428",
  "cal-brand-text": "#ffffff",
  "cal-brand-subtle": "#ffaf91",
  "cal-brand-accent": "#ffffff",
  "cal-text": "#090909",
  "cal-text-emphasis": "#090909",
  "cal-text-subtle": "#767676",
  "cal-text-muted": "#a0a0a0",
  "cal-text-inverted": "#ffffff",
  "cal-bg": "#fffaf7",
  "cal-bg-emphasis": "#fff1eb",
  "cal-bg-subtle": "#f5f5f5",
  "cal-bg-muted": "#eeeeee",
  "cal-bg-inverted": "#090909",
  "cal-border": "#e4e4e4",
  "cal-border-emphasis": "#f96c39",
  "cal-border-subtle": "#e4e4e4",
  "cal-border-muted": "#eeeeee",
  "cal-border-booker": "#f96c39",
  "cal-border-booker-width": "1px",
  radius: "0px",
};

export const calBookingUi = {
  theme: "light",
  layout: calBooking.layout,
  hideEventTypeDetails: false,
  cssVarsPerTheme: {
    light: themeVariables,
    dark: themeVariables,
  },
} as const;
