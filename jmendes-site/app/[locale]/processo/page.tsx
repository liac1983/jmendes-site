import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProcessHero from "@/components/sections/process/process-hero";
import ProcessStep from "@/components/sections/process/process-step";
import ProcessTimeline from "@/components/sections/process/process-timeline";
import { processSteps } from "@/data/process";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "processo");
}

export default function ProcessoPage() {
  return (
    <main>
      <ProcessHero />

      {processSteps.map((step, index) => (
        <ProcessStep
          key={step.number}
          number={step.number}
          stepKey={step.key}
          image={step.image}
          icon={step.icon}
          reverse={index % 2 === 1}
        />
      ))}

      <ProcessTimeline />
    </main>
  );
}
