import { useState, useMemo } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import HowItWorks from "@/components/HowItWorks";
import StatsGrid from "@/components/StatsGrid";
import TradesTable from "@/components/TradesTable";
import OtherTraders from "@/components/OtherTraders";
import { tradesData } from "@/data/trades";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

const Index = () => {
  const [language, setLanguage] = useState<"EN" | "RU">("EN");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tradesData.length / ITEMS_PER_PAGE);
  
  const paginatedTrades = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return tradesData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProfileHeader language={language} onLanguageChange={setLanguage} />
        <HowItWorks language={language} />
        <StatsGrid language={language} />
        <TradesTable trades={paginatedTrades} language={language} />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <OtherTraders language={language} />
      </div>
    </div>
  );
};

export default Index;