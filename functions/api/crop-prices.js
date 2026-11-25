// GET /api/crop-prices  (Cloudflare Pages Function): mandi and retail prices from amis.pk for the Crop Prices tool
// (public/crop-prices-app). The proxy itself is functions-lib/cropPrices.js. Package from the Ask PQNK developer, 2026-11-25.
import { handleCropPrices } from "../../functions-lib/cropPrices.js";

export async function onRequestGet({ request, waitUntil }) {
  return handleCropPrices(request, { cache: caches.default, waitUntil });
}
