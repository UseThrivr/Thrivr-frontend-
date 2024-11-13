interface Link {
  name: string;
  link: string;
}

interface Links {
  heading: string;
  linksArr: Link[];
}

const Links: Links[] = [
  {
    heading: "Company",
    linksArr: [
      { name: "About Us", link: "/link" },
      { name: "Pricing", link: "/link" },
      { name: "Careers", link: "/link" },
      { name: "Contact", link: "/link" },
    ],
  },
  {
    heading: "Resources",
    linksArr: [
      { name: "Tutorials", link: "/link" },
      { name: "Blog", link: "/link" },
      { name: "FAQs", link: "/link" },
      { name: "Support", link: "/link" },
    ],
  },
  {
    heading: "Services",
    linksArr: [
      { name: "Store Setup", link: "/link" },
      { name: "Inventory Mgt", link: "/link" },
      { name: "Marketing Tools", link: "/link" },
      { name: "Analytics", link: "/link" },
      { name: "Shipping", link: "/link" },
    ],
  },
  {
    heading: "Legal",
    linksArr: [
      { name: "Terms of Service", link: "/link" },
      { name: "Privacy Policy", link: "/link" },
      { name: "Cookie Policy", link: "/link" },
    ],
  },
];

export default Links;
