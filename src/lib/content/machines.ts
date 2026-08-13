export interface RelatedLink {
  label: string;
  href: string;
}

export interface Machine {
  slug: string;
  title: string;
  /** Short form used in nav/breadcrumbs and inline text — e.g. "SIPP". */
  shortName: string;
  /** Full expansion of an abbreviation, e.g. "Slit Insertion Precision Planter". Omit for non-abbreviated machines. */
  fullName?: string;
  /** One-time correction/establishment work vs. machinery used every production cycle. */
  category: "transition" | "periodic";
  /** One-sentence purpose, used on both the overview card and the individual page. */
  summary: string;
  /** Short paragraph for the overview page card — kept brief by design; full depth lives on the individual page. */
  overviewBlurb: string;
  image?: string;
  /** Optional: a YouTube video ID demonstrating this machine. */
  videoId?: string;
  /** Optional: a self-hosted video file path (used when no YouTube link exists). */
  videoFile?: string;
  /** C. Why the machine is needed — the biological/agronomic problem. */
  whyNeeded: string[];
  /** D. Operating principle — what the machine physically does. */
  operatingPrinciple: string[];
  /** E. Relationship to PQNK — which natural-system principle it enables or protects. */
  pqnkRelationship: string[];
  /** F. Engineering characteristics — only specifications already documented elsewhere on the site. */
  engineeringCharacteristics?: string[];
  /** G. Field operation — when/how it's used within the PQNK sequence. */
  fieldOperation: string[];
  /** H. Related PQNK concepts. */
  relatedConcepts: RelatedLink[];
  /** I. Related evidence / further reading. */
  furtherReading?: RelatedLink[];
}

export const machinePhilosophy: string[] = [
  "Nature establishes the biological principles: no soil disturbance, no inundation, permanent biological cover, maximum biodiversity. PQNK identifies what a production system must do to protect those principles at field scale. Engineering exists to carry that out, each machine on this page is the means of applying a principle, not an end in itself. PQNK is not machinery-led agriculture: the machinery exists because conventional equipment generally assumes tillage, exposed soil and repeated seedbed preparation, practices incompatible with a permanent biological system.",
  "A century of agricultural engineering optimized machines for how much soil they could move, plough, or pulverize. PQNK asks a different question of every machine: does it strengthen ecological function, or weaken it? Misapplied machinery, not mechanization itself, is what degrades a field.",
  "PQNK machinery therefore splits into two families. Transition machinery corrects damage inherited from conventional farming, hardpan compaction, unstructured fields, and is designed to be used once, or as rarely as possible. Maintenance machinery supports an ecosystem that is already functioning, planting, mulching, and light upkeep, and its footprint shrinks year after year as the field increasingly does its own work.",
  "This maps directly onto PQNK's transition sequence. Transition machinery is what physically drives a field out of ACI (Ancient Conventional Industrial) degradation and into the regenerative phase, breaking the hardpan, shaping the permanent beds. Maintenance machinery is what a field needs once it reaches the closed-loop, self-sustaining state, and even that need keeps shrinking as the ecosystem takes over its own upkeep.",
];

export const machines: Machine[] = [
  {
    slug: "hardpan-breaker",
    title: "The Hardpan Breaker",
    shortName: "Hardpan Breaker",
    category: "transition",
    summary: "The most important machine in the transition is the one used the least.",
    overviewBlurb:
      "Reopens the compacted layer beneath the topsoil once, restoring the vertical connectivity roots, water and biology need — a one-time transition operation, not routine tillage.",
    image: "/images/machines/hardpan-breaker-subsoiler-v2.jpg",
    whyNeeded: [
      "Decades of tillage, traffic, and flood irrigation compress a dense layer beneath the topsoil that roots, water, and air can no longer cross. Because the damage sits below the depth of normal cultivation, it stays hidden, farmers see declining yields and respond with more fertilizer or more irrigation, never touching the actual restriction.",
      "The most common tillage tool, a spring-tine cultivator, only reaches the upper 4–6 inches of soil, and its spring-loaded tine has a smearing action that compacts the soil immediately below the tilled layer rather than breaking it up. Disc or mouldboard ploughs go somewhat deeper, roughly 8–10 inches, but the same compaction recurs beneath whatever depth the implement reaches. The resulting hardpan's depth and density therefore depend on the tillage implement used, tractor weight, and number of passes over time, it is not the same in every field.",
    ],
    operatingPrinciple: [
      "The hardpan breaker's job is narrow and specific: reopen the compacted layer once, restoring vertical connectivity between the surface and the deeper soil profile. It is not a tillage tool and does not invert or pulverize the soil, it simply removes the barrier so roots, water, air, and biology can reach the full profile again.",
    ],
    pqnkRelationship: [
      "This is a transition operation, not a routine one. Once the profile is open and the field is managed to preserve that connectivity, roots and soil biology take over the job of maintaining it. Repeating the operation unnecessarily would undo the very structure it was meant to restore.",
    ],
    engineeringCharacteristics: [
      "A subsoiler tool, used to shatter the compacted layer without inverting the soil.",
      "Because hardpan depth varies by field, tillage history, tractor weight and number of passes, PQNK recommends digging a pit on each field to check where the hardpan actually sits before setting the subsoiler's working depth.",
      "A working depth of up to 24 inches is commonly used as a safety margin, to make sure the subsoiler reaches below the hardpan even where its exact depth is uncertain, not as a fixed depth required on every field.",
    ],
    fieldOperation: [
      "Carried out once, before the first planting on a given plot, wherever compaction is present — not repeated season after season once the profile is open.",
    ],
    relatedConcepts: [
      { label: "Breaking the Hardpan (technique)", href: "/resources/breaking-the-hardpan" },
      { label: "Raised Bed Shaper", href: "/machines/raised-bed-shaper" },
    ],
    furtherReading: [
      {
        label: "PQNK: The Wholesale Four-Step System to Reconnect the Water Cycle and End Water Scarcity",
        href: "/papers/the-wholesale-four-step-system-to-end-water-scarcity",
      },
    ],
  },
  {
    slug: "raised-bed-shaper",
    title: "The Raised Bed Shaper",
    shortName: "Raised Bed Shaper",
    category: "transition",
    summary: "One pass of engineering that establishes decades of permanent farm architecture.",
    overviewBlurb:
      "Forms the permanent bed-and-furrow geometry the whole production system runs on — shaped once, never rebuilt through routine tillage.",
    image: "/images/machines/raised-bed-shaper-with-profile.jpg",
    whyNeeded: [
      "Conventional ridging is rebuilt every season: the same ground is repeatedly reshaped and run over by machinery. A growing zone that never stabilizes can't build the permanent soil structure a living ecosystem depends on. Unlike conventional ridging, the PQNK bed is not made for a single crop, it is made for an ecosystem.",
    ],
    operatingPrinciple: [
      "The raised bed shaper builds horizontal organization in a single pass: permanent beds with fixed furrows and traffic corridors, engineered so that wheels always run in the furrows and never on the growing bed.",
      "The machine's job is completed in a matter of hours; its consequences last for decades. Once shaped, the bed fixes where water moves, where roots explore, and where machinery travels, so that season after season, operations happen within that architecture instead of reconstructing it.",
    ],
    pqnkRelationship: [
      "That permanence is the point. Biological continuity depends on physical continuity: a field that is not rebuilt every year can invest in long-term soil structure instead of starting over each season.",
    ],
    engineeringCharacteristics: [
      "Typical bed width: 42 inches, with 18-inch furrows.",
      "Furrow spacing is matched to standard tractor wheel track, so wheels always run in the furrow, never on the growing bed.",
      "Bed and furrow dimensions can be adjusted to match different tractor tracks or crop spacing needs — the fixed, uncompacted growing zone principle stays constant across configurations, so no single dimension set is universally mandatory.",
    ],
    fieldOperation: [
      "Formed once, after the hardpan has been broken and any soil chemistry correction completed, before the first crop is planted on a given plot.",
    ],
    relatedConcepts: [
      { label: "The PQNK Raised Bed System (technique)", href: "/resources/permanent-raised-beds" },
      { label: "Hardpan Breaker", href: "/machines/hardpan-breaker" },
      { label: "Mulcher & Bed Renovator", href: "/machines/mulcher-bed-renovator" },
    ],
  },
  {
    slug: "sipp-planter",
    title: "SIPP — Slit Insertion Precision Planter",
    shortName: "SIPP",
    fullName: "Slit Insertion Precision Planter",
    category: "periodic",
    summary: "Plants through thick organic mulch by opening a pocket no larger than the seed itself.",
    overviewBlurb:
      "Opens a discrete pocket per seed, sized to the seed rather than the machine, so planting never means disturbing the mulch and soil around it.",
    image: "/images/machines/sipp-planter-labeled.jpg",
    videoId: "OyWdBXKH-qQ",
    whyNeeded: [
      "A PQNK field at planting time is not bare soil. It carries a thick organic mulch cover, intact root channels from the previous crop, and living fungal networks, exactly the conditions PQNK exists to protect. Conventional planters, built for cleared and cultivated ground, either fail in this environment or force growers to disturb it before planting.",
      "Conventional openers also place seed inside a single continuous slit or furrow, a geometry with no precedent in natural seed dispersal. No wild plant drops its seed into a straight, uninterrupted line — nature scatters seed into pockets of varying depth and spacing.",
    ],
    operatingPrinciple: [
      "SIPP was engineered to plant into the field as it actually exists. Rather than a continuous furrow, it opens a discrete, roughly 2\"×2\" pocket per seed, cutting cleanly through the mulch layer without dragging residue into the seed zone. The disturbance is sized to the seed, not to the machine.",
    ],
    pqnkRelationship: [
      "The result: surface residue, root channels, and soil structure all stay in place around the new seed. The crop germinates into an already-established ecosystem rather than a reconstructed one, preserving the biological capital the field built up over previous seasons.",
    ],
    engineeringCharacteristics: [
      "Seed placement pocket: roughly 2\"×2\" per seed, a discrete pocket rather than a continuous slit.",
      "Cuts cleanly through thick mulch without dragging residue into the seed zone.",
    ],
    fieldOperation: [
      "Used at planting, every season, directly through the mulch layer on an already-established permanent bed — periodic, maintenance-stage machinery, distinct from the one-time hardpan-breaking and bed-shaping steps that precede it.",
    ],
    relatedConcepts: [
      { label: "VIPP — Vertical Insertion Precision Planter", href: "/machines/vipp-planter" },
      { label: "Mulch and No-Till Planting (technique)", href: "/resources/mulch-and-no-till" },
      { label: "Raised Bed Shaper", href: "/machines/raised-bed-shaper" },
    ],
    furtherReading: [{ label: "The Evolution of Seed Placement", href: "/papers/the-evolution-of-seed-placement" }],
  },
  {
    slug: "vipp-planter",
    title: "VIPP — Vertical Insertion Precision Planter",
    shortName: "VIPP",
    fullName: "Vertical Insertion Precision Planter",
    category: "periodic",
    summary: "A vertical beak that touches the bed only at the exact point a seed needs to go.",
    overviewBlurb:
      "Presses seed straight down through mulch and soil at a single point, rather than cutting along a line — a vertical alternative to SIPP's slit.",
    image: "/images/machines/vipp-hand-pushed.jpg",
    videoId: "dQBg5luBgEQ",
    whyNeeded: [
      "Like SIPP, VIPP exists because conventional planters assume bare, cultivated ground. Where field conditions or crop requirements favor a vertical opener over a slit, VIPP solves the same mulch-planting problem from a different angle.",
    ],
    operatingPrinciple: [
      "Instead of cutting a slit, a narrow, cone-shaped beak moves straight down through the mulch and soil, opens a single placement point, deposits the seed at the set depth, and withdraws. The field isn't sliced open along a line, it's touched only where a seed is actually needed.",
      "Because it enters vertically rather than dragging horizontally, VIPP handles thick residue without the hairpinning and blockage that trips up conventional openers, so the mulch layer keeps doing its job of buffering temperature, holding moisture, and feeding soil biology.",
    ],
    pqnkRelationship: [
      "SIPP and VIPP solve the same PQNK requirement, planting directly through mulch on a permanent bed without inverting or disturbing the soil, from two different engineering directions: slit insertion and vertical insertion. VIPP is not a variant of SIPP; it is a distinct opener design built on the same underlying principle of minimizing disturbance.",
    ],
    engineeringCharacteristics: [
      "Vertical, cone-shaped insertion point — a narrow beak that presses straight down rather than dragging a horizontal slit.",
      "Exists in two confirmed forms: a mechanized version, and a light, hand-pushed prototype built for smallholders who can't justify heavy no-till equipment. Whether mechanized or hand-operated, the underlying vertical-insertion principle is unchanged.",
    ],
    fieldOperation: [
      "Used at planting, every season, directly through the mulch layer on an already-established permanent bed — periodic, maintenance-stage machinery, like SIPP.",
    ],
    relatedConcepts: [
      { label: "SIPP — Slit Insertion Precision Planter", href: "/machines/sipp-planter" },
      { label: "Mulch and No-Till Planting (technique)", href: "/resources/mulch-and-no-till" },
      { label: "Raised Bed Shaper", href: "/machines/raised-bed-shaper" },
    ],
    furtherReading: [{ label: "The Evolution of Seed Placement", href: "/papers/the-evolution-of-seed-placement" }],
  },
  {
    slug: "mulcher-bed-renovator",
    title: "The Mulcher & Bed Renovator",
    shortName: "Mulcher & Bed Renovator",
    category: "periodic",
    summary:
      "One dual-purpose implement: turns crop residue into future fertility, then keeps the permanent bed architecture precise for years.",
    overviewBlurb:
      "A dual-purpose implement: processes residue into surface mulch after harvest, then switches to correcting minor wear in the permanent bed architecture.",
    image: "/images/machines/bed-renovator.jpg",
    videoFile: "/videos/mulcher-flail-mowing.mp4",
    whyNeeded: [
      "Conventional agriculture treats post-harvest residue as an obstacle: burned, removed, or buried out of the way. PQNK treats it as future soil — the same logic a forest applies to its own fallen leaves.",
      "Even a permanent bed system experiences minor wear over time: rainfall reshapes furrow edges, and machinery traffic gradually affects corridors.",
    ],
    operatingPrinciple: [
      "In mulching mode, this implement reduces and evenly distributes residue so it stays in contact with the soil surface, where microbes, fungi, and earthworms can break it down without removing that organic matter from the field. The machine performs a brief operation; biology carries on the transformation for months afterward, compounding into reduced surface temperature swings, lower evaporation, better infiltration, and a steady feed of carbon and nutrients back into the system.",
      "In its other role, the same implement maintains the permanent bed architecture the raised bed shaper first established. Switched to bed-renovation mode, it corrects only the specific portions that need it, restoring the original architecture's precision without reconstructing the field.",
    ],
    pqnkRelationship: [
      "Whichever job it is doing, it is a maintenance machine, not a construction or cultivation one, closer to a conservation engineer than a builder. As a PQNK system matures and its accumulated root channels, carbon reserves, and biological structure become more valuable, this precision matters more, not less. Mulch is returned to the surface, never incorporated into the soil by tillage — surface retention is fundamental to what the mulch layer does.",
    ],
    fieldOperation: [
      "Mulching mode runs after harvest, processing standing residue into surface cover ahead of the next no-till planting pass. Bed-renovation mode runs periodically, as needed, to correct minor wear in the permanent bed architecture rather than on a fixed schedule.",
    ],
    relatedConcepts: [
      { label: "Mulch and No-Till Planting (technique)", href: "/resources/mulch-and-no-till" },
      { label: "Raised Bed Shaper", href: "/machines/raised-bed-shaper" },
      { label: "SIPP — Slit Insertion Precision Planter", href: "/machines/sipp-planter" },
    ],
  },
];

export const getMachineBySlug = (slug: string) => machines.find((m) => m.slug === slug);
