export interface VideoLibraryEntry {
  videoId: string;
  /** Real YouTube title, used as-is — many of these are Urdu-language lectures. */
  title: string;
  sourceName: string;
  sourceUrl: string;
}

export interface VideoLibraryCategory {
  slug: string;
  title: string;
  videos: VideoLibraryEntry[];
}

/**
 * A topic-organized library of Urdu-language farmer lectures and field
 * guidance videos, distinct from the channel-organized videos in
 * `videos.ts`. Sourced from a curated link list Asif compiled from his own
 * and partner farmers' YouTube channels.
 *
 * Category order follows the PQNK learning path Asif specified: the
 * foundational "how it works" content (Steps of PQNK, Hardpan Breaking,
 * SIPP, Syphon Tube irrigation) leads, then land-type/crop-specific
 * guidance, then the OAP whole-farm model, ending with the Kinnow
 * orchard case study — not alphabetical or upload order.
 */
export const videoLibrary: VideoLibraryCategory[] = [
  {
    slug: "steps-of-pqnk",
    title: "Steps of PQNK",
    videos: [
      {
        videoId: "naklRXVA7cE",
        title: "Steps to PA:PQNK",
        sourceName: "PedaVer PQNK",
        sourceUrl: "https://www.youtube.com/@pedaverpqnk3167",
      },
      {
        videoId: "KAUsZ8IN4H0",
        title: "The Ongoing Evolution of the Conventional Bana Kiarri System: A Legacy of Late 19th Century Land Dem",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
    ],
  },
  {
    slug: "hardpan-breaking",
    title: "Hardpan Breaking",
    videos: [
      {
        videoId: "iLfdE52aNws",
        title: "Breaking the hard pan correctly is an important step for PQNK",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
      {
        videoId: "lLIYS9BN94U",
        title: "PQNK ka dosra asool zamen ki sakht tah torna cheezal plow say",
        sourceName: "PQNK Farming",
        sourceUrl: "https://www.youtube.com/@PQNKFarming",
      },
    ],
  },
  {
    slug: "sipp",
    title: "SIPP — Slit Insertion Precision Planter",
    videos: [
      {
        videoId: "eZchOqfpMSM",
        title: "SIPP  SLIT INSERTION PRECISION PLANTER FOR PQNK",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
      {
        videoId: "vOVW_ayFzbc",
        title: "Tractor & SIPP settings",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
      {
        videoId: "dmZr7dtkHyM",
        title: "Detaching mulcher and PQNK SIPP planter",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
    ],
  },
  {
    slug: "syphon-tube-irrigation",
    title: "Syphon Tube Water Management",
    videos: [
      {
        videoId: "qm8_HARR8nY",
        title: "Irrigation under PA/PQNK process",
        sourceName: "PedaVer PQNK",
        sourceUrl: "https://www.youtube.com/@pedaverpqnk3167",
      },
      {
        videoId: "cMVFCeoysXc",
        title: "Irrigating with siphons",
        sourceName: "CottonInfo: Connecting growers with research",
        sourceUrl: "https://www.youtube.com/@CottonInfoAust",
      },
      {
        videoId: "F-gSoqrdRU8",
        title: "Syphon tubes irrigation to Maize crop on Raised beds under PQNK.",
        sourceName: "NHS FARMS",
        sourceUrl: "https://www.youtube.com/@NHSFARMS",
      },
      {
        videoId: "j8JSu_iYbGs",
        title: "A best and cheap way to control flow of water during irrigation to raised beds under PQNK",
        sourceName: "NHS FARMS",
        sourceUrl: "https://www.youtube.com/@NHSFARMS",
      },
      {
        videoId: "isTcH3S_bRk",
        title: "The Impact of Water Flow Speed in a Furrow on Water Absorption",
        sourceName: "PedaVer PQNK",
        sourceUrl: "https://www.youtube.com/@pedaverpqnk3167",
      },
    ],
  },
  {
    slug: "rain-fed-land",
    title: "Rain-Fed Land",
    videos: [
      {
        videoId: "G0m7Iw9d-vU",
        title: "پائیدار قدرتی نظام کاشتکاری (پقنک) پر بارانی کاشتکاری۔ لیکچر: آصف شریف صاحب",
        sourceName: "ZAHEER AWAN",
        sourceUrl: "https://www.youtube.com/@zaheerawan2",
      },
    ],
  },
  {
    slug: "sandy-land",
    title: "Sandy Land",
    videos: [
      {
        videoId: "GFszH3WVu5E",
        title: "پائیدار قدرتی نظام کاشتکاری (پقنک)   ریتلی زمین پر کاشتکاری۔  لیکچر: آصف شریف صاحب",
        sourceName: "ZAHEER AWAN",
        sourceUrl: "https://www.youtube.com/@zaheerawan2",
      },
    ],
  },
  {
    slug: "saline-land",
    title: "Saline Land",
    videos: [
      {
        videoId: "XWElLPJoZsk",
        title: "پائیدار قدرتی نظام کاشتکاری (پقنک) پر سیم اور کلراٹھی زمینوں پر کاشتکاری۔ لیکچر: آصف شریف صاحب",
        sourceName: "ZAHEER AWAN",
        sourceUrl: "https://www.youtube.com/@zaheerawan2",
      },
    ],
  },
  {
    slug: "rice-crop",
    title: "Rice Crop",
    videos: [
      {
        videoId: "nO50eDnGyM8",
        title: "پائیدار قدرتی نظام کاشتکاری (پقنک) پر دھان کی کاشت۔  لیکچر آصف شریف صاحب",
        sourceName: "ZAHEER AWAN",
        sourceUrl: "https://www.youtube.com/@zaheerawan2",
      },
    ],
  },
  {
    slug: "maize-crop",
    title: "Maize Crop",
    videos: [
      {
        videoId: "R3ZU7m7fcIY",
        title: "پائیدار قدرتی نظام کاشتکاری (پقنک) پر مکئ کی کاشت۔ لیکچر: آصف شریف صاحب",
        sourceName: "ZAHEER AWAN",
        sourceUrl: "https://www.youtube.com/@zaheerawan2",
      },
    ],
  },
  {
    slug: "potato-crop",
    title: "Potato Crop",
    videos: [
      {
        videoId: "O1WNhA2yogM",
        title: "پائیدار قدرتی نظام کاشتکاری (پقنک) پر آلو کی کاشت۔ لیکچر:آصف شریف صاحب",
        sourceName: "ZAHEER AWAN",
        sourceUrl: "https://www.youtube.com/@zaheerawan2",
      },
    ],
  },
  {
    slug: "sugarcane-lectures",
    title: "Sugarcane Lectures",
    videos: [
      {
        videoId: "C1Z1soDxuko",
        title: "Raising a Sugarcane Nursery: Process for High-Yielding PQNK Crop",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
      {
        videoId: "SIgdS0YQN5s",
        title: "Best Way TO Grow Organic Sugarcane | Know About Sugarcane | Part 1",
        sourceName: "ZAHEER AWAN",
        sourceUrl: "https://www.youtube.com/@zaheerawan2",
      },
      {
        videoId: "pkPlcxdgiQg",
        title: "Best Way TO Grow Organic Sugarcane | Know About Sugarcane | Part 2",
        sourceName: "ZAHEER AWAN",
        sourceUrl: "https://www.youtube.com/@zaheerawan2",
      },
      {
        videoId: "hY9qtUl8IrA",
        title: "Cutting of mother shoot and ratoon management in Sugarcane",
        sourceName: "PedaVer PQNK",
        sourceUrl: "https://www.youtube.com/@pedaverpqnk3167",
      },
      {
        videoId: "kB4EazzvmVU",
        title: "Sugarcane on PQNK",
        sourceName: "PedaVer PQNK",
        sourceUrl: "https://www.youtube.com/@pedaverpqnk3167",
      },
    ],
  },
  {
    slug: "cotton-crop",
    title: "Cotton Crop",
    videos: [
      {
        videoId: "REt1QCJKS5g",
        title: "How To Grow Organic Cotton | Less Inputs More Profits |",
        sourceName: "ZAHEER AWAN",
        sourceUrl: "https://www.youtube.com/@zaheerawan2",
      },
    ],
  },
  {
    slug: "organic-sesame-crop",
    title: "Organic Sesame Crop",
    videos: [
      {
        videoId: "6YUq-PDZErk",
        title: "How To Grow Organic Sesame | Tiny Seeds | Organic Crop |",
        sourceName: "ZAHEER AWAN",
        sourceUrl: "https://www.youtube.com/@zaheerawan2",
      },
    ],
  },
  {
    slug: "wheat-crop",
    title: "Wheat Crop",
    videos: [
      {
        videoId: "fo6nq52Zqwg",
        title: "How To Grow Wheat | Organic Wheat | With Less Input And More Profit |",
        sourceName: "ZAHEER AWAN",
        sourceUrl: "https://www.youtube.com/@zaheerawan2",
      },
      {
        videoId: "xXiyIQmhOdo",
        title: "Wheat plants are still green while heads matured",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
      {
        videoId: "WobS1dKXoKM",
        title: "Pruning of wheat - timing, method and height",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
      {
        videoId: "snAZ0hdYecc",
        title: "Wheat & Corn combo - protect your crops from extreme temperatures",
        sourceName: "PedaVer PQNK",
        sourceUrl: "https://www.youtube.com/@pedaverpqnk3167",
      },
      {
        videoId: "aeapEnot6hM",
        title: "Understanding Wheat Head Development  Why Some Tillers Fail to Form Heads",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
      {
        videoId: "DISOen0Prno",
        title: "PQNK wheat 2nd Proning",
        sourceName: "PQNK Farming",
        sourceUrl: "https://www.youtube.com/@PQNKFarming",
      },
      {
        videoId: "kej2mw6NHhk",
        title: "PA/PQNK Pruning of wheat on Raised beds.",
        sourceName: "NHS FARMS",
        sourceUrl: "https://www.youtube.com/@NHSFARMS",
      },
      {
        videoId: "qddpbZak_YY",
        title: "Wheat on PQNK.Pruning of wheat in a natural way to take maximum tillering. No inputs applied",
        sourceName: "PQNK_Farming. پائیدار قدرتی نظام کاشتکاری",
        sourceUrl: "https://www.youtube.com/@PQNK_Farming",
      },
      {
        videoId: "mXbnvcfQOsQ",
        title: "Q&A on wheat pruning",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
      {
        videoId: "sS40004xc-o",
        title: "Yield vs Profit -  Wheat",
        sourceName: "PedaVer PQNK",
        sourceUrl: "https://www.youtube.com/@pedaverpqnk3167",
      },
    ],
  },
  {
    slug: "ginger",
    title: "Ginger",
    videos: [
      {
        videoId: "JD5QYn1xQXQ",
        title: "Ginger production on PQNK",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
    ],
  },
  {
    slug: "oap-model",
    title: "OAP — One Acre Prosperity Model",
    videos: [
      {
        videoId: "oc8hQYh1Nj8",
        title: "Open field vertical farming - OAP One Acre Prosperity model",
        sourceName: "PedaVer PQNK",
        sourceUrl: "https://www.youtube.com/@pedaverpqnk3167",
      },
      {
        videoId: "Co5VXT31NDg",
        title: "PA/PQNK natural farm. One Acre Prosperity (OAP) model created by Mahkdeep Sing (Indian Punjab).",
        sourceName: "PedaVer PQNK",
        sourceUrl: "https://www.youtube.com/@pedaverpqnk3167",
      },
      {
        videoId: "RBFBxG8OkDE",
        title: "One Acre Prosperity OAP, a PQNK model for smallholders' libration - Motivator Mr Yogesh Bombay India",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
    ],
  },
  {
    slug: "kinnow-orchard",
    title: "Kinnow Orchard",
    videos: [
      {
        videoId: "xG-jr7Yxf98",
        title: "How to grow your Citrus Orchids organically under PQNK/ खट्टे बगीचों की देखभाल",
        sourceName: "NHS FARMS",
        sourceUrl: "https://www.youtube.com/@NHSFARMS",
      },
      {
        videoId: "JfPLLSiMWeE",
        title: "Conventional vs PQNK Kinnow",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
      {
        videoId: "g6k5VuBN9PY",
        title: "Kinnow on PQNK - farmer Haji Ramzan & Ahmed Hassan Sarghoda",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
      {
        videoId: "q0pMEzv6Olo",
        title: "PQNK Kinnow Farmer Success Story Mr  Himmat Singh's Transformation Journey",
        sourceName: "Asif Sharif",
        sourceUrl: "https://www.youtube.com/@aasifsharif",
      },
      {
        videoId: "J7xLiuhBRMo",
        title: "Shifting on PQNK/PA#Shifting kinnow on PQNK/PA#",
        sourceName: "Munjal's PQNK Citrus Farm, Abohar",
        sourceUrl: "https://www.youtube.com/@munjalspqnkcitrusfarmaboha1807",
      },
      {
        videoId: "uPE7_z6yzBI",
        title: "Shifting of Citrus Orchard on permanent Raised Beds PQNK",
        sourceName: "Dr Muhammad Aadil Maan",
        sourceUrl: "https://www.youtube.com/@drmuhammadaadilmaan7363",
      },
      {
        videoId: "mRI9TwjRTXA",
        title: "Kinnow on PQNK Haji Ramzan",
        sourceName: "PedaVer PQNK",
        sourceUrl: "https://www.youtube.com/@pedaverpqnk3167",
      },
      {
        videoId: "TyZEVhTZ-8I",
        title: "Citrus orchard converted to Natural Farming  (PQNK)",
        sourceName: "Mubashir Riaz Farming",
        sourceUrl: "https://www.youtube.com/@mubashirriazfarming6975",
      },
    ],
  },
];
