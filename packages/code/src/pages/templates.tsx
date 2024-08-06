import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Wrapper } from "../Wrapper";
import { md5 } from "@src/md5";

interface Template {
  id: number;
  name: string;
  description: string;
  codeSpace: string;
}

const BrowserFrame: React.FC<{ children: React.ReactNode }> = (
  { children },
) => (
  <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
    <div className="bg-gray-100 p-2 flex items-center space-x-2">
      <div className="flex space-x-1">
        {["red", "yellow", "green"].map((color) => (
          <div
            key={color}
            className={`w-3 h-3 rounded-full bg-${color}-500`}
          />
        ))}
      </div>
      <div className="flex-grow bg-white rounded px-2 py-1 text-sm text-gray-600">
        example.com
      </div>
    </div>
    <div className="bg-white p-4 h-[300px] overflow-hidden">
      <div className="w-[300%] h-[300%] origin-top-left scale-[0.33] overflow-y-auto">
        {children}
      </div>
    </div>
  </div>
);

const TemplateCard: React.FC<{
  template: Template;
  onSelect: (templateId: number) => void;
}> = ({ template, onSelect }) => (
  <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
    <CardHeader>
      <h2 className="text-xl font-semibold">{template.name}</h2>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col">
      <div className="mb-4 flex-shrink-0">
        <BrowserFrame>
          <Wrapper
            codeSpace={template.codeSpace}
            scale={1}
          />
        </BrowserFrame>
      </div>
      <p className="mb-4 flex-grow">{template.description}</p>
    </CardContent>
    <CardFooter>
      <Button
        onClick={() =>
          location.href = `${location.origin}/live/${template.codeSpace}-${
            md5(Date.now().toString() + Math.random().toString())
          }`}
        className="w-full"
      >
        Select Template
      </Button>
    </CardFooter>
  </Card>
);

const templates: Template[] = [
  {
    id: 1,
    name: "Todo List App",
    description: "Learn basic state management and UI interactions",
    codeSpace: "todo",
  },
  {
    id: 2,
    name: "Voronoi Diagram",
    description: "Explore geometric algorithms and visualizations",
    codeSpace: "voronoi",
  },
  {
    id: 3,
    name: "Zoli Project",
    description: "Dive into advanced React patterns and state management",
    codeSpace: "zoli",
  },
  {
    id: 4,
    name: "WebRTC Chat",
    description: "Build a real-time communication app using WebRTC",
    codeSpace: "peerz",
  },
  {
    id: 5,
    name: "Cube, Three.js",
    description: "Build a real-time communication app using WebRTC",
    codeSpace: "cube",
  },
  {
    id: 6,
    name: "React Spring",
    description: "Demo of React Spring animations",
    codeSpace: "reactSpring",
  },
];

const TemplateSelectionPage: React.FC = () => {
  const handleSelectTemplate = (templateId: number) => {
    console.log(`Selected template: ${templateId}`);
    // Implement your template selection logic here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Choose a Template to Get Started
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={handleSelectTemplate}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelectionPage;
