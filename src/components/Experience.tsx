import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Role {
  title: string;
  period: string;
  description: string;
  summary?: string;
  highlights: string[];
  current?: boolean;
}

interface Company {
  name: string;
  location: string;
  description?: string;
  logo: string;
  roles: Role[];
}

const companies: Company[] = [
  {
    name: "Trezor",
    location: "Prague, Czechia",
    description:
      "The original hardware wallet company. Pioneering secure, open-source self-custody for Bitcoin and crypto since 2014.",
    logo: "/trezor-logo.webp",
    roles: [
      {
        title: "Product Marketing Lead",
        period: "07/2024 – Present",
        description:
          "Leading the product marketing function and building the strategy to make crypto security understandable for everyone.",
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
        description: "",
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
    description:
      "The world's largest product marketing community, empowering PMMs through certifications, resources, and events.",
    logo: "/product-marketing-alliance-logo.webp",
    roles: [
      {
        title: "Chapter Lead",
        period: "11/2023 – Present",
        description: "",
        highlights: [
          "Community Building: Founded the first PMA chapter in the Czech Republic, building a network for local product marketers.",
          "Events & Growth: Organizing initiatives to share knowledge and elevate the craft of PMM in the Prague tech scene.",
        ],
        current: true,
      },
      {
        title: "Brand Ambassador",
        period: "03/2023 – 11/2023",
        description: "",
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
    description:
      "A leading analytics platform enabling businesses to build and embed customizable BI dashboards at scale.",
    logo: "/gooddata-logo.webp",
    roles: [
      {
        title: "Senior Technical Product Marketing Manager",
        period: "09/2022 – 09/2023",
        summary: "I was responsible for making GoodData's cloud analytics platform and API-first architecture make sense to both developers and business buyers.",
        description: "",
        highlights: [
          "Messaging: Defined the positioning and messaging strategies to help the GoodData platform stand out in a crowded market.",
          "Technical Content: Created the demos, webinars, and articles that explained \"Analytics as Code\" and \"API-first analytics\" to both developers and executives.",
          "User Adoption: Worked with the Product and UX teams to improve the trial experience and increase inbound lead volume.",
        ],
      },
      {
        title: "Product Marketing Manager",
        period: "01/2021 – 08/2022",
        description: "",
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
    description:
      "A global creative agency combining creativity and technology to deliver marketing solutions for top brands.",
    logo: "/wunderman-thompson-logo.webp",
    roles: [
      {
        title: "Web Tagging Team Lead",
        period: "10/2019 – 12/2020",
        summary: "I managed the daily operations of the web tagging team, making sure data collection was accurate across Ford's global web properties and 22 national portals.",
        description: "",
        highlights: [
          "Team Operations: Managed a specialist team and our internal QA processes for analytics tags.",
          "Stakeholder Management: Acted as the main contact for Ford of Europe to handle digital tagging and technical compliance.",
          "Media Compliance: Reviewed media plans to ensure all digital assets met our technical and tracking standards.",
        ],
      },
      {
        title: "Lead Management Specialist",
        period: "02/2019 – 10/2019",
        description: "",
        highlights: [
          "Performance Growth: Optimized lead management for over 450 dealerships, with top markets seeing growth exceed 105%.",
          "System Rollout: Supported the European launch of a Microsoft Dynamics lead system, including training for over 1,200 users.",
          "Data Analysis: Partnered with local markets to analyze performance and implement specific improvement plans.",
        ],
      },
      {
        title: "Implementation Project Manager",
        period: "05/2017 – 02/2019",
        description: "",
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
    roles: [
      {
        title: "Client Delivery Specialist",
        period: "04/2016 – 05/2017",
        summary: "I worked at a PeopleTech startup to help launch and manage AI-driven tools focused on workplace culture.",
        description: "",
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

const Experience = () => {
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({});
  const hasCurrent = (company: Company) => company.roles.some((role) => role.current);

  const toggleRole = (companyIndex: number, roleIndex: number) => {
    const key = `${companyIndex}-${roleIndex}`;
    setExpandedRoles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isRoleExpanded = (companyIndex: number, roleIndex: number) => {
    return expandedRoles[`${companyIndex}-${roleIndex}`] ?? false;
  };

  const renderHighlight = (highlight: string, i: number) => {
    const colonIndex = highlight.indexOf(":");
    if (colonIndex === -1) {
      return (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="text-primary mt-0.5">•</span>
          <span>{highlight}</span>
        </li>
      );
    }
    const label = highlight.slice(0, colonIndex);
    const rest = highlight.slice(colonIndex + 1);
    return (
      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
        <span className="text-primary mt-0.5">•</span>
        <span>
          <strong className="text-foreground font-semibold">{label}:</strong>
          {rest}
        </span>
      </li>
    );
  };

  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-28 md:py-36 relative bg-background">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <span className="mono text-highlight text-xs font-bold tracking-[0.2em] uppercase">EXPERIENCE</span>
            <h2 id="experience-heading" className="text-3xl md:text-6xl font-black mt-4 tracking-tight">
              Career <span className="text-gradient">Journey</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {companies.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1 md:-translate-x-1.5 mt-6 z-10">
                  {hasCurrent(company) && (
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 pl-0 md:pl-0 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <div className="card-gradient border border-border rounded-xl p-6 shadow-md hover:border-highlight/40 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                    {/* Company header */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-12 h-12 rounded-lg object-contain bg-white p-1"
                        width={48}
                        height={48}
                        loading={index < 1 ? "eager" : "lazy"}
                        {...(index < 1 ? { fetchpriority: "high" } : {})}
                        decoding="async"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-bold">{company.name}</h3>
                          {hasCurrent(company) && (
                            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{company.location}</p>
                      </div>
                    </div>

                    {/* Company description */}
                    {company.description && (
                      <p className="text-sm text-muted-foreground italic mb-5 pb-5 border-b border-border/50">
                        {company.description}
                      </p>
                    )}

                    {/* Roles */}
                    <div className="space-y-3">
                      {company.roles.map((role, roleIndex) => {
                        const isExpanded = isRoleExpanded(index, roleIndex);
                        return (
                          <div
                            key={roleIndex}
                            className={`${roleIndex > 0 ? "pt-3 border-t border-border/50" : ""}`}
                          >
                            <button
                              onClick={() => toggleRole(index, roleIndex)}
                              className="w-full text-left flex items-center justify-between gap-2 group"
                            >
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span className="mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                                    {role.period}
                                  </span>
                                </div>
                                <p className="text-primary font-semibold group-hover:text-primary/80 transition-colors">
                                  {role.title}
                                </p>
                              </div>
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                              </motion.div>
                            </button>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-3">
                                    {role.summary && (
                                      <p className="text-sm text-muted-foreground mb-3 italic">
                                        {role.summary}
                                      </p>
                                    )}
                                    {role.description && (
                                      <p className="text-sm text-muted-foreground mb-3">
                                        {role.description}
                                      </p>
                                    )}
                                    {role.highlights.length > 0 && (
                                      <ul className="space-y-1.5">
                                        {role.highlights.map(renderHighlight)}
                                      </ul>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
