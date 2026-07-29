export interface FounderPhoto {
  slug: string;
  image: string;
  date: string;
  caption: string;
}

export interface FounderGalleryEra {
  era: string;
  note: string;
  photos: FounderPhoto[];
}

export const founderGallery: FounderGalleryEra[] = [
  {
    era: "Origins",
    note: "The engineering career before PQNK existed.",
    photos: [
      {
        slug: "sugarcane-1977",
        image: "/images/founder/sugarcane_1977.jpg",
        date: "1977",
        caption: "Harvesting sugarcane with the operational team — the earliest record in Pedaver's archive.",
      },
      {
        slug: "ford-tractors",
        image: "/images/founder/ford_tractors.jpg",
        date: "1977–80s",
        caption: "Progressive manufacturing of Ford tractors, early in Sharif's engineering career.",
      },
      {
        slug: "pm-nawaz-award",
        image: "/images/founder/pm_nawaz_award.jpg",
        date: "1990s",
        caption: "Prime Minister Nawaz Sharif presents an award for establishing the pioneer seed plant in Sahiwal.",
      },
    ],
  },
  {
    era: "Research & Institutional Ties",
    note: "The collaborations that shaped PQNK's science.",
    photos: [
      {
        slug: "norman-uphoff-cornell",
        image: "/images/founder/norman_uphoff_cornell.jpg",
        date: "2010s",
        caption: "With Prof. Norman Uphoff at Cornell University, whose SRI research fed directly into PQNK.",
      },
      {
        slug: "ztbl-board",
        image: "/images/founder/ztbl_board.jpg",
        date: "2010s",
        caption: "ZTBL staff training, Sharif serving as a board member.",
      },
    ],
  },
  {
    era: "The Policy Push",
    note: "2019–2020: taking PQNK to government, academia, and farmers directly.",
    photos: [
      {
        slug: "pm-imran-khan-sofa",
        image: "/images/founder/pm_imran_khan_sofa.jpg",
        date: "2019",
        caption: "Explaining PQNK directly to Prime Minister Imran Khan.",
      },
      {
        slug: "uni-agri-peshawar",
        image: "/images/founder/uni_agri_peshawar.jpg",
        date: "Jul 2019",
        caption: "Talk to academia on PQNK at the University of Agriculture, Peshawar.",
      },
      {
        slug: "farmers-training-lahore",
        image: "/images/founder/farmers_training_lahore.jpg",
        date: "Aug 2019",
        caption: "Farmer training session, Lahore.",
      },
      {
        slug: "citrus-research-sarghoda",
        image: "/images/founder/citrus_research_sarghoda.jpg",
        date: "Sep 2019",
        caption: "Lecture at the Citrus Research Institute, Sargodha.",
      },
      {
        slug: "oic-fao-green-growth",
        image: "/images/founder/oic_fao_green_growth.jpg",
        date: "Dec 2019",
        caption: "OIC & FAO international conference on Green Growth.",
      },
      {
        slug: "lums-mit-field-day",
        image: "/images/founder/lums_mit_field_day.jpg",
        date: "Jan 2020",
        caption: "Field day with the LUMS team and Prof. James Wescoat of MIT.",
      },
      {
        slug: "pansota-aepf-delegates",
        image: "/images/founder/pansota_aepf_delegates.jpg",
        date: "Feb 2020",
        caption: "Twenty AEPF foreign delegates and over 100 Pakistani farmers visit Pansota Farm.",
      },
    ],
  },
  {
    era: "Recognition",
    note: "2021–2023: PQNK reaching institutions and print.",
    photos: [
      {
        slug: "pm-imran-khan-2021",
        image: "/images/founder/pm_imran_khan_2021.jpg",
        date: "Jun 2021",
        caption: "A second meeting with Prime Minister Imran Khan.",
      },
      {
        slug: "training-participants-2021",
        image: "/images/founder/training_participants_2021.jpg",
        date: "Dec 2021",
        caption: "PQNK training program participants.",
      },
      {
        slug: "book-launch-babar-ali",
        image: "/images/founder/book_launch_babar_ali.jpg",
        date: "Dec 2023",
        caption: "Book launch with Syed Babar Ali, Chairman of LUMS.",
      },
    ],
  },
];
