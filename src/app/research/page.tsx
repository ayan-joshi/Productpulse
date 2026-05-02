import { Suspense } from "react";
import ResearchClient from "./ResearchClient";

export default function ResearchPage() {
  return (
    <Suspense>
      <ResearchClient />
    </Suspense>
  );
}
