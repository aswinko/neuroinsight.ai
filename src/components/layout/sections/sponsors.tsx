"use client";

import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
interface sponsorsProps {
  icon: string;
  name: string;
}

const sponsors: sponsorsProps[] = [
  {
    icon: "/icons/next.png",
    name: "Next.js",
  },
  {
    icon: "/icons/TailwindCSS.svg",
    name: "Tailwindcss",
  },
  {
    icon: "/icons/MongoDB.svg",
    name: "Mongodb",
  },
  {
    icon: "/icons/auth.png",
    name: "Auth.js",
  },
  {
    icon: "/icons/llama.svg",
    name: "Ollama 3",
  },
  {
    icon: "/icons/shadcnui.svg",
    name: "Shadcn",
  },
  {
    icon: "/icons/vercel.svg",
    name: "Vercel",
  },
];

export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="max-w-[75%] mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center text-primary mb-2 tracking-wider pb-6">
        Technology Used
      </h2>

      <div className="mx-auto bg-card rounded-full py-4 md:py-12">
        <Marquee
          className="gap-[3rem]"
          fade
          innerClassName="gap-[3rem]"
          pauseOnHover
        >
          {sponsors.map(({ icon, name }) => (
            <div
              key={name}
              className="flex items-center text-sm md:text-2xl font-medium"
            >
              <img
                src={icon}
                width={32}
                className="mr-2"
              />
              {name}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};