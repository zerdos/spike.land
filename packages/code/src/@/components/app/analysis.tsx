// empty-dkddd.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, CheckCircle2, XCircle, GitCommit, UserCircle, List, LightbulbIcon } from "lucide-react";

const parseAnalysis = (content: string) => {
  const sections: {
    concepts: string[];
    request: string;
    tasks: string[];
    pros: string[];
    cons: string[];
    approach: string;
  } = {
    concepts: [],
    request: "",
    tasks: [],
    pros: [],
    cons: [],
    approach: "",
  };

  const lines = content
    .replace(/<\/?react_code_analysis>/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  let currentSection = "";

  lines.forEach((line) => {
    if (line.startsWith("1. Key React concepts")) currentSection = "concepts";
    else if (line.startsWith("2. User's request")) currentSection = "request";
    else if (line.startsWith("3. Tasks")) currentSection = "tasks";
    else if (line.startsWith("4. Pros and cons")) currentSection = "proscons";
    else if (line.startsWith("5. Best approach")) currentSection = "approach";
    else if (line.startsWith("Pros:")) currentSection = "pros";
    else if (line.startsWith("Cons:")) currentSection = "cons";
    else if (currentSection === "concepts" && line.startsWith("-")) sections.concepts.push(line.replace(/^-\s*/, ""));
    else if (currentSection === "request" && !line.startsWith("2.")) sections.request = line;
    else if (currentSection === "tasks" && line.match(/^[a-f]\./)) sections.tasks.push(line.replace(/^[a-f]\.\s*/, ""));
    else if (currentSection === "pros" && line.startsWith("-")) sections.pros.push(line.replace(/^-\s*/, ""));
    else if (currentSection === "cons" && line.startsWith("-")) sections.cons.push(line.replace(/^-\s*/, ""));
    else if (currentSection === "approach" && !line.startsWith("5.")) sections.approach = line;
  });

  (Object.keys(sections) as Array<keyof typeof sections>).forEach((key) => {
    if ((Array.isArray(sections[key]) && sections[key].length === 0) || (!Array.isArray(sections[key]) && !sections[key])) {
      delete sections[key];
    }
  });

  return sections;
};

interface AnalysisProps {
  content: string;
}

const Analysis: React.FC<AnalysisProps> = ({ content }) => {
  const sections = parseAnalysis(content);

  interface SectionProps {
    title: string;
    children: React.ReactNode;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }

  const Section: React.FC<SectionProps> = ({ title, children, icon: Icon }) => (
    <div className="bg-white p-4 border-b last:border-b-0">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-blue-50 p-1.5 rounded">
          <Icon className="h-4 w-4 text-blue-500" />
        </div>
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
      </div>
      <div className="text-gray-600 text-sm pl-8">{children}</div>
    </div>
  );

  const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start gap-2 py-0.5">
      <GitCommit className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );

  const renderSections = () => {
    const components = [];

    if (sections.concepts?.length) {
      components.push(
        <Section key="concepts" title="Key React Concepts" icon={Code}>
          <ul className="space-y-1">
            {sections.concepts.map((concept, idx) => (
              <ListItem key={idx}>{concept}</ListItem>
            ))}
          </ul>
        </Section>
      );
    }

    if (sections.request) {
      components.push(
        <Section key="request" title="User's Request" icon={UserCircle}>
          <p className="font-medium">{sections.request}</p>
        </Section>
      );
    }

    if (sections.tasks?.length) {
      components.push(
        <Section key="tasks" title="Tasks and Solutions" icon={List}>
          <ul className="space-y-1">
            {sections.tasks.map((task, idx) => (
              <ListItem key={idx}>{task}</ListItem>
            ))}
          </ul>
        </Section>
      );
    }

    if (sections.pros?.length || sections.cons?.length) {
      components.push(
        <Section key="proscons" title="Pros and Cons" icon={LightbulbIcon}>
          <div className="grid gap-4 md:grid-cols-2">
            {sections.pros?.length > 0 && (
              <div>
                <h4 className="font-medium mb-1">Pros</h4>
                <ul className="space-y-1">
                  {sections.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {sections.cons?.length > 0 && (
              <div>
                <h4 className="font-medium mb-1">Cons</h4>
                <ul className="space-y-1">
                  {sections.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <XCircle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      );
    }

    if (sections.approach) {
      components.push(
        <Section key="approach" title="Best Approach" icon={LightbulbIcon}>
          <p>{sections.approach}</p>
        </Section>
      );
    }

    return components;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b py-3">
          <CardTitle className="text-xl font-semibold text-gray-800">React Code Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-0">{renderSections()}</CardContent>
      </Card>
    </div>
  );
};

export default () => (
  <Analysis
    content={`

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
   - Allows users to undo multiple steps, improving
   - Provides a more robust editing experience
   Cons:
   - Increases component complexity
   - May impact performance with large history arrays

5. Best approach:
   Implement a history array using useState, modify existing functions to work with the array, add a new Redo function, and update the UI to include Undo and Redo buttons with appropriate disabling logic.

`}
  />
);
