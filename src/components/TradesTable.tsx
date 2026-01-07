import { Image } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trade } from "@/data/trades";

interface TradesTableProps {
  trades: Trade[];
}

const TradesTable = ({ trades }: TradesTableProps) => {
  const getStatusClass = (status: Trade["status"]) => {
    switch (status) {
      case "ACTIVE":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "Closed":
        return "bg-muted text-muted-foreground border-border";
      case "EXPIRED":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "";
    }
  };

  const getDirectionClass = (direction: Trade["direction"]) => {
    return direction === "LONG" 
      ? "bg-profit/20 text-profit" 
      : "bg-loss/20 text-loss";
  };

  const getPnlClass = (pnl: number) => {
    return pnl >= 0 ? "text-profit" : "text-loss";
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Trade History</h2>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Signal</TableHead>
              <TableHead className="text-muted-foreground font-medium">№</TableHead>
              <TableHead className="text-muted-foreground font-medium">Date</TableHead>
              <TableHead className="text-muted-foreground font-medium">Pair</TableHead>
              <TableHead className="text-muted-foreground font-medium">Direction</TableHead>
              <TableHead className="text-muted-foreground font-medium">Leverage</TableHead>
              <TableHead className="text-muted-foreground font-medium">Result</TableHead>
              <TableHead className="text-muted-foreground font-medium">P&L</TableHead>
              <TableHead className="text-muted-foreground font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow key={trade.id} className="border-border">
                <TableCell>
                  <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                    <Image className="w-5 h-5 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">#{trade.id}</TableCell>
                <TableCell className="text-foreground whitespace-nowrap">{trade.date}</TableCell>
                <TableCell className="text-foreground font-medium">{trade.pair}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDirectionClass(trade.direction)}`}>
                    {trade.direction}
                  </span>
                </TableCell>
                <TableCell className="text-foreground">{trade.leverage}</TableCell>
                <TableCell className={getPnlClass(trade.pnl)}>{trade.result}</TableCell>
                <TableCell className={getPnlClass(trade.pnl)}>
                  {trade.pnl >= 0 ? "+" : ""}{trade.pnl.toFixed(2)} USDT
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusClass(trade.status)}`}>
                    {trade.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TradesTable;
