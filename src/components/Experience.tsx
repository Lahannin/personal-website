import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
interface Role {
  title: string;
  period: string;
  description: string;
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
    logo: "https://i.ibb.co/k6c7pGgx/trezor-logo.jpg",
    roles: [
      {
        title: "Product Marketing Lead",
        period: "07/2024 – Present",
        description:
          "Lead product marketing initiatives including go-to-market strategy, positioning, messaging, and global launches.",
        highlights: [
          "Build and scale a team covering product marketing, technical writing, and copywriting",
          "Partner cross-functionally with Marketing, Product, Design, and Research teams",
          "Identify customer segments and growth opportunities through market and competitive insights",
        ],
        current: true,
      },
      {
        title: "Senior Product Marketing Manager",
        period: "09/2023 – 06/2024",
        description: "Founded the product marketing function as the first Product Marketer.",
        highlights: [
          "Built positioning, messaging, and go-to-market frameworks",
          "Led global launches including two Tier 1 hardware and software launches",
        ],
      },
    ],
  },
  {
    name: "Product Marketing Alliance",
    location: "Prague, Czechia",
    description:
      "The world's largest product marketing community, empowering PMMs through certifications, resources, and events.",
    logo: "https://i.ibb.co/bjq1Hx0P/product-marketing-alliance-logo.jpg",
    roles: [
      {
        title: "Chapter Lead",
        period: "11/2023 – Present",
        description: "Founded the first PMA chapter in the Czech Republic.",
        highlights: ["Built and grew a local product marketing community"],
        current: true,
      },
      {
        title: "Brand Ambassador",
        period: "03/2023 – 11/2023",
        description: "Represented PMA globally, driving engagement and community growth.",
        highlights: [],
      },
    ],
  },
  {
    name: "GoodData",
    location: "Prague, Czechia",
    description:
      "A leading analytics platform enabling businesses to build and embed customizable BI dashboards at scale.",
    logo: "https://i.ibb.co/gFz2sFSs/gooddata-logo.jpg",
    roles: [
      {
        title: "Senior Technical Product Marketing Manager",
        period: "09/2022 – 09/2023",
        description: "Defined positioning and messaging for the analytics platform.",
        highlights: [
          "Increased trial adoption through product and UX collaboration",
          "Coordinated global launches and improved inbound leads",
          "Created technical content including demos, webinars, and articles",
        ],
      },
      {
        title: "Product Marketing Manager",
        period: "01/2021 – 08/2022",
        description: "Led marketing for a cloud-native analytics platform across AWS, GCP, Azure, and on-prem.",
        highlights: [
          "Produced demos, eBooks, videos, and articles",
          "Executed go-to-market campaigns for features and upgrades",
          "Led analyst relations with Gartner, Forrester, and others",
        ],
      },
    ],
  },
  {
    name: "Wunderman Thompson",
    location: "Prague, Czechia",
    description:
      "A global creative agency combining creativity and technology to deliver marketing solutions for top brands.",
    logo: "https://i.ibb.co/5gCqRQr2/wunderman-thompson-logo.jpg",
    roles: [
      {
        title: "Web Tagging Team Lead",
        period: "10/2019 – 12/2020",
        description: "Managed a web tagging team and improved QA processes.",
        highlights: [
          "Oversaw analytics tagging across Ford's global web properties",
          "Liaised between Ford of Europe and national sales companies",
        ],
      },
      {
        title: "Lead Management Specialist",
        period: "02/2019 – 10/2019",
        description: "Led lead management across five Ford of Europe markets.",
        highlights: [
          "Improved lead performance with some markets exceeding 105% growth",
          "Supported rollout of Microsoft Dynamics to 1,200+ users",
        ],
      },
      {
        title: "Implementation Project Manager",
        period: "05/2017 – 02/2019",
        description: "Led onboarding in 12 markets.",
        highlights: ["Reduced reporting time by over 90% through automation", "Maintained high customer satisfaction"],
      },
    ],
  },
  {
    name: "SQN (Sinequanon)",
    location: "Prague, Czechia",
    description: "Swiss-based PeopleTech startup transforming workplace culture with AI- and data-powered solutions.",
    logo: "https://i.ibb.co/yF0gRHpn/new-sqn-logo.png",
    roles: [
      {
        title: "Client Delivery Specialist",
        period: "04/2016 – 05/2017",
        description: "Managed delivery of client programs.",
        highlights: ["Improved implementation speed and efficiency"],
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

  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 -left-32 w-[500px] h-[500px] bg-secondary/40 rounded-[40%_60%_60%_40%/50%_40%_60%_50%] blur-3xl" />
        <div className="absolute bottom-40 -right-32 w-[400px] h-[400px] bg-primary/5 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl" />
      </div>
      
      <div className="container px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-16 md:flex md:items-end md:gap-12"
          >
            <div className="text-center md:text-left flex-1">
              <span className="mono text-primary text-sm tracking-wider">EXPERIENCE</span>
              <h2 id="experience-heading" className="text-3xl md:text-5xl font-bold mt-4">
                Career <span className="text-gradient">Journey</span>
              </h2>
            </div>
            <p className="hidden md:block text-muted-foreground text-sm max-w-xs text-right">
              10+ years across startups, agencies, and global tech companies
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative grid md:grid-cols-2 gap-6 md:gap-8">
            {companies.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`${index === 0 ? "md:col-span-2 md:max-w-2xl" : ""}`}
              >
                  <motion.div 
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`h-full card-gradient border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors ${
                      index === 0 ? "bg-gradient-to-br from-primary/5 to-transparent" : ""
                    }`}
                  >
                    {/* Company header */}
                    <div className="flex items-center gap-4 mb-4">
                      {hasCurrent(company) && (
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse" />
                      )}
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-11 h-11 rounded-xl object-contain bg-white p-1 shadow-sm"
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
                      />
                      <div>
                        <h3 className="text-lg font-bold">{company.name}</h3>
                        <p className="text-xs text-muted-foreground">{company.location}</p>
                      </div>
                    </div>

                    {/* Company description */}
                    {company.description && (
                      <p className="text-sm text-muted-foreground mb-5 pb-5 border-b border-border/50">
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
                                    <ul className="space-y-1.5 mb-3">
                                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <span className="text-primary mt-0.5">•</span>
                                        {role.description}
                                      </li>
                                    </ul>
                                    {role.highlights.length > 0 && (
                                      <ul className="space-y-1.5">
                                        {role.highlights.map((highlight, i) => (
                                          <li
                                            key={i}
                                            className="flex items-start gap-2 text-sm text-muted-foreground"
                                          >
                                            <span className="text-primary mt-0.5">•</span>
                                            {highlight}
                                          </li>
                                        ))}
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
                  </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
