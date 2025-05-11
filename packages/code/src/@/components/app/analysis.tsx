import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDarkMode } from "@/hooks/use-dark-mode";
import {
  CheckCircle2,
  Code,
  GitCommit,
  LightbulbIcon,
  List,
  UserCircle,
  XCircle,
} from "lucide-react";
import React from "react";

interface Section {
  concepts?: string[];
  request?: string;
  tasks?: string[];
  proscons?: {
    pros: string[];
    cons: string[];
  };
  approach?: string;
}

interface ProsCons {
  pros: string[];
  cons: string[];
}

const parseAnalysis = (content: string): Section => {
  console.warn("Parsing content:", content);
  const sections: Section = {};
  const lines = content
    .replace(/<\/?react_code_analysis>/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let currentSection: keyof Section | "" = "";
  let currentSubsection: keyof ProsCons | "" = "";

  const sectionMap: Record<string, keyof Section> = {
    "1. Key React concepts": "concepts",
    "2. User's request": "request",
    "3. Tasks": "tasks",
    "4. Pros and cons": "proscons",
    "5. Best approach": "approach",
  };

  lines.forEach((line) => {
    const newSection = Object.keys(sectionMap).find(
      (key): key is keyof typeof sectionMap => line.startsWith(key),
    );
    if (newSection) {
      currentSection = sectionMap[newSection];
      if (!sections[currentSection]) {
        if (currentSection === "proscons") {
          sections.proscons = { pros: [], cons: [] };
        } else if (currentSection === "request") {
          sections.request = "";
        } else if (currentSection === "approach") {
          sections.approach = "";
        } else if (currentSection === "concepts") {
          sections.concepts = [];
        } else if (currentSection === "tasks") {
          sections.tasks = [];
        }
      }
      if (currentSection === "proscons") {
        currentSubsection = "pros";
      }
    } else if (currentSection) {
      if (currentSection === "proscons" && sections.proscons) {
        if (line.startsWith("-")) {
          const item = line.replace(/^-\s*/, "");
          if (currentSubsection) {
            sections.proscons[currentSubsection].push(item);
          }
        } else {
          if (line.includes("Cons")) currentSubsection = "cons";
          else currentSubsection = "pros";
        }
      } else if (currentSection === "concepts" && sections.concepts) {
        if (line.startsWith("-")) {
          sections.concepts.push(line.replace(/^-\s*/, ""));
        }
      } else if (currentSection === "tasks" && sections.tasks) {
        if (line.startsWith("-") || line.match(/^[a-f]\./)) {
          sections.tasks.push(line.replace(/^[-a-f]\.\s*/, ""));
        }
      } else if (
        currentSection === "request" && sections.request !== undefined
      ) {
        sections.request += (sections.request ? " " : "") + line;
      } else if (
        currentSection === "approach" && sections.approach !== undefined
      ) {
        sections.approach += (sections.approach ? " " : "") + line;
      }
    }
  });

  console.warn("Parsed sections:", sections);
  return sections;
};

interface AnalysisProps {
  content: string;
}

export const Analysis: React.FC<AnalysisProps> = ({ content }) => {
  console.warn("Analysis component rendered with content:", content);
  const sections = parseAnalysis(content);
  const { isDarkMode } = useDarkMode();

  interface SectionProps {
    title: string;
    children: React.ReactNode;
    icon: React.ElementType;
    listType?: "pro" | "con" | "default";
  }

  const Section: React.FC<SectionProps> = (
    { title, children, icon: Icon, listType },
  ) => (
    <div
      className={`p-2 transition-all duration-300 ${
        isDarkMode ? "hover:bg-gray-800/30" : "hover:bg-white/30"
      } font-inter`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-gradient-to-br from-violet-500 to-indigo-600 p-1 rounded-md shadow-sm">
          <Icon className="h-3 w-3 text-white" />
        </div>
        <h3
          className={`text-base font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
        >
          {title}
        </h3>
      </div>
      <div
        className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} text-xs pl-4`}
      >
        {listType
          ? (
            <ul className="space-y-1">
              {Array.isArray(children) &&
                children.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    {listType === "pro" && (
                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                    )}
                    {listType === "con" && (
                      <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    {listType === "default" && (
                      <GitCommit className="h-3 w-3 text-indigo-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span className="leading-tight font-normal">{item}</span>
                  </li>
                ))}
            </ul>
          )
          : <div className="prose prose-xs max-w-none">{children}</div>}
      </div>
    </div>
  );

  const renderSections = () => {
    console.warn("Rendering sections:", sections);
    type SectionConfig = {
      [K in keyof Section]-?: {
        title: string;
        icon: React.ElementType;
        listType?: "default";
        render?: () => React.ReactNode;
      };
    };

    const sectionConfig: SectionConfig = {
      concepts: {
        title: "Key React Concepts",
        icon: Code,
        listType: "default",
      },
      request: { title: "User's Request", icon: UserCircle },
      tasks: { title: "Tasks and Solutions", icon: List, listType: "default" },
      proscons: {
        title: "Pros and Cons",
        icon: LightbulbIcon,
        render: () => (
          <div className="space-y-2">
            {sections.proscons && sections.proscons.pros &&
              sections.proscons.pros.length > 0 && (
              <div
                className={`${isDarkMode ? "bg-green-900" : "bg-green-50"} rounded-md p-2`}
              >
                <h4
                  className={`font-semibold ${
                    isDarkMode ? "text-green-300" : "text-green-700"
                  } text-sm mb-1`}
                >
                  Pros
                </h4>
                <ul className="space-y-1">
                  {sections.proscons.pros.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1 py-0.5">
                      <CheckCircle2
                        className={`h-3 w-3 ${
                          isDarkMode ? "text-green-400" : "text-green-500"
                        } mt-0.5 flex-shrink-0`}
                      />
                      <span
                        className={`leading-tight font-normal font-roboto-mono text-xs ${
                          isDarkMode ? "text-green-200" : "text-green-800"
                        }`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {sections.proscons && sections.proscons.cons &&
              sections.proscons.cons.length > 0 && (
              <div
                className={`${isDarkMode ? "bg-red-900" : "bg-red-50"} rounded-md p-2`}
              >
                <h4
                  className={`font-semibold ${
                    isDarkMode ? "text-red-300" : "text-red-700"
                  } text-sm mb-1`}
                >
                  Cons
                </h4>
                <ul className="space-y-1">
                  {sections.proscons.cons.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1 py-0.5">
                      <XCircle
                        className={`h-3 w-3 ${
                          isDarkMode ? "text-red-400" : "text-red-500"
                        } mt-0.5 flex-shrink-0`}
                      />
                      <span
                        className={`leading-tight font-normal font-roboto-mono text-xs ${
                          isDarkMode ? "text-red-200" : "text-red-800"
                        }`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ),
      },
      approach: { title: "Best Approach", icon: LightbulbIcon },
    } as const;

    return Object.entries(sections).map(([key, value]) => {
      const config = sectionConfig[key as keyof Section];
      if (!config) return null;
      console.warn(`Rendering section: ${key}`, value);
      return (
        <Section
          key={key}
          title={config.title}
          icon={config.icon}
          listType={config.listType}
        >
          {config.render
            ? config.render()
            : Array.isArray(value)
            ? value
            : <p className="font-medium leading-relaxed">{value}</p>}
        </Section>
      );
    });
  };

  return (
    <Card
      className={`max-w-full mx-auto border-none shadow-lg ${
        isDarkMode ? "bg-gray-800/90" : "bg-white/90"
      }`}
    >
      <CardHeader className="bg-gradient-to-r from-violet-700 to-indigo-800 py-2 rounded-t-lg">
        <CardTitle className="text-lg font-semibold text-white flex items-center">
          <LightbulbIcon className="w-4 h-4 mr-1" />
          React Analysis
        </CardTitle>
      </CardHeader>
      <CardContent
        className={`p-0 divide-y ${isDarkMode ? "divide-gray-700/30" : "divide-gray-200/30"}`}
      >
        {renderSections()}
      </CardContent>
    </Card>
  );
};

const analysisContent = `
1. Key React concepts and components:
   - Functional component: AceEditorComponent
   - Hooks: useState
   - Event handlers: handleChange, clearEditor, undoClear
   - Emotion-JS styling
   - AceEditor from react-ace library

2. User's request:
Implement a multi-step undo history

3. Tasks and solutions:
   a. Replace single previousContent state with an array of history states
   b. Modify handleChange to add each change to the history
   c. Update clearEditor to add the current state to history before clearing
   d. Modify undoClear to handle multiple undo steps
   e. Add a Redo functionality
   f. Update UI to show Undo and Redo buttons

4. Pros and cons:
   Pros:
   - Allows users to undo multiple steps, improving user experience
   - Provides a more robust editing experience
   Cons:
   - Increases component complexity
   - May impact performance with large history arrays

5. Best approach:
   Implement a history array using useState, modify existing functions to work with the array, add a new Redo function, and update the UI to include Undo and Redo buttons with appropriate disabling logic.
`;

const ReactAnalysis: React.FC = () => {
  console.warn("ReactAnalysis component rendered");
  return <Analysis content={analysisContent} />;
};

export default ReactAnalysis;
