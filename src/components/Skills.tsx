const skills = {
  core: [
    "Product Marketing",
    "Go-to-Market Strategy",
    "Product Positioning",
    "Messaging Frameworks",
    "Product Launches",
    "Product-Led Growth"
  ],
  technical: [
    "SaaS & Cloud Platforms",
    "Hardware Products",
    "Analytics & Data",
    "B2B & B2C",
    "AI/ML Applications",
    "Cryptocurrency/Bitcoin"
  ],
  certifications: [
    { name: "Go-to-Market Certified | Masters", org: "PMA" },
    { name: "Product-Led Growth Fundamentals", org: "PMA" },
    { name: "B2B Messaging Certification", org: "PMA" },
    { name: "Product Management Basics", org: "PMA" },
    { name: "Elements of AI", org: "University of Helsinki" }
  ]
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="mono text-primary text-sm tracking-wider">SKILLS</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Expertise & <span className="text-gradient">Certifications</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Core Skills */}
            <div className="border-gradient rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Core Competencies
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.core.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Technical Skills */}
            <div className="border-gradient rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Technical Domains
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.technical.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Certifications */}
          <div className="card-gradient border border-border rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Certifications
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary/30 transition-colors"
                >
                  <p className="font-medium text-sm mb-1">{cert.name}</p>
                  <p className="mono text-xs text-muted-foreground">{cert.org}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Education note */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">M.Sc. Economics & Business Administration</span>
              <span className="mx-2">•</span>
              University of Oulu, Finland
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
