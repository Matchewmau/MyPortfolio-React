import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 80, category: "frontend" },
  { name: "Laravel", level: 70, category: "frontend" },
  { name: "React", level: 80, category: "frontend" },
  { name: "TypeScript", level: 70, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Bootstrap", level: 80, category: "frontend" },

  // Backend
  { name: "SQLite", level: 50, category: "backend" },
  { name: "MySQL", level: 70, category: "backend" },
  { name: "Django", level: 50, category: "backend" },
  { name: "GraphQL", level: 40, category: "backend" },

  // Tools
  { name: "Git/GitHub", level: 70, category: "tools" },
  { name: "Docker", level: 60, category: "tools" },
  { name: "Figma", level: 90, category: "tools" },
  { name: "Canva", level: 80, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Here are the technologies and tools I work with to build fast, scalable, and user-friendly web applications
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300 capitalize border",
                activeCategory === category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground hover:bg-primary/10 hover:border-primary/50 border-primary/15"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="gradient-border p-6 transition-all duration-300 group hover:shadow-xl card-hover"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg transition-colors duration-300 group-hover:text-primary">
                  {skill.name}
                </h3>
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {skill.level}%
                </span>
              </div>
              
              <div className="w-full bg-secondary/50 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-3 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
