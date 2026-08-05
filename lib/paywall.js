/**
 * Feature flag for article paywall.
 * Set NEXT_PUBLIC_ENABLE_PAYWALL=true in Vercel (then Redeploy) to re-enable.
 * Default / unset / false = paywall off (full article content for everyone).
 */
export function isPaywallEnabled() {
  return process.env.NEXT_PUBLIC_ENABLE_PAYWALL === "true";
}
