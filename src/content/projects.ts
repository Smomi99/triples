/**
 * Delivered work, taken from the project gallery on the previous site.
 *
 * These are the only projects the company has published. No others are added,
 * and no client names, contract values or dates are invented. Where the
 * original caption noted a qualifier — joint venture, third-party licence,
 * under construction — that qualifier is preserved rather than dropped, since
 * removing it would overstate the company's role.
 *
 * Two of the supplied images are 3D architectural renders rather than
 * photographs of finished buildings. They are marked as such and labelled in
 * the interface: showing a render as if it were a photograph of completed work
 * would misrepresent what has actually been built.
 */

export type ProjectImage = {
  src: string;
  alt: string;
  kind?: "photograph" | "render";
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  scope: string;
  discipline: string;
  /** Division slug this work sits under. */
  division: string;
  note?: string;
  status: "Delivered" | "Under construction";
  image?: ProjectImage;
  /** Additional imagery of the same project. */
  gallery?: ProjectImage[];
};

export const projects: Project[] = [
  {
    slug: "payra-port-jetty-lighting",
    title: "Payra Port jetty lighting",
    client: "Payra Port",
    scope: "High-mast poles with flood lighting",
    discipline: "Industrial lighting",
    division: "electronics",
    status: "Delivered",
    image: {
      src: "/images/projects/payra-jetty-lighting.jpg",
      alt: "Technicians fitting flood light arrays to a high-mast pole at Payra Port",
      kind: "photograph",
    },
    gallery: [
      {
        src: "/images/projects/payra-jetty-lighting-2.jpg",
        alt: "A high-mast flood light lit at dusk over the jetty apron at Payra Port",
        kind: "photograph",
      },
    ],
  },
  {
    slug: "payra-port-street-lighting",
    title: "Payra Port street lighting",
    client: "Payra Port",
    scope: "Roadway lighting installation",
    discipline: "Industrial lighting",
    division: "electronics",
    status: "Delivered",
    image: {
      src: "/images/projects/payra-street-lighting-2.jpg",
      alt: "Street lighting columns lit at dusk along a newly built road at Payra Port",
      kind: "photograph",
    },
    gallery: [
      {
        src: "/images/projects/payra-street-lighting.jpg",
        alt: "Ground works at dusk beside the Payra Port road, with street lighting beyond",
        kind: "photograph",
      },
    ],
  },
  {
    slug: "payra-port-warehouse-racking",
    title: "Payra Port warehouse racking",
    client: "Payra Port",
    scope: "Warehouse racking system",
    discipline: "Warehousing",
    division: "business-hub",
    status: "Delivered",
    image: {
      src: "/images/projects/payra-warehouse-racking-2.jpg",
      alt: "Blue and orange steel racking bays running the depth of the Payra Port warehouse",
      kind: "photograph",
    },
    gallery: [
      {
        src: "/images/projects/payra-warehouse-racking.jpg",
        alt: "Interior of the Payra Port warehouse with racking installed along both walls",
        kind: "photograph",
      },
    ],
  },
  {
    slug: "payra-port-multipurpose-building",
    title: "Payra Port multipurpose building",
    client: "Payra Port",
    scope: "Multipurpose building",
    discipline: "Construction",
    division: "business-hub",
    status: "Delivered",
    note: "Delivered as a joint venture project.",
    image: {
      src: "/images/projects/payra-multipurpose-building.jpg",
      alt: "Architectural render of the multipurpose building at Payra Port",
      kind: "render",
    },
  },
  {
    slug: "payra-port-officer-dormitory",
    title: "Payra Port officer dormitory",
    client: "Payra Port",
    scope: "Officer accommodation building",
    discipline: "Construction",
    division: "business-hub",
    status: "Delivered",
    note: "Delivered under a third-party licence.",
    image: {
      src: "/images/projects/payra-officer-dormitory.jpg",
      alt: "Architectural render of the officer dormitory at Payra Port",
      kind: "render",
    },
  },
  {
    slug: "payra-port-street-lighting-extension",
    title: "Payra Port street lighting — 5 km extension",
    client: "Payra Port",
    scope: "Five kilometres of roadway lighting",
    discipline: "Industrial lighting",
    division: "electronics",
    status: "Under construction",
    note: "In progress at the time of the company's last published update.",
  },
  {
    slug: "akh-knitting-dyeing-factory-lighting",
    title: "AKH Knitting & Dyeing factory lighting",
    client: "AKH Knitting & Dyeing Ltd",
    scope: "Garments factory lighting",
    discipline: "Industrial lighting",
    division: "electronics",
    status: "Delivered",
    image: {
      src: "/images/projects/akh-factory-lighting-2.jpg",
      alt: "Overhead tube lighting above the sewing lines on the AKH Knitting & Dyeing production floor",
      kind: "photograph",
    },
    gallery: [
      {
        src: "/images/projects/akh-factory-lighting.jpg",
        alt: "The AKH Knitting & Dyeing factory building",
        kind: "photograph",
      },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.image).slice(0, 6);
