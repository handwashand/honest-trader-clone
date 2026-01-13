import { Send, SearchCheck, ShieldCheck } from "lucide-react";

interface HowItWorksProps {
  language: "EN" | "RU";
}

const steps = {
  EN: [
    {
      icon: Send,
      iconColor: "text-[#0088cc]",
      iconBg: "bg-[#0088cc]/10",
      title: "Collecting signals",
      description: "Auto-collection of trades from top channels 24/7"
    },
    {
      icon: SearchCheck,
      iconColor: "text-slate-600",
      iconBg: "bg-slate-100",
      title: "Exchange verification",
      description: "Every price checked against Binance and Bybit data"
    },
    {
      icon: ShieldCheck,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
      title: "Honest P&L",
      description: "Only real stats without edits or deletions"
    }
  ],
  RU: [
    {
      icon: Send,
      iconColor: "text-[#0088cc]",
      iconBg: "bg-[#0088cc]/10",
      title: "Копируем сигналы",
      description: "Авто-сбор сделок из топ-каналов 24/7"
    },
    {
      icon: SearchCheck,
      iconColor: "text-slate-600",
      iconBg: "bg-slate-100",
      title: "Сверяем с биржей",
      description: "Проверка каждой цены по данным Binance и Bybit"
    },
    {
      icon: ShieldCheck,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
      title: "Честный P&L",
      description: "Только реальная статистика без правок и удалений"
    }
  ]
};

const HowItWorks = ({ language }: HowItWorksProps) => {
  const content = steps[language];

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        {language === "EN" ? "How it works" : "Как это работает"}
      </h2>
      
      <div className="space-y-3">
        {content.map((step, index) => {
          const Icon = step.icon;
          return (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border"
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${step.iconBg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${step.iconColor}`} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-base">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
