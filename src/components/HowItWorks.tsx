import { Send, SearchCheck, ShieldCheck } from "lucide-react";

interface HowItWorksProps {
  language: "EN" | "RU";
}

const steps = {
  EN: [
    {
      icon: Send,
      iconColor: "text-white",
      iconBg: "bg-[#0088cc]",
      text: "Copy signals from TG"
    },
    {
      icon: SearchCheck,
      iconColor: "text-white",
      iconBg: "bg-slate-600",
      text: "Verify prices with exchange"
    },
    {
      icon: ShieldCheck,
      iconColor: "text-white",
      iconBg: "bg-emerald-500",
      text: "Show honest P&L"
    }
  ],
  RU: [
    {
      icon: Send,
      iconColor: "text-white",
      iconBg: "bg-[#0088cc]",
      text: "Копируем сигналы из ТГ"
    },
    {
      icon: SearchCheck,
      iconColor: "text-white",
      iconBg: "bg-slate-600",
      text: "Сверяем цены с биржей"
    },
    {
      icon: ShieldCheck,
      iconColor: "text-white",
      iconBg: "bg-emerald-500",
      text: "Показываем честный P&L"
    }
  ]
};

const HowItWorks = ({ language }: HowItWorksProps) => {
  const content = steps[language];

  return (
    <section className="mb-6">
      <h2 className="text-base font-semibold text-foreground mb-3">
        {language === "EN" ? "How it works" : "Как это работает"}
      </h2>
      
      <div className="flex justify-between gap-2">
        {content.map((step, index) => {
          const Icon = step.icon;
          return (
            <div 
              key={index}
              className="flex-1 flex flex-col items-center text-center"
            >
              <div className={`w-10 h-10 rounded-full ${step.iconBg} flex items-center justify-center mb-2`}>
                <Icon className={`w-5 h-5 ${step.iconColor}`} strokeWidth={1.5} />
              </div>
              <p className="text-xs text-muted-foreground leading-tight">
                {step.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
