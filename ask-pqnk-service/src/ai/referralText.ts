// Fixed, pre-written referral message per language, shared by every
// AiProvider implementation. This is deliberately NOT a model call in
// either provider — translating one short, unchanging sentence into four
// languages is a one-time human/translation task, not something worth an
// API round-trip for. See provider.ts's AiProvider doc comment.
import type { FarmerLanguage } from "./provider.js";

export const REFERRAL_TEXT: Record<FarmerLanguage, string> = {
  English:
    "This question needs a Pedaver response. I could not find enough authoritative PQNK knowledge to answer this reliably. You can refer this question to Pedaver for review.",
  Urdu:
    "اس سوال کا جواب پیڈاور کی طرف سے درکار ہے۔ مجھے اس سوال کا قابلِ اعتماد جواب دینے کے لیے کافی مستند PQNK علم نہیں ملا۔ آپ یہ سوال پیڈاور کو بھیج سکتے ہیں۔",
  "Roman Urdu":
    "Is sawal ka jawab Pedaver se chahiye. Mujhe is sawal ka bharosemand jawab dene ke liye kaafi mustanad PQNK ilm nahi mila. Aap yeh sawal Pedaver ko refer kar sakte hain.",
  Punjabi:
    "ਇਸ ਸਵਾਲ ਦਾ ਜਵਾਬ Pedaver ਤੋਂ ਚਾਹੀਦਾ ਹੈ। ਮੈਨੂੰ ਇਸ ਸਵਾਲ ਦਾ ਭਰੋਸੇਯੋਗ ਜਵਾਬ ਦੇਣ ਲਈ ਲੋੜੀਂਦਾ PQNK ਗਿਆਨ ਨਹੀਂ ਮਿਲਿਆ।",
  Mixed:
    "This question needs a Pedaver response. I could not find enough authoritative PQNK knowledge to answer this reliably. You can refer this question to Pedaver for review.",
};
