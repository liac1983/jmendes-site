import ProcessHero from "@/components/sections/process/process-hero";
import ProcessStep from "@/components/sections/process/process-step";
import ProcessTimeline from "@/components/sections/process/process-timeline";
import { processSteps } from "@/data/process";

export default function ProcessoPage() {
  return (
    <main>
      <ProcessHero />

      {processSteps.map((step, index) => (
        <ProcessStep
          key={step.number}
          number={step.number}
          title={step.title}
          description={step.description}
          image={step.image}
          icon={step.icon}
          reverse={index % 2 === 1}
        />
      ))}

      <ProcessTimeline />
    </main>
  );
}
