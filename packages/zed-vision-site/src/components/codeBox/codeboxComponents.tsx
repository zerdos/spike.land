import { motion } from "framer-motion";
import * as React from "react";

import { ResultBox, ResultBoxContainer } from "./styledCodeBoxComps";

export interface ITransformed {
  hash: string;
  code: string[];
  renderedHash: string;
  rendered: string[];
}

export const HtmlPlayer: React.FC<{
  content: string;
  onEvent: (str: string) => void;
}> = (
  {
    content,
    onEvent,
  },
) =>
  <>
    <ResultBoxContainer
      onClick={(e) => {
        const clickedElement = e.target as Element;
        const clickEvent = clickedElement.getAttribute("data-onclick");
        if (clickEvent) onEvent(clickEvent);
      }}
      dangerouslySetInnerHTML={{ __html: String(content) }}
    />
  </>;

export const ResultComponent: React.FC<
  {
    transformed: ITransformed[];
    height?: number;
    events: string[];
    width?: number;
    onEvent: (srt: string) => void;
  }
> = (
  {
    height = "100%",
    width = "100%",
    transformed,
    onEvent,
    events,
  },
) => {
  // const x = useMotionValue(0);

  // const background = useTransform(
  //   x,
  //   [0, 300, 600],
  //   ["#ff008c", "#7700ff", "rgb(230, 255, 0)"],
  // );

  // const [{ xxx, yyy }, setIndexToShow] = React.useSta\te({ xxx: 0, yyy: 0 });
  const [{ content }, setContent] = React.useState(
    {
      content: transformed[0].rendered[transformed[0].rendered.length - 1] ||
        "<p></p>",
    },
  );

  React.useEffect(() => {
    setContent(
      {
        content: transformed[0].rendered[transformed[0].rendered.length - 1] ||
          "<p></p>",
      },
    );
  }, [transformed[0].renderedHash]);

  if (transformed[0].rendered.length === 0) {
    return <p>
      loading {transformed[0].renderedHash}
    </p>;
  }

  // function _html(x: number, y: number) {
  //   // console.log(rendered );
  //   return transformed[Number(x)] &&
  //       transformed[Number(x)].rendered[Number(y)] || "<p>uu</p>";
  // }transformed[Number(x)].rendered[Number(y)];

  const divLength = 1000 / (events.length + 1);

  // const transCopy = [...transformed].map((t)=>{t.rendered=[...t.rendered].reverse(); return t;});

  return (<div
    style={{
      position: "relative",
      textAlign: "right",
      width,
    }}
  >
    {transformed.map((t, k) =>
      <div key={t.renderedHash + k}>
        ss {t.renderedHash}ss
        {events.map((event, renderContentKey) =>
          <div
            onMouseEnter={() =>
              setContent({ content: t.rendered[renderContentKey] })}
            style={{
              display: "inline-block",
              textAlign: "center",
              borderLeft: "1px solid red",
              height: "20px",
              width: divLength,
            }}
            key={t.renderedHash + renderContentKey}
          >
            {event}
          </div>
        )}
      </div>
    )}

    <motion.div
      // layout
      drag={true}
      dragElastic={0.1}
      dragMomentum={false}
      dragListener={true}
      // onDrag={(event) => {
      //   const e = event as unknown as { layerX: number; layerY: number };
      //   // const htmlArray = new Array(100).fill(100);
      //   //console.log(event.layerY );

      //   const indexMaxY = transformed[0].rendered.length;

      //   let newIndexY = Math.floor(
      //     (indexMaxY * (e.layerY + 220)) / 200,
      //   );
      //   // console.log(event.layerY, newIndexY );
      //   if (newIndexY < 0) {
      //     newIndexY = 0;
      //   }
      //   if (newIndexY >= indexMaxY) {
      //     newIndexY = indexMaxY - 1;
      //   }

      //   const indexMax = transformed.length;

      //   let newIndex = Math.floor(
      //     (indexMax * (e.layerX + 909)) / 1000,
      //   );

      //   if (newIndex < 0) {
      //     // setIndexToShow({ yyy: newIndexY, xxx: 0 });
      //   }
      //   if (newIndex > indexMax) {
      //     // setIndexToShow({ yyy: newIndexY, xxx: indexMaxY });
      //     return;
      //   }

      //   setIndexToShow({ yyy: newIndexY, xxx: newIndex });
      // }}
      style={{ position: "absolute", top: -220, right: 40 }}
    >
      <ResultBox>
        <HtmlPlayer
          key={content}
          content={content}
          onEvent={onEvent}
        />
      </ResultBox>
    </motion.div>
  </div>);
};
