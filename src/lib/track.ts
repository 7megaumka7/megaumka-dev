export type TrackEvent = "whatsapp_click" | "telegram_click" | "email_click" | "phone_click" | "audit_completed";

// The click navigates away immediately (wa.me/t.me/mailto), so this can't
// wait for a normal fetch to resolve. sendBeacon is built for exactly this -
// it survives the page unload. Fall back to a keepalive fetch where
// sendBeacon isn't available (older Safari).
export function track(event: TrackEvent) {
  const body = JSON.stringify({ event });
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", body);
      return;
    }
  } catch {
    // fall through to fetch
  }
  fetch("/api/track", { method: "POST", body, keepalive: true }).catch(() => {});
}
