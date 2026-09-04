// Single source of truth for every JSON-LD node on the site.
//
// WHY THIS FILE EXISTS: consumers resolve @id references only WITHIN one page's
// markup -- a bare {"@id": ...} pointing at a node published on another page is
// a dangling reference. So the full business node must appear on every page.
// Four hand-maintained copies would drift, so they are generated from here and
// injected at the <!--AEO-GRAPH--> marker by scripts/build.mjs.
//
// CONTENT RULE: the FAQ text below was moved verbatim out of the page heads.
// It is owner copy. Do not reword it here. If the on-page FAQ changes, change
// it here too -- the same answer is stored in both places.

export const SITE = "https://www.gambletheplumber.net";
export const BUSINESS_ID = SITE + "/#business";
export const WEBSITE_ID = SITE + "/#website";

// Profiles proven to resolve to this business. Verified live 2026-09-04.
// Adding an unverified or conflicting profile is worse than adding none:
// sameAs tells an answer engine to read these records as one entity, so it
// amplifies a contradiction instead of hiding it.
export const SAME_AS = [
  "https://www.google.com/maps/place/?q=place_id:ChIJMTaCvEZhrIkRWFk112PjER0"
  // Facebook (https://www.facebook.com/gambleplumbinghvac/) is HELD until its
  // website field stops pointing at gambletheplumber.com, which 404s.
];

const BUSINESS_CORE = {
    "@type": [
      "Plumber",
      "HVACBusiness"
    ],
    "name": "Gamble Plumbing Inc.",
    "alternateName": "Gamble Plumbing, Heating & Air",
    "url": "https://www.gambletheplumber.net/",
    "telephone": "+1-919-797-5930",
    "image": "https://www.gambletheplumber.net/assets/logo-lockup.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1027 Hwy 70 W, Ste 107",
      "addressLocality": "Garner",
      "addressRegion": "NC",
      "postalCode": "27529",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 35.7014967,
      "longitude": -78.5996979
    },
    "areaServed": [
      "Garner, NC",
      "Raleigh, NC",
      "Durham, NC",
      "Cary, NC",
      "Apex, NC",
      "Holly Springs, NC",
      "Fuquay-Varina, NC",
      "Knightdale, NC",
      "Clayton, NC",
      "Morrisville, NC",
      "Wake Forest, NC",
      "Chapel Hill, NC"
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$",
    "knowsAbout": [
      "Plumbing",
      "Drain cleaning",
      "Water heaters",
      "Leak detection",
      "HVAC",
      "Heating",
      "Air conditioning",
      "Heat pumps"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Plumbing & HVAC Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Plumbing",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Emergency Plumbing"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Drain Cleaning"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Leak Detection"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Water Heaters"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Pipe Services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Fixture Installation"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "HVAC",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Heating & Furnace"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AC Repair & Install"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Heat Pumps"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Duct Cleaning & Sealing"
              }
            }
          ]
        }
      ]
    }
  };

export const business = {
  "@id": BUSINESS_ID,
  ...BUSINESS_CORE,
  sameAs: SAME_AS,
};

export const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE + "/",
  name: BUSINESS_CORE.name,
  publisher: { "@id": BUSINESS_ID },
};

export const webPage = (path, name) => ({
  "@type": "WebPage",
  "@id": SITE + path + "#webpage",
  url: SITE + path,
  name,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": BUSINESS_ID },
});

export const breadcrumb = (path, leaf) => ({
  "@type": "BreadcrumbList",
  "@id": SITE + path + "#breadcrumb",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
    { "@type": "ListItem", position: 2, name: leaf, item: SITE + path },
  ],
});

// mainEntity arrays lifted verbatim from the page heads.
export const FAQ = {
  "/": [
    {
      "@type": "Question",
      "name": "Do you offer emergency service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, during weekdays."
      }
    },
    {
      "@type": "Question",
      "name": "Do you serve residential and commercial properties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve both residential and light commercial properties."
      }
    },
    {
      "@type": "Question",
      "name": "How does quoting work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We only give a quote after our technicians determine a diagnosis. In the event that the quote is rejected, we charge a service call fee. This fee is not applied to the total bill if the quote is accepted and the work is performed."
      }
    },
    {
      "@type": "Question",
      "name": "Are you licensed and insured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are dual-licensed in both plumbing and HVAC."
      }
    },
    {
      "@type": "Question",
      "name": "What is your service area?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve the Raleigh-Durham area and outlying towns."
      }
    }
  ],
  "/plumbing.html": [
    {
      "@type": "Question",
      "name": "What counts as a plumbing emergency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anything actively causing damage or cutting off water entirely. A burst pipe, an overflowing toilet, a sewer backup, a failed water heater, or the smell of gas. The test is simple: if waiting until tomorrow makes it worse, it is an emergency."
      }
    },
    {
      "@type": "Question",
      "name": "How long do main water lines last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on the material. Copper commonly runs 50 years or more, PEX in the range of 40 to 50, and older galvanized steel often 40 to 60 before corrosion narrows it from the inside. Polybutylene is the exception and fails unpredictably. An inspection is the only way to know where a given line stands."
      }
    },
    {
      "@type": "Question",
      "name": "How does quoting work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We only give a quote after our technicians determine a diagnosis. In the event that the quote is rejected, we charge a service call fee. This fee is not applied to the total bill if the quote is accepted and the work is performed."
      }
    }
  ],
  "/hvac.html": [
    {
      "@type": "Question",
      "name": "How do I know if I should repair or replace my system?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Age and repair cost are the two numbers that decide it. Under about 10 to 12 years, a repair usually makes sense. Past that, or once a single repair approaches half the price of a new system, replacement tends to pay for itself in efficiency."
      }
    },
    {
      "@type": "Question",
      "name": "What size AC or heat pump does my house need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It's rather complex actually, moreso than a matter of square-footage. Proper sizing comes from a Manual J load calculation, which accounts for insulation, window area, orientation, and layout. Oversized systems cost more, cycle harder, and leave the air clammy."
      }
    },
    {
      "@type": "Question",
      "name": "How does quoting work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We only give a quote after our technicians determine a diagnosis. In the event that the quote is rejected, we charge a service call fee. This fee is not applied to the total bill if the quote is accepted and the work is performed."
      }
    }
  ],
};

export const faqPage = (path) => ({
  "@type": "FAQPage",
  "@id": SITE + path + "#faq",
  about: { "@id": BUSINESS_ID },
  mainEntity: FAQ[path],
});

// Service nodes. Names come verbatim from BUSINESS_CORE.hasOfferCatalog, so the
// catalog stays the one place a service is named. No descriptions: that is copy.
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const catalogNames = (group) =>
  BUSINESS_CORE.hasOfferCatalog.itemListElement
    .find((c) => c.name === group)
    .itemListElement.map((o) => o.itemOffered.name);

export const serviceList = (path, group) => ({
  "@type": "ItemList",
  "@id": SITE + path + "#services",
  name: group,
  itemListElement: catalogNames(group).map((name, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      "@id": SITE + path + "#service-" + slug(name),
      name,
      serviceType: name,
      provider: { "@id": BUSINESS_ID },
      areaServed: BUSINESS_CORE.areaServed,
    },
  })),
});

// Named on the about page as "Andrew Gamble - Founder" (about-app.jsx:37).
export const founder = {
  "@type": "Person",
  "@id": SITE + "/about.html#owner",
  name: "Andrew Gamble",
  jobTitle: "Founder",
  worksFor: { "@id": BUSINESS_ID },
};

// Every page carries the full business node -- see the @id note at the top.
const PAGES = {
  "index.html": ["/", "Home", null, null],
  "plumbing.html": ["/plumbing.html", "Plumbing", "Plumbing", "Plumbing"],
  "hvac.html": ["/hvac.html", "Heating & Air", "Heating & Air", "HVAC"],
  "about.html": ["/about.html", "About", "About", null],
};

export function graphFor(file) {
  const entry = PAGES[file];
  if (!entry) throw new Error(`No schema graph defined for ${file}`);
  const [path, name, crumb, group] = entry;
  const nodes = [business, website, webPage(path, name)];
  if (crumb) nodes.push(breadcrumb(path, crumb));
  if (FAQ[path]) nodes.push(faqPage(path));
  if (group) nodes.push(serviceList(path, group));
  if (file === "about.html") nodes.push(founder);
  return { "@context": "https://schema.org", "@graph": nodes };
}

export const SCHEMA_PAGES = Object.keys(PAGES);
