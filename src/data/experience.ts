export interface Role {
  title: string;
  period: string;
  summary?: string;
  highlights: string[];
  current?: boolean;
}

export interface Company {
  name: string;
  location: string;
  description?: string;
  logo: string;
  dateRange: string;
  roles: Role[];
}

export const companies: Company[] = [
  {
    name: "Trezor",
    location: "Prague, Czechia",
    description: "The original hardware wallet company. Pioneering secure, open-source self-custody for Bitcoin and crypto since 2014.",
    logo: "/trezor-logo.webp",
    dateRange: "09/2023 - Present",
    roles: [
      {
        title: "Product Marketing Lead",
        period: "07/2024 – Present",
        highlights: [
          "Function Leadership: Built the Product marketing department from the ground up, now managing a team of product marketers, technical writers, and copywriters.",
          "GTM & Launches: Leading global go-to-market execution for hardware and software launches, ensuring alignment between product development and commercial release.",
          "Storytelling: Owning global positioning and messaging strategy, making high-stakes security features and open-source transparency accessible to a global audience.",
          "Market Analysis: Researching new segments and competitive trends to help find growth opportunities for self-custody.",
        ],
        current: true,
      },
      {
        title: "Senior Product Marketing Manager",
        period: "09/2023 – 06/2024",
        highlights: [
          "Founding PMM: Joined as the first product marketer to build the function from scratch.",
          "Frameworks: Created the company's first standardized processes for positioning, messaging, and launches.",
          "Major Launches: Led two Tier 1 global launches across both hardware and software categories.",
        ],
      },
    ],
  },
  {
    name: "Product Marketing Alliance",
    location: "Prague, Czechia",
    description: "The world's largest product marketing community, empowering PMMs through certifications, resources, and events.",
    logo: "/product-marketing-alliance-logo.avif",
    dateRange: "03/2023 - Present",
    roles: [
      {
        title: "Chapter Lead",
        period: "11/2023 – Present",
        highlights: [
          "Community Building: Founded the first PMA chapter in the Czech Republic, building a network for local product marketers.",
          "Events & Growth: Organizing initiatives to share knowledge and elevate the craft of PMM in the Prague tech scene.",
        ],
        current: true,
      },
      {
        title: "Brand Ambassador",
        period: "03/2023 – 11/2023",
        highlights: [
          "Community Outreach: Helped grow the PMA's footprint in the CEE region by sharing insights and connecting with the global PMM community.",
          "Content & Engagement: Contributed to discussions and professional initiatives to help elevate the craft of product marketing.",
        ],
      },
    ],
  },
  {
    name: "GoodData",
    location: "Prague, Czechia",
    description: "A leading analytics platform enabling businesses to build and embed customizable BI dashboards at scale.",
    logo: "/gooddata-logo.webp",
    dateRange: "01/2021 - 09/2023",
    roles: [
      {
        title: "Senior Technical Product Marketing Manager",
        period: "09/2022 – 09/2023",
        summary: "I was responsible for making GoodData's cloud analytics platform and API-first architecture make sense to both developers and business buyers.",
        highlights: [
          "Messaging: Defined the positioning and messaging strategies to help the GoodData platform stand out in a crowded market.",
          "Technical Content: Created the demos, webinars, and articles that explained \"Analytics as Code\" and \"API-first analytics\" to both developers and executives.",
          "User Adoption: Worked with the Product and UX teams to improve the trial experience and increase inbound lead volume.",
        ],
      },
      {
        title: "Product Marketing Manager",
        period: "01/2021 – 08/2022",
        highlights: [
          "Cloud-Native Launch: Led product marketing for GoodData's new self-hosted analytics platform across AWS, GCP, and Azure.",
          "Analyst Relations: Worked with C-level leadership to deliver product briefings and demos to firms like Gartner and Forrester.",
          "Demand Gen: Created the eBooks, videos, and campaign assets that fueled the product's initial growth phase.",
        ],
      },
    ],
  },
  {
    name: "Wunderman Thompson",
    location: "Prague, Czechia",
    description: "A global creative agency combining creativity and technology to deliver marketing solutions for top brands.",
    logo: "/wunderman-thompson-logo.webp",
    dateRange: "05/2017 - 12/2020",
    roles: [
      {
        title: "Web Tagging Team Lead",
        period: "10/2019 – 12/2020",
        summary: "I managed the daily operations of the web tagging team, making sure data collection was accurate across Ford's global web properties and 22 national portals.",
        highlights: [
          "Team Operations: Managed a specialist team and our internal QA processes for analytics tags.",
          "Stakeholder Management: Acted as the main contact for Ford of Europe to handle digital tagging and technical compliance.",
          "Media Compliance: Reviewed media plans to ensure all digital assets met our technical and tracking standards.",
        ],
      },
      {
        title: "Lead Management Specialist",
        period: "02/2019 – 10/2019",
        highlights: [
          "Performance Growth: Optimized lead management for over 450 dealerships, with top markets seeing growth exceed 105%.",
          "System Rollout: Supported the European launch of a Microsoft Dynamics lead system, including training for over 1,200 users.",
          "Data Analysis: Partnered with local markets to analyze performance and implement specific improvement plans.",
        ],
      },
      {
        title: "Implementation Project Manager",
        period: "05/2017 – 02/2019",
        highlights: [
          "Market Onboarding: Oversaw the rollout of the Lead Management Service Desk across 12 European markets.",
          "Process Automation: Built a semi-automated reporting process that cut preparation time by over 90%.",
          "Client Relations: Managed review meetings with stakeholders to share project progress and market performance insights.",
        ],
      },
    ],
  },
  {
    name: "SQN (Sinequanon)",
    location: "Prague, Czechia",
    description: "Swiss-based PeopleTech startup transforming workplace culture with AI- and data-powered solutions.",
    logo: "/sqn-sinequanon-logo.webp",
    dateRange: "04/2016 - 05/2017",
    roles: [
      {
        title: "Client Delivery Specialist",
        period: "04/2016 – 05/2017",
        summary: "I worked at a PeopleTech startup to help launch and manage AI-driven tools focused on workplace culture.",
        highlights: [
          "Program Launches: Collaborated with senior management to launch over 25 client programs, personally leading 5 of our key accounts.",
          "Process Improvement: Developed new workflows and functionalities that made our implementation faster and more user-friendly.",
          "Standardization: Found opportunities to automate manual tasks, which reduced errors and helped the team scale.",
          "Data & Support: Analyzed client data to make sure the programs were actually delivering results.",
        ],
      },
    ],
  },
];
