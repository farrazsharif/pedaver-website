import type { ChapterBlock } from "@/lib/content/books";

/**
 * Renders a published chapter's body blocks using the exact font/colour
 * choices locked in PQNK_Book_Editorial_and_Typography_Style_Standard.docx —
 * Georgia for everything the reader follows as part of the chapter's
 * argument, Arial reserved for the Q&A panel's own apparatus. Sizes and
 * line-height are adapted for comfortable screen reading (the Style
 * Standard's point sizes/line-spacing govern the print PDF, a different
 * medium); the font family, colour palette, and heading hierarchy are
 * reproduced exactly, unchanged from the docx.
 *
 * Do not hand-format an individual chapter here — every visual decision
 * comes from this one block-type switch, so Chapters 2 onward inherit it
 * automatically the moment their own body arrays exist.
 */

const COLOR = {
  deepGreen: "#1A4731",
  accentGreen: "#2D6A4F",
  ink: "#1C1C1C",
  quoteGray: "#3D3D3D",
  terracotta: "#6B4226",
  transitionGray: "#888888",
  qaHeaderGreen: "#1B4A2B",
  qaTint: "#E8F5E9",
} as const;

const IMAGE_BASE = "/books/natural-ecosystem-science/earths-original-design";

export default function ChapterBody({ blocks }: { blocks: ChapterBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "openingQuote":
            return (
              <p
                key={i}
                className="border-l-2 pl-4 text-lg italic leading-relaxed sm:text-xl"
                style={{ fontFamily: "Georgia, serif", color: COLOR.quoteGray, borderColor: COLOR.accentGreen }}
              >
                {block.text}
              </p>
            );
          case "attribution":
            return (
              <p key={i} className="pl-4 text-sm" style={{ fontFamily: "Georgia, serif", color: COLOR.terracotta }}>
                {block.text}
              </p>
            );
          case "heading":
            return (
              <h2
                key={i}
                className="mt-4 text-xl font-bold leading-snug sm:text-2xl"
                style={{ fontFamily: "Georgia, serif", color: COLOR.accentGreen }}
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={i} className="text-base leading-[1.75]" style={{ fontFamily: "Georgia, serif", color: COLOR.ink }}>
                {block.runs.map((r, j) =>
                  r.bold ? (
                    <strong key={j} className="font-bold">
                      {r.text}
                    </strong>
                  ) : (
                    <span key={j}>{r.text}</span>
                  )
                )}
              </p>
            );
          case "pullParagraph":
            return (
              <p
                key={i}
                className="my-2 border-y py-4 text-lg italic leading-relaxed sm:text-xl"
                style={{ fontFamily: "Georgia, serif", color: COLOR.accentGreen, borderColor: "rgba(45,106,79,0.25)" }}
              >
                {block.text}
              </p>
            );
          case "imageGroup":
            return (
              <div key={i} className={`flex w-full gap-3 ${block.files.length > 1 ? "flex-col sm:flex-row" : "flex-col"}`}>
                {block.files.map((file) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={file}
                    src={`${IMAGE_BASE}/${file}`}
                    alt=""
                    className="w-full min-w-0 flex-1 rounded-lg border border-border object-cover"
                  />
                ))}
              </div>
            );
          case "caption":
            return (
              <p
                key={i}
                className="-mt-2 text-center text-sm italic leading-snug"
                style={{ fontFamily: "Georgia, serif", color: COLOR.ink }}
              >
                {block.text}
              </p>
            );
          case "qaPanel":
            return (
              <div key={i} className="overflow-hidden rounded-lg border border-border">
                <div
                  className="px-4 py-2.5 text-sm font-bold text-white"
                  style={{ fontFamily: "Arial, sans-serif", backgroundColor: COLOR.qaHeaderGreen }}
                >
                  {block.heading}
                </div>
                {block.items.map((item, j) => (
                  <div key={j} style={{ backgroundColor: j % 2 === 0 ? COLOR.qaTint : "#fff" }}>
                    <p
                      className="px-4 pt-3 text-sm font-bold"
                      style={{ fontFamily: "Arial, sans-serif", color: COLOR.qaHeaderGreen }}
                    >
                      Q&nbsp;&nbsp;{item.q}
                    </p>
                    <p className="px-4 pb-3 text-sm" style={{ fontFamily: "Arial, sans-serif", color: COLOR.ink }}>
                      A&nbsp;&nbsp;{item.a}
                    </p>
                  </div>
                ))}
              </div>
            );
          case "closingHeading":
            return (
              <h2
                key={i}
                className="mt-6 border-t-2 pt-4 text-2xl font-bold"
                style={{ fontFamily: "Georgia, serif", color: COLOR.deepGreen, borderColor: COLOR.accentGreen }}
              >
                {block.text}
              </h2>
            );
          case "transition":
            return (
              <p
                key={i}
                className="mt-6 text-center text-sm italic"
                style={{ fontFamily: "Georgia, serif", color: COLOR.transitionGray }}
              >
                <span style={{ color: COLOR.accentGreen }} aria-hidden="true">
                  ✱✱
                </span>
                <br />
                {block.text}
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
