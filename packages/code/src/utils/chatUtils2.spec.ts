import { updateSearchReplace } from "@/workers/chat-utils.worker";
import { readFile } from "node:fs/promises";
import { expect, test } from "vitest";

test("should update search replace2", async () => {
  const original = await readFile(__dirname + "/aclock2-orig.txt", "utf8");
  const instructions = await readFile(__dirname + "/inst2.txt", "utf8");

  const r1 = await updateSearchReplace({ instructions, code: original });
  expect(r1.len).toMatchInlineSnapshot(`6663`);

  const v2 = await updateSearchReplace({
    instructions: instructions.slice(r1.len),
    code: r1.result,
  });
  expect(v2.len).toMatchInlineSnapshot(`7785`);

  const v3 = await updateSearchReplace({
    instructions: instructions.slice(r1.len + v2.len),
    code: v2.result,
  });
  expect(v3.len).toMatchInlineSnapshot(`1243`);

  expect(v3.result).toMatchInlineSnapshot(`
    "import React, { useEffect, useState } from "react";
    import type { FC } from "react";

    export const SportyClock: FC = () => {
      const [time, setTime] = useState(new Date());

      useEffect(() => {
        const timer = setInterval(() =>(new Date());
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      }, []);

      const hours = time.getHours() % 12;
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      const hourDegrees = (hours + minutes / 60) * 30;
      const minuteDegrees = (minutes + seconds / 60) * 6;
      const secondDegrees = seconds * 6;

      return (
        <div className="relative flex items-center justify-center min-h-screen bg-blue-600 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700/50 via-gray-900/30 to-black/20"></div>
          <div className="w-96 h-96 sm:w-[28rem] sm:h-[28rem] md:w-[32rem] md:h-[32rem] rounded-full shadow-2xl bg-[#2C3E50] backdrop-blur-md p-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-3xl z-10 border-2 border-white/30 relative">
            {/* Clock face */}
            <div className="w-full h-full rounded-full border-8 border-[#34495E] relative">
              {/* Hour markers */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-[#95A5A6] rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: \`rotate(\${i * 30}deg) translate(0, -11.5rem)\`,
                  }}
                />
              ))}
              {/* Clock numbers */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-white text-2xl font-bold"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: \`rotate(\${i * 30}deg) translate(0, -9rem) rotate(-\${i * 30}deg)\`,
                  }}
                >
                  {i === 0 ? 12 : i}
                </div>
              ))}
              {/* Hour hand */}
              <div
                className="absolute top-1/2 left-1/2 w-2 h-24 bg-[#C0392B] rounded-full origin-bottom transform -translate-x-1/2"
                style={{ transform: \`rotate(\${hourDegrees}deg)\` }}
              />
              {/* Minute hand */}
              <div
                className="absolute top-1/2 left-1/2 w-1.5 h-32 bg-[#566573] rounded-full origin-bottom transform -translate-x-1/2"
                style={{ transform: \`egrees}deg)\` }}
              />
              {/* Second hand */}
              <div
                className="absolute top-1/2 left-1/2 w-1 h-36 bg-[#D35400] rounded- -translate-x-1/2"
                style={{ transform: \`rotate(\${secondDegrees}deg)\` }}
              />
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#ECF0F1] border-2 border-[#34495E] rounded-full transform -translate-x-1/2 -translate-y-1/2" />
              {/* Digital time display */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-12 text-white text-2xl font-bold">
                {\`\${hours.toString().padStart(2, "0")}:\${minutes.toString().padStart(2, "0")}:\${seconds.toString().padStart(2, "0")}\`}
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default SportyClock;"
  `);
});
