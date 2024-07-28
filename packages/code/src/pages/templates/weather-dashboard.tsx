import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";
import { useState } from "react";
import type {FC} from "react";


const WeatherIcon: FC<{condition: string}> = ({ condition }) => {
  switch (condition) {
    case "Sunny":
      return <Sun className="w-12 h-12 text-yellow-400" />;
    case "Cloudy":
      return <Cloud className="w-12 h-12 text-gray-400" />;
    case "Rainy":
      return <CloudRain className="w-12 h-12 text-blue-400" />;
    default:
      return <Wind className="w-12 h-12 text-gray-600" />;
  }
};

const WeatherDashboard = () => {
  const [city, setCity] = useState("New York");

  // Mock weather data
  const currentWeather = {
    temperature: 72,
    condition: "Sunny",
    humidity: 60,
    windSpeed: 5,
  };

  const forecast = [
    { day: "Mon", temperature: 70, condition: "Sunny" },
    { day: "Tue", temperature: 68, condition: "Cloudy" },
    { day: "Wed", temperature: 72, condition: "Rainy" },
    { day: "Thu", temperature: 75, condition: "Sunny" },
    { day: "Fri", temperature: 71, condition: "Cloudy" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Weather Dashboard</h1>
            <div className="flex w-full md:w-auto">
              <Input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mr-2"
              />
              <Button>Search</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">{city}</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-5xl font-bold">{currentWeather.temperature}°F</p>
                    <p className="text-gray-600">{currentWeather.condition}</p>
                  </div>
                  <WeatherIcon condition={currentWeather.condition} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Humidity</p>
                    <p className="text-xl font-semibold">{currentWeather.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Wind Speed</p>
                    <p className="text-xl font-semibold">{currentWeather.windSpeed} mph</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">5-Day Forecast</h2>
                <div className="grid grid-cols-5 gap-2">
                  {forecast.map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="font-semibold">{day.day}</p>
                      <WeatherIcon condition={day.condition} />
                      <p>{day.temperature}°F</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDashboard;
