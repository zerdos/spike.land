// empty-dkddd.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, CheckCircle2, XCircle, GitCommit, UserCircle, List, LightbulbIcon } from "lucide-react";

const parseAnalysis = (content) => {
  console.log("Parsing content:", content);
  const sections = {};
  const lines = content
    .replace(/<\/?react_code_analysis>/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  let currentSection = "";
  let currentSubsection = "";

  const sectionMap = {
    "1. Key React concepts": "concepts",
    "2. User's request": "request",
    "3. Tasks": "tasks",
    "4. Pros and cons": "proscons",
    "5. Best approach": "approach",
    "Pros:": "pros",
    "Cons:": "cons",
  };

  lines.forEach((line) => {
    const newSection = Object.keys(sectionMap).find((key) => line.startsWith(key));
    if (newSection) {
      currentSection = sectionMap[newSection];
      if (!sections[currentSection]) {
        sections[currentSection] = currentSection === "proscons" ? { pros: [], cons: [] } : currentSection === "request" || currentSection === "approach" ? "" : [];
      }
      if (currentSection === "proscons" || currentSection === "pros" || currentSection === "cons") {
        currentSubsection = currentSection === "proscons" ? "pros" : currentSection;
      }
    } else if (currentSection) {
      if (currentSection === "proscons" || currentSection === "pros" || currentSection === "cons") {
        if (line.startsWith("-")) {
          const item = line.replace(/^-\s*/, "");
          if (currentSection === "proscons") {
            sections.proscons[currentSubsection].push(item);
          } else {
            sections.proscons[currentSection].push(item);
          }
        }
      } else if (Array.isArray(sections[currentSection])) {
        if (line.startsWith("-") || line.match(/^[a-f]\./)) sections[currentSection].push(line.replace(/^[-a-f]\.\s*/, ""));
      } else if (currentSection === "request" || currentSection === "approach") {
        sections[currentSection] += (sections[currentSection] ? " " : "") + line;
      }
    }
  });

  // Remove separate pros and cons sections
  delete sections.pros;
  delete sections.cons;

  console.log("Parsed sections:", sections);
  return sections;
};

export const Analysis = ({ content }) => {
  console.log("Analysis component rendered with content:", content);
  const sections = parseAnalysis(content);

  const Section = ({ title, children, icon: Icon, listType }) => (
    <div className="p-3 transition-all duration-300 hover:bg-white/50 font-poppins">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-gradient-to-br from-purple-400 to-indigo-500 p-1 rounded-md shadow-sm">
          <Icon className="h-3 w-3 text-white" />
        </div>
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="text-gray-700 text-xs pl-5">
        {listType ? (
          <ul className="space-y-1">
            {children.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1 py-0.5">
                {listType === "pro" && <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />}
                {listType === "con" && <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />}
                {listType === "default" && <GitCommit className="h-3 w-3 text-indigo-500 mt-0.5 flex-shrink-0" />}
                <span className="leading-tight font-normal font-roboto-mono">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="prose prose-xs max-w-none font-normal">{children}</div>
        )}
      </div>
    </div>
  );

  const renderSections = () => {
    console.log("Rendering sections:", sections);
    const sectionConfig = {
      concepts: { title: "Key React Concepts", icon: Code, listType: "default" },
      request: { title: "User's Request", icon: UserCircle },
      tasks: { title: "Tasks and Solutions", icon: List, listType: "default" },
      proscons: {
        title: "Pros and Cons",
        icon: LightbulbIcon,
        render: () => (
          <div className="space-y-2">
            {sections.proscons && sections.proscons.pros && sections.proscons.pros.length > 0 && (
              <div className="bg-green-50 rounded-md p-2">
                <h4 className="font-semibold text-green-700 text-sm mb-1">Pros</h4>
                <ul className="space-y-1">
                  {sections.proscons.pros.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1 py-0.5">
                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="leading-tight font-normal font-roboto-mono text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {sections.proscons && sections.proscons.cons && sections.proscons.cons.length > 0 && (
              <div className="bg-red-50 rounded-md p-2">
                <h4 className="font-semibold text-red-700 text-sm mb-1">Cons</h4>
                <ul className="space-y-1">
                  {sections.proscons.cons.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1 py-0.5">
                      <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="leading-tight font-normal font-roboto-mono text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ),
      },
      approach: { title: "Best Approach", icon: LightbulbIcon },
    };

    return Object.entries(sections).map(([key, value]) => {
      const config = sectionConfig[key];
      if (!config) return null;
      console.log(`Rendering section: ${key}`, value);
      return (
        <Section key={key} title={config.title} icon={config.icon} listType={config.listType}>
          {config.render ? config.render() : Array.isArray(value) ? value : <p className="font-medium leading-relaxed">{value}</p>}
        </Section>
      );
    });
  };

  return (
    <div className="max-w-full mx-auto p-2 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 font-poppins">
      <Card className="border-none shadow-lg backdrop-blur-md bg-white/30">
        <CardHeader className="bg-gradient-to-r from-purple-400 to-indigo-500 py-2 rounded-t-lg">
          <CardTitle className="text-lg font-bold text-white flex items-center">
            <LightbulbIcon className="w-4 h-4 mr-1" />
            React Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-gray-200/50">{renderSections()}</CardContent>
      </Card>
    </div>
  );
};

const analysisContent = `
1. Key React concepts and components:
   - Functional component: AceEditorComponent
   - Hooks: useState
   - Event handlers: handleChange, clearEditor, undoClear
   - Emotionin-JS styling
   - AceEditor from react-ace library

2. User's request:
 - Implement a multi-step undo history

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

export default function ReactAnalysis() {
  console.log("ReactAnalysis component rendered");
  return <Analysis content={analysisContent} />;
}
