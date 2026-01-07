export interface Trade {
  id: number;
  date: string;
  pair: string;
  direction: "LONG" | "SHORT";
  leverage: string;
  result: string;
  pnl: number;
  status: "ACTIVE" | "Closed" | "EXPIRED";
}

export const tradesData: Trade[] = [
  { id: 1, date: "2024-03-15 14:32", pair: "BTC/USDT", direction: "LONG", leverage: "10x", result: "+12.5%", pnl: 1250.00, status: "Closed" },
  { id: 2, date: "2024-03-15 11:20", pair: "ETH/USDT", direction: "LONG", leverage: "5x", result: "+8.3%", pnl: 415.00, status: "Closed" },
  { id: 3, date: "2024-03-14 22:45", pair: "SOL/USDT", direction: "SHORT", leverage: "20x", result: "-4.2%", pnl: -420.00, status: "Closed" },
  { id: 4, date: "2024-03-14 16:10", pair: "XRP/USDT", direction: "LONG", leverage: "10x", result: "+15.8%", pnl: 790.00, status: "Closed" },
  { id: 5, date: "2024-03-14 09:55", pair: "DOGE/USDT", direction: "LONG", leverage: "5x", result: "+6.1%", pnl: 305.00, status: "Closed" },
  { id: 6, date: "2024-03-13 20:30", pair: "BNB/USDT", direction: "SHORT", leverage: "10x", result: "+9.4%", pnl: 470.00, status: "Closed" },
  { id: 7, date: "2024-03-13 15:22", pair: "ADA/USDT", direction: "LONG", leverage: "15x", result: "-2.8%", pnl: -280.00, status: "Closed" },
  { id: 8, date: "2024-03-13 08:45", pair: "AVAX/USDT", direction: "LONG", leverage: "10x", result: "+11.2%", pnl: 560.00, status: "Closed" },
  { id: 9, date: "2024-03-12 21:15", pair: "MATIC/USDT", direction: "SHORT", leverage: "20x", result: "+18.5%", pnl: 925.00, status: "Closed" },
  { id: 10, date: "2024-03-12 14:40", pair: "LINK/USDT", direction: "LONG", leverage: "5x", result: "+4.7%", pnl: 235.00, status: "Closed" },
  { id: 11, date: "2024-03-12 10:00", pair: "DOT/USDT", direction: "LONG", leverage: "10x", result: "+7.9%", pnl: 395.00, status: "ACTIVE" },
  { id: 12, date: "2024-03-11 19:25", pair: "ATOM/USDT", direction: "SHORT", leverage: "15x", result: "-5.3%", pnl: -530.00, status: "EXPIRED" },
  { id: 13, date: "2024-03-11 12:50", pair: "UNI/USDT", direction: "LONG", leverage: "10x", result: "+13.6%", pnl: 680.00, status: "Closed" },
  { id: 14, date: "2024-03-11 07:30", pair: "FTM/USDT", direction: "LONG", leverage: "20x", result: "+22.1%", pnl: 1105.00, status: "ACTIVE" },
  { id: 15, date: "2024-03-10 23:15", pair: "NEAR/USDT", direction: "SHORT", leverage: "10x", result: "+8.8%", pnl: 440.00, status: "ACTIVE" },
];
