import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LightbulbIcon, ArrowRight } from "lucide-react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Button } from "@/components/ui/button";

interface Suggestion {
  title: string;
  description: string;
}

interface SuggestionsProps {
  content: string;
  onAction?: (suggestion: Suggestion) => void;
}

const parseSuggestions = (content: string): Suggestion[] => {
  const suggestions: Suggestion[] = [];
  const matches = content.matchAll(
    /<suggestion>\s*<title>(.*?)<\/title>\s*<description>(.*?)<\/description>\s*<\/suggestion>/gs
  );

  for (const match of matches) {
    if (match[1] && match[2]) {
      suggestions.push({
        title: match[1].trim(),
        description: match[2].trim(),
      });
    }
  }

  return suggestions;
};

export const Suggestions: React.FC<SuggestionsProps> = ({ content, onAction }) => {
  const suggestions = parseSuggestions(content);
  const { isDarkMode } = useDarkMode();

  return (
    <Card
      className={`w-full mx-auto border-none shadow-lg ${
        isDarkMode ? "bg-gray-800/90" : "bg-white/90"
      }`}
    >
      <CardHeader className="bg-gradient-to-r from-violet-700 to-indigo-800 py-2 sm:py-3 rounded-t-lg">
        <CardTitle className="text-base sm:text-lg font-semibold text-white flex items-center">
          <LightbulbIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
          Suggested Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 grid gap-2 sm:gap-3">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            className={`w-full group relative overflow-hidden ${
              isDarkMode
                ? "hover:bg-gray-700/50 border-gray-700"
                : "hover:bg-gray-50 border-gray-200"
            } p-2 sm:p-4 text-left h-auto flex flex-col items-start transition-all duration-200 hover:scale-[1.02]`}
            onClick={() => onAction?.(suggestion)}
          >
            <div className="flex items-start gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 w-full">
              <div className="bg-gradient-to-br from-violet-500 to-indigo-600 p-1 sm:p-1.5 rounded-md shadow-sm flex-shrink-0 mt-0.5">
                <LightbulbIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
              </div>
              <span
                className={`font-semibold text-sm sm:text-base ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                } whitespace-normal break-words leading-[1.4] sm:leading-relaxed flex-grow`}
              >
                {suggestion.title}
              </span>
              <ArrowRight
                className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transform transition-transform duration-200 flex-shrink-0 mt-0.5 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } group-hover:translate-x-1`}
              />
            </div>
            <p
              className={`text-xs sm:text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } pl-6 sm:pl-8 font-medium whitespace-normal break-words leading-[1.4] sm:leading-relaxed`}
              style={{ maxWidth: '100%', wordBreak: 'break-word' }}
            >
              {suggestion.description}
            </p>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

// Example usage
const suggestionsContent = `
c. Suggestions:
<suggestion>
   <title>Add user preference persistence</title>
   <description>Implement local storage to remember the user's theme preference across sessions, enhancing the user experience.</description>
</suggestion>

<suggestion>
   <title>Implement smooth transition between modes</title>
   <description>Add transition effects when switching between dark and light modes to create a more polished user interface.</description>
</suggestion>
`;

const SuggestionsExample: React.FC = () => {
  const handleAction = (suggestion: Suggestion) => {
    console.log("Action clicked:", suggestion);
  };

  return <Suggestions content={suggestionsContent} onAction={handleAction} />;
};

export default SuggestionsExample;
