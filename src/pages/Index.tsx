import { useState, useMemo } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import StatsGrid from "@/components/StatsGrid";
import FiltersBar, { StatusFilter, DirectionFilter, PeriodFilter } from "@/components/FiltersBar";
import TradesTable from "@/components/TradesTable";
import { tradesData } from "@/data/trades";

const Index = () => {
  const [language, setLanguage] = useState<"EN" | "RU">("EN");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [directionFilter, setDirectionFilter] = useState<DirectionFilter>("All");
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("All time");

  const filteredTrades = useMemo(() => {
    return tradesData.filter((trade) => {
      if (statusFilter !== "All" && trade.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      if (directionFilter !== "All" && trade.direction !== directionFilter) {
        return false;
      }
      return true;
    });
  }, [statusFilter, directionFilter, periodFilter]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProfileHeader language={language} onLanguageChange={setLanguage} />
        <StatsGrid />
        <FiltersBar
          status={statusFilter}
          direction={directionFilter}
          period={periodFilter}
          onStatusChange={setStatusFilter}
          onDirectionChange={setDirectionFilter}
          onPeriodChange={setPeriodFilter}
        />
        <TradesTable trades={filteredTrades} />
      </div>
    </div>
  );
};

export default Index;
