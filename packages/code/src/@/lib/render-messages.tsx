import React from "react";
import { getParts } from "@/lib/get-parts";
import { renderCode } from "@/lib/render-code";
import { md5 } from "@/lib/md5";


export const renderMessage = (text: string, isUser: boolean): JSX.Element => (
    <>
      {getParts(text, isUser).map((part, index) => (
        <React.Fragment key={index + `-` + md5(part.content)}>
          {renderCode(part.content, part.language || "typescript", part.type)}
        </React.Fragment>
      ))}
    </>
  );
  