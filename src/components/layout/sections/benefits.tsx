"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { icons } from "lucide-react";
import { Icon } from "@/src/components/ui/icon";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "FolderOpen",
    title: "Enhanced File Interaction",
    description:
      "Effortlessly search and interact with your local files using AI. Perform advanced operations such as content analysis and information extraction.",
  },
  {
    icon: "Search",
    title: "Streamlined Data Retrieval",
    description:
      "Quickly locate files and folders across your local storage with intuitive search functionality powered by AI-driven insights.",
  },
  {
    icon: "ChartBar",
    title: "Data-Driven File Insights",
    description:
      "Unlock deeper understanding by generating summaries and extracting key information from your files for higher efficiency and productivity.",
  },
  {
    icon: "Lightbulb",
    title: "Innovative File Management",
    description:
      "Experiment with new ways to manage and organize your files, utilizing AI to streamline complex tasks and boost your workflow.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Streamline Your Workflow with Ease{" "}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Effortlessly manage, analyze, and retrieve your local file data
            using AI-driven technology, designed to simplify tasks and enhance
            productivity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
