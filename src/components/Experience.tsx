import { memo, useState, useRef, useCallback, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import BitcoinWord from "./BitcoinWord";
import SectionHeader from "./SectionHeader";

interface Role {
  title: string;
  period: string;
  summary?: string;
  highlights: string[];
  current?: boolean;
}

interface Company {
  name: string;
  location: string;
  description?: string;
  logo: string;
  dateRange: string;
  roles: Role[];
}

const renderWithBitcoin = (text: string) => {
  const parts = text.split(/(Bitcoin)/g);
  return parts.map((part, i) =>
    part === "Bitcoin" ? <BitcoinWord key={i} /> : part
  );
};

const companies: Company[] = [
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
          "System Rollout: Supported the European launch of a Microsoft Dynamics lead system, including post-launch support for over 1,200 users.",
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

const Experience = memo(() => {
  const [expandedCompanies, setExpandedCompanies] = useState<Set<number>>(new Set());
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const toggleCompany = useCallback((index: number) => {
    setExpandedCompanies(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
        // Scroll to the clicked row after it opens
        scrollTimeoutRef.current = setTimeout(() => {
          const el = rowRefs.current[index];
          if (el) {
            const nav = document.querySelector("nav");
            const offset = (nav?.offsetHeight ?? 64) + 8;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }, 50);
      }
      return next;
    });
  }, []);

  // Clean up scroll timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const hasCurrent = (company: Company) => company.roles.some(r => r.current);

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
    <section id="experience" aria-labelledby="experience-heading" className="pt-10 pb-28 md:pt-20 md:pb-36 relative" data-description="Lauri Hänninen's career journey: Product Marketing Lead at Trezor, PMA Chapter Lead in Prague, Senior Technical PMM at GoodData, Web Tagging Team Lead at Wunderman Thompson, and Client Delivery at SQN.">
      <div className="container px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="EXPERIENCE" id="experience-heading">
            Career <span className="text-gradient">Journey</span>
          </SectionHeader>

          {/* Company list */}
          <div>
            {companies.map((company, index) => {
              const isExpanded = expandedCompanies.has(index);
              return (
                <m.div
                  key={company.name}
                  ref={(el: HTMLDivElement | null) => { rowRefs.current[index] = el; }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="border-b border-border/20"
                >
                  <button
                    onClick={() => toggleCompany(index)}
                    className="w-full text-left py-5 flex items-center gap-5 group transition-colors duration-200 hover:bg-secondary/30 -mx-4 px-4 rounded-lg"
                    aria-expanded={isExpanded}
                    aria-controls={`experience-panel-${index}`}
                  >
                    {/* Date */}
                    <span className={`font-mono text-xs w-[140px] shrink-0 hidden sm:block ${
                      hasCurrent(company) ? "text-highlight font-medium" : "text-muted-foreground"
                    }`}>
                      {company.dateRange}
                    </span>

                    {/* Logo + info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 shrink-0"
                        width={32}
                        height={32}
                        loading={index < 2 ? "eager" : "lazy"}
                        decoding="async"
                      />
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold truncate group-hover:text-primary transition-colors">
                          {company.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {company.roles[0]?.title}
                          {company.roles.length > 1 && (
                            <span className="text-muted-foreground/60"> +{company.roles.length - 1} more</span>
                          )}
                        </p>
                        <span className={`font-mono text-[11px] sm:hidden ${
                          hasCurrent(company) ? "text-highlight" : "text-muted-foreground/60"
                        }`}>
                          {company.dateRange}
                        </span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div className="shrink-0">
                      <m.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </m.div>
                    </div>
                  </button>

                  {/* Expanded content */}
                  <div aria-live="polite" aria-atomic="false">
                  <AnimatePresence>
                    {isExpanded && (
                      <m.div
                        id={`experience-panel-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                          opacity: { duration: 0.2, delay: 0.05 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pl-4 sm:pl-[160px]">
                          {/* Company description */}
                          {company.description && (
                            <p className="text-sm text-muted-foreground italic mb-5">
                              {renderWithBitcoin(company.description)}
                            </p>
                          )}

                          {/* Roles */}
                          {company.roles.length > 1 && (
                            <p className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-4">
                              {company.roles.length} roles
                            </p>
                          )}
                          <div className="space-y-3">
                            {company.roles.map((role) => (
                              <div key={role.title} className="bg-secondary/20 rounded-xl p-4">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span className="font-semibold text-sm text-foreground">{role.title}</span>
                                  {role.current && (
                                    <span className="sm:hidden font-mono text-[9px] tracking-widest uppercase text-highlight bg-highlight/10 px-1.5 py-0.5 rounded">Current</span>
                                  )}
                                </div>
                                <span className="font-mono text-[11px] text-muted-foreground/70 block mb-2">{role.period}</span>

                                {role.summary && (
                                  <p className="text-sm text-muted-foreground mb-2">{role.summary}</p>
                                )}

                                {role.highlights.length > 0 && (
                                  <ul className="space-y-1.5 mt-2">
                                    {role.highlights.map(renderHighlight)}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

Experience.displayName = "Experience";

export default Experience;
