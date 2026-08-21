import type { AiProvider } from "./provider.js";
import { MockAiProvider } from "./mockProvider.js";
import { AnthropicAiProvider } from "./anthropicProvider.js";

// Selector — the ONLY place that decides which vendor is active. Defaults
// to the mock provider since no API key was authorized for this local
// build. Set AI_PROVIDER=anthropic and ANTHROPIC_API_KEY to switch, with
// zero changes anywhere else in the service.
function selectProvider(): AiProvider {
  const requested = process.env.AI_PROVIDER ?? "mock";
  if (requested === "anthropic") {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) {
      console.warn("[ai] AI_PROVIDER=anthropic but ANTHROPIC_API_KEY is not set — falling back to mock provider.");
      return new MockAiProvider();
    }
    return new AnthropicAiProvider(key);
  }
  return new MockAiProvider();
}

export const aiProvider: AiProvider = selectProvider();
console.log(`[ai] Using provider: ${aiProvider.name}`);
