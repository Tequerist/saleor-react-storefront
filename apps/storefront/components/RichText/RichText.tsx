import Blocks from "editorjs-blocks-react-renderer";
import React from "react";

import { parseEditorJSData } from "@/lib/util";

export interface RichTextProps {
  jsonStringData?: string;
}

export function RichText({ jsonStringData }: RichTextProps) {
  const data = parseEditorJSData(jsonStringData);
  if (!data) {
    return null;
  }

  return (
    <article className="prose-2xl !mt-0 font-normal text-gray-500">
      <Blocks data={data} />
    </article>
  );
}

export default RichText;
