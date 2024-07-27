import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MarkdownEditor from "./templates/markdown-editor";
import PomodoroTimer from "./templates/pomodoro";
import Todo from "./templates/todo";
import WeatherDashboard from "./templates/weather-dashboard";

const DeviceFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
    <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
    <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg">
    </div>
    <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
      <div className="w-full h-full scale-[0.75] origin-top-left">{children}</div>
    </div>
  </div>
);

interface Template {
  id: number;
  name: string;
  description: string;
  preview: JSX.Element | (() => JSX.Element);
}

const templates = [
  {
    id: 1,
    name: "Todo List App",
    description: "Learn basic state management and UI interactions",
    preview: <Todo />,
  },
  {
    id: 2,
    name: "Weather Dashboard",
    description: "Work with APIs and display dynamic data",
    preview: <WeatherDashboard />,
  },
  {
    id: 3,
    name: "Pomodoro Timer ",
    description: "Pomodoro timer",
    preview: <PomodoroTimer />,
  },
  {
    id: 4,
    name: "Markdown Editor",
    description: "Markdown editor",
    preview: <MarkdownEditor />,
  },
];

const TemplateCard = ({ template, onSelect }: { template: Template; onSelect: (templateId: number) => void }) => (
  <Card className="hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <h2 className="text-xl font-semibold">{template.name}</h2>
    </CardHeader>
    <CardContent>
      <div className="mb-4 h-[300px] flex justify-center items-center">
        <div className="scale-[0.4] origin-center">
          <DeviceFrame>
            {typeof template.preview === "function" ? template.preview() : template.preview}
          </DeviceFrame>
        </div>
      </div>
      <p className="mb-4">{template.description}</p>
      <Button onClick={() => onSelect(template.id)} className="w-full">
        Select Template
      </Button>
    </CardContent>
  </Card>
);

const TemplateSelectionPage = () => {
  const handleSelectTemplate = (templateId: number) => {
    console.log(`Selected template: ${templateId}`);
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
