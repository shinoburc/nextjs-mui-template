
// reference: https://devlog.grapecity.co.jp/activereportsjs-nextjs-quickstart/

import type { NextPage } from "next";
import React from "react";
import { ViewerWrapperProps } from "@/app/activereports/_components/ReportViewer";

// 動的インポートを使用して、レポートビューワのラッパーをロードします。詳細については、「https://nextjs.org/docs/advanced-features/dynamic-import」を参照してください。
import dynamic from "next/dynamic";
const Viewer = dynamic<ViewerWrapperProps>(
  async () => {
    return (await import("@/app/activereports/_components/ReportViewer")).default;
  },
  { ssr: false }
);

const ActiveReportsPage: NextPage = () => {
  return (
    <div
      style={{ width: "100%", height: "100vh" }}
    >
      <Viewer
        reportUri="reports/my-report001.rdlx-json"
        language="ja"
      />
    </div>
  );
};

// <Viewer reportUri="reports/Invoice_green_ipa.rdlx-json" language="ja" />
export default ActiveReportsPage;