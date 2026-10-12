/**
 * Spoken/text descriptions of pictures that carry information (diagrams, infographics, slides), keyed by the image file
 * name (unique: "chN-…" for chapters, "kpN-…" for Knowledge Papers). ChapterBody uses the description as the picture's
 * text alternative for screen readers, and Read Aloud reads it as "Picture: …" in place of the caption. Photos need no
 * entry: Read Aloud reads their caption. Tables shown as pictures go in chapterTables.ts instead.
 *
 * Added 2026-10-11 at the author's request ("Listen didn't read this?") for a blind reader; recent chapters and papers
 * first, the rest in batches. Describe what the picture shows, with its figures, in plain sentences.
 */
export const IMAGE_DESCRIPTIONS: Record<string, string> = {
  // Chapter 38, Potato
  "ch38-img-02.jpg":
    "Slide: the significance of soil temperature. Temperature affects plants and soil microbes just as it does our bodies. Higher soil temperatures can burn organic matter, bake seeds such as tubers, kill the microbes that convert minerals from a sustainable form to a plant-available form, kill the microbes that protect plants, and evaporate over 80 percent of water. Bare soil has increased atmospheric temperatures by 2 degrees Celsius, a result of soil degradation. In nature, soil is never left bare, except after natural catastrophes or where humans impose their will. Covering soil with organic mulch is an integral part of the natural ecosystem and can reduce soil temperature by up to 35 degrees Celsius.",
  "ch38-img-04.jpg":
    "Diagram of the raised-bed potato production process, drawn over a photo of freshly made beds: seed tubers 6 inches apart, rows 14 inches apart, and the rows 6 inches in from the bed edge. 7 plus 7 is 14, times 6 gives 84 square inches per plant, for a maximum of 54,075 seed tubers per acre of 220 by 198 feet: 50 percent, or 18,025, more plants, and 28 percent more space for each plant.",
  // Chapter 40, Orchards
  "ch40-img-03.jpg":
    "Two photos of the same mango tree. Left, September 2019: a declining tree with sparse, brown, dying leaves on bare, cracked soil. Right, July 2020, on PQNK: the same tree in full, dense, healthy leaf, with new reddish growth, standing in green ground cover.",
  // KP-216, How Much Water Does One Irrigation Use?
  "kp216-img-01.jpg":
    "Scale diagram of the PQNK permanent bed and furrow. The bed is 42 inches across the top and 52 inches at the base, covered with organic mulch: a permanent bed of living, covered soil. Each furrow is 18 inches wide at the top, 8 inches at the bottom and 8 inches deep, and beds repeat every 60 inches, centre to centre. Water stands 4 inches deep in the furrows. Water at a 4-inch head fills 42 square inches of each furrow: 71,953 litres per acre, against 411,161 litres for one 4-inch flood.",
  // KP-218, Why PQNK Sugarcane Tillers From the Inside (Figure 3, the author's illustration, caption built into the picture)
  "kp218-img-03.jpg":
    "Illustration: how a sugarcane stool builds, the mother shoot decides. Left, mother shoot left (conventional): the tall mother shoot, the main cane, stands at the centre, and a red arrow shows auxin from its tip holding the central buds at its base; tillers of later generations, numbered 1, 2 and 3, emerge further and further out, of mixed ages and heights, with the young outer ones shaded and many dying. Right, mother shoot cut (PQNK): the mother shoot is cut to a stump at the centre, and tillers of one age, uniform in height and girth, rise together from the buds at the centre of the stool, with roots spreading through living soil below and mulch and green cover on the surface.",
};
