import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
      question: "Is NeuroInsight.ai suitable for individual use?",
      answer: "Yes, NeuroInsight.ai is designed for both individual and team use, offering flexible plans to cater to different needs.",
      value: "item-1",
  },
  {
      question: "How does AI-driven content analysis work?",
      answer: "NeuroInsight.ai uses advanced AI models to analyze, summarize, and extract insights from your files, offering actionable summaries and detailed information extraction.",
      value: "item-2",
  },
  {
      question: "What types of files are supported?",
      answer: "The platform supports a wide range of file formats including PDFs, Word documents, text files, and more, with the ability to expand to additional file types based on user demand.",
      value: "item-3",
  },
  {
      question: "How secure is my data on NeuroInsight.ai?",
      answer: "We prioritize security with encryption in transit and at rest, ensuring your data is protected while using our services.",
      value: "item-4",
  },
  {
      question: "Can I integrate NeuroInsight.ai with other tools?",
      answer: "Yes, NeuroInsight.ai provides API access and integrations with popular tools to enable seamless workflows.",
      value: "item-5",
  },
];

export const FAQSection = () => {
  return (
      <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
          <div className="text-center mb-8">
              <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
                  FAQS
              </h2>

              <h2 className="text-3xl md:text-4xl text-center font-bold">
                  Common Questions
              </h2>
          </div>

          <Accordion type="single" collapsible className="AccordionRoot">
              {FAQList.map(({ question, answer, value }) => (
                  <AccordionItem key={value} value={value}>
                      <AccordionTrigger className="text-left">
                          {question}
                      </AccordionTrigger>

                      <AccordionContent>{answer}</AccordionContent>
                  </AccordionItem>
              ))}
          </Accordion>
      </section>
  );
};
