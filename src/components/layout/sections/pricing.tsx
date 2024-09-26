import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "Basic",
    popular: PopularPlan.NO,
    price: 0,
    description:
      "A great starting point to explore AI-powered file interactions and search.",
    buttonText: "Start Free",
    benefitList: [
      "AI-powered file search",
      "Limited content analysis",
      "5 file uploads per day",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    popular: PopularPlan.YES,
    price: 45,
    description:
      "Advanced file interaction capabilities with enhanced AI features for professionals.",
    buttonText: "Get Started",
    benefitList: [
      "AI file search and retrieval",
      "Comprehensive content analysis",
      "Unlimited file uploads",
      "Priority support",
      "Advanced AI insights",
    ],
  },
  {
    title: "Enterprise",
    popular: PopularPlan.NO,
    price: 120,
    description:
      "For large teams requiring AI-driven insights and file management at scale.",
    buttonText: "Contact Us",
    benefitList: [
      "Custom AI file processing",
      "Detailed content analysis & extraction",
      "Unlimited file storage",
      "Dedicated account manager",
      "Enterprise-grade security",
    ],
  },
];

export const PricingSection = () => {
  return (
    <section className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Pricing
      </h2>
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Unlock AI-Powered File Insights
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        Choose the plan that best suits your file management needs and start
        leveraging the power of AI.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map(
          ({ title, popular, price, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan?.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div>
                  <span className="text-3xl font-bold">${price}</span>
                  <span className="text-muted-foreground"> /month</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant={
                    popular === PopularPlan?.YES ? "default" : "secondary"
                  }
                  className="w-full"
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
