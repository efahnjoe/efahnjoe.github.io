export const SITE = {
  website: "https://efahnjoe.github.io/", // replace this with your deployed domain
  author: "Sat Naing",
  profile: "https://www.github.com/efahnjoe//",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/efahnjoe/efahnjoe.github.io/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en-US", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Hong_Kong", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
