import FilterTabs from "./FilterTabs";

export type StatusFilter = "All" | "Active" | "Closed" | "Expired";
export type DirectionFilter = "All" | "LONG" | "SHORT";
export type PeriodFilter = "Week" | "Month" | "90d" | "All time";

interface FiltersBarProps {
  status: StatusFilter;
  direction: DirectionFilter;
  period: PeriodFilter;
  onStatusChange: (status: StatusFilter) => void;
  onDirectionChange: (direction: DirectionFilter) => void;
  onPeriodChange: (period: PeriodFilter) => void;
}

const FiltersBar = ({
  status,
  direction,
  period,
  onStatusChange,
  onDirectionChange,
  onPeriodChange,
}: FiltersBarProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <FilterTabs
        options={["All", "Active", "Closed", "Expired"] as StatusFilter[]}
        selected={status}
        onChange={onStatusChange}
      />
      <FilterTabs
        options={["All", "LONG", "SHORT"] as DirectionFilter[]}
        selected={direction}
        onChange={onDirectionChange}
        variant="direction"
      />
      <FilterTabs
        options={["Week", "Month", "90d", "All time"] as PeriodFilter[]}
        selected={period}
        onChange={onPeriodChange}
      />
    </div>
  );
};

export default FiltersBar;
