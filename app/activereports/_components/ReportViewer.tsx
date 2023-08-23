"use client";

import { Viewer } from "@grapecity/activereports-react";
import { Props as ViewerProps } from "@grapecity/activereports-react";
import { FontStore } from "@grapecity/activereports/core";
import "@grapecity/activereports/pdfexport";
import "@grapecity/activereports-localization";
import React from "react";

// レポートビューワのデフォルトのテーマをインポートします。
import "@grapecity/activereports/styles/ar-js-ui.css";
import "@grapecity/activereports/styles/ar-js-viewer.css";

const ViewerWrapper = (props: ViewerWrapperProps) => {
  const ref = React.useRef<Viewer>(null);
  React.useEffect(() => {
    ref.current?.Viewer.open(props.reportUri);
    FontStore.registerFonts({
      name: "IPAゴシック",
      source: "fonts/ipag.ttf",
    });
  }, [props.reportUri]);
  return <Viewer {...props} ref={ref} />;
};
export type ViewerWrapperProps = ViewerProps & { reportUri: string };
export default ViewerWrapper;