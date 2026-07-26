export interface Machine {
  slug: string;
  title: string;
  summary: string;
  body: string[];
}

export const machinePhilosophy: string[] = [
  "A century of agricultural engineering optimized machines for how much soil they could move, plough, or pulverize. PQNK asks a different question of every machine: does it strengthen ecological function, or weaken it? Misapplied machinery, not mechanization itself, is what degrades a field.",
  "PQNK machinery therefore splits into two families. Transition machinery corrects damage inherited from conventional farming, hardpan compaction, unstructured fields, and is designed to be used once, or as rarely as possible. Maintenance machinery supports an ecosystem that is already functioning, planting, mulching, and light upkeep, and its footprint shrinks year after year as the field increasingly does its own work.",
  "This maps directly onto PQNK's transition sequence. Transition machinery is what physically drives a field out of ACI (Ancient Conventional Industrial) degradation and into the regenerative phase, breaking the hardpan, shaping the permanent beds. Maintenance machinery is what a field needs once it reaches the closed-loop, self-sustaining state, and even that need keeps shrinking as the ecosystem takes over its own upkeep.",
];

export const machines: Machine[] = [
  {
    slug: "hardpan-breaker",
    title: "The Hardpan Breaker",
    summary: "The most important machine in the transition is the one used the least.",
    body: [
      "Decades of tillage, traffic, and flood irrigation compress a dense layer beneath the topsoil that roots, water, and air can no longer cross. Because the damage sits below the depth of normal cultivation, it stays hidden, farmers see declining yields and respond with more fertilizer or more irrigation, never touching the actual restriction.",
      "The hardpan breaker's job is narrow and specific: reopen the compacted layer once, restoring vertical connectivity between the surface and the deeper soil profile. It is not a tillage tool and does not invert or pulverize the soil, it simply removes the barrier so roots, water, air, and biology can reach the full profile again.",
      "This is a transition operation, not a routine one. Once the profile is open and the field is managed to preserve that connectivity, roots and soil biology take over the job of maintaining it. Repeating the operation unnecessarily would undo the very structure it was meant to restore.",
    ],
  },
  {
    slug: "raised-bed-shaper",
    title: "The Raised Bed Shaper",
    summary: "One pass of engineering that establishes decades of permanent farm architecture.",
    body: [
      "Where the hardpan breaker restores vertical connectivity, the raised bed shaper builds horizontal organization: permanent 42-inch beds with fixed furrows and traffic corridors. Unlike conventional ridging, which is rebuilt every season, the PQNK bed is not made for a single crop, it is made for an ecosystem.",
      "The machine's job is completed in a matter of hours; its consequences last for decades. Once shaped, the bed fixes where water moves, where roots explore, and where machinery travels, so that season after season, operations happen within that architecture instead of reconstructing it.",
      "That permanence is the point. Biological continuity depends on physical continuity: a field that is not rebuilt every year can invest in long-term soil structure instead of starting over each season.",
    ],
  },
  {
    slug: "sipp-planter",
    title: "SIPP — Slit Insertion Precision Planter",
    summary: "Plants through thick organic mulch by opening a pocket no larger than the seed itself.",
    body: [
      "A PQNK field at planting time is not bare soil. It carries a thick organic mulch cover, intact root channels from the previous crop, and living fungal networks, exactly the conditions PQNK exists to protect. Conventional planters, built for cleared and cultivated ground, either fail in this environment or force growers to disturb it before planting.",
      "SIPP was engineered to plant into the field as it actually exists. Rather than a continuous furrow, it opens a discrete, roughly 2\"×2\" pocket per seed, cutting cleanly through the mulch layer without dragging residue into the seed zone. The disturbance is sized to the seed, not to the machine.",
      "The result: surface residue, root channels, and soil structure all stay in place around the new seed. The crop germinates into an already-established ecosystem rather than a reconstructed one, preserving the biological capital the field built up over previous seasons.",
    ],
  },
  {
    slug: "vipp-planter",
    title: "VIPP — Vertical Insertion Precision Planter",
    summary: "A vertical beak that touches the bed only at the exact point a seed needs to go.",
    body: [
      "VIPP solves the same problem from a different angle: instead of cutting a slit, a narrow beak moves straight down through the mulch and soil, opens a single placement point, deposits the seed at the set depth, and withdraws. The field isn't sliced open along a line, it's touched only where a seed is actually needed.",
      "Because it enters vertically rather than dragging horizontally, VIPP handles thick residue without the hairpinning and blockage that trips up conventional openers, so the mulch layer keeps doing its job of buffering temperature, holding moisture, and feeding soil biology.",
      "VIPP also exists in a light, hand-pushed prototype, built for smallholders who can't justify heavy no-till equipment. Whether mechanized or hand-operated, the underlying principle is unchanged: vertical seed placement with the least possible disturbance to the living bed beneath it.",
    ],
  },
  {
    slug: "mulcher",
    title: "The Mulcher",
    summary: "Turns crop residue back into the soil's own future fertility, instead of waste to be cleared.",
    body: [
      "Conventional agriculture treats post-harvest residue as an obstacle: burned, removed, or buried out of the way. PQNK treats it as future soil. A forest doesn't export its fallen leaves; the mulcher applies that same logic to farmland.",
      "It reduces and evenly distributes residue so it stays in contact with the soil surface, where microbes, fungi, and earthworms can break it down, without removing that organic matter from the field. The machine performs a brief operation; biology carries on the transformation for months afterward.",
      "The payoff compounds: reduced surface temperature swings, lower evaporation, better infiltration, and a steady feed of carbon and nutrients back into the system the crop that produced the residue came from.",
    ],
  },
  {
    slug: "precision-weeding-and-aeration",
    title: "Precision Weeding & Aeration",
    summary: "Targeted, occasional assistance to the field, not routine cultivation of it.",
    body: [
      "Conventional weed control assumes the soil must be worked. PQNK starts from the opposite premise: disturbance has to earn its place, and repeated cultivation destroys biological channels and fungal networks in exchange for temporary weed suppression.",
      "Precision weeding and aeration intervene only at specific points, leaving permanent beds, protected biological zones, and surface mulch intact. It's assistance during a transition, not a routine, and its use is expected to decline as the field's own roots and biology take over structuring and self-regulation.",
    ],
  },
  {
    slug: "bed-renovator",
    title: "The Bed Renovator",
    summary: "Maintains the permanent architecture over years, without ever rebuilding the field.",
    body: [
      "Even a permanent bed system experiences minor wear: rainfall reshapes furrow edges, machinery traffic gradually affects corridors. The bed renovator corrects only the specific portions that need it, restoring the original architecture's precision without reconstructing the field.",
      "It is a maintenance machine, not a construction or cultivation one, closer to a conservation engineer than a builder. As a PQNK system matures and its accumulated root channels, carbon reserves, and biological structure become more valuable, this precision matters more, not less.",
    ],
  },
];

export const getMachineBySlug = (slug: string) => machines.find((m) => m.slug === slug);
