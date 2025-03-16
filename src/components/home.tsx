import React, { useState } from "react";
import FilterSidebar from "./datasets/FilterSidebar";
import DatasetCatalog from "./datasets/DatasetCatalog";
import DatasetDetailModal from "./datasets/DatasetDetailModal";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";

interface HomeProps {
  username?: string;
}

const Home: React.FC<HomeProps> = ({ username = "Researcher" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock dataset for the detail modal
  const mockDataset = {
    id: "ds-123",
    name: "Multimodal Depression Assessment Dataset",
    description:
      "A comprehensive dataset containing neuroimaging, clinical assessments, and questionnaire data from 500 participants with major depressive disorder and 500 healthy controls. Data was collected between 2018-2022 across five clinical sites.",
    dataTypes: [
      "MRI",
      "fMRI",
      "Questionnaires",
      "Clinical Notes",
      "Demographic Data",
    ],
    sampleData: {
      imaging: { count: 1000, types: ["T1", "T2", "fMRI"] },
      questionnaires: { count: 15, examples: ["PHQ-9", "GAD-7", "MADRS"] },
      demographics: {
        ageRange: "18-65",
        genderDistribution: "55% female, 45% male",
      },
    },
    publications: [
      {
        title:
          "Neural correlates of depression severity in a multimodal assessment study",
        authors: "Johnson, A., Smith, B., et al.",
        journal: "Journal of Psychiatric Research",
        year: 2022,
        doi: "10.1000/xyz123",
      },
      {
        title:
          "Machine learning approaches to depression prediction using multimodal data",
        authors: "Williams, C., Brown, D., et al.",
        journal: "Nature Psychiatry",
        year: 2023,
        doi: "10.1000/abc456",
      },
    ],
    citationText:
      "Johnson, A., Smith, B., et al. (2022). Neural correlates of depression severity in a multimodal assessment study. Journal of Psychiatric Research. https://doi.org/10.1000/xyz123",
    citationCount: 42,
  };

  const handleDatasetClick = (datasetId: string) => {
    setSelectedDataset(datasetId);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const handleFilterChange = (filters: any) => {
    console.log("Filters applied:", filters);
    // Here you would typically fetch filtered datasets
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Navigation Bar */}
      <header className="h-16 border-b flex items-center justify-between px-4 bg-white z-10">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <div className="font-bold text-xl">Clinical Dataset Hub</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search all datasets..."
              className="pl-10 pr-4 py-2 border rounded-full w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:block text-sm">Welcome, {username}</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = "/account")}
              className="text-sm font-medium"
            >
              My Account
            </Button>
            <div
              className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer"
              onClick={() => (window.location.href = "/account")}
            >
              {username.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden">
            <div className="w-64 h-full bg-white">
              <FilterSidebar
                onFilterChange={handleFilterChange}
                className="h-full"
              />
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        {sidebarOpen && (
          <div className="hidden md:block w-[280px] border-r">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-white">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex mr-2"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">Dataset Catalog</h1>
            </div>
            <div className="text-sm text-gray-500">
              Showing datasets for clinical psychiatry research
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <DatasetCatalog
              onDatasetClick={handleDatasetClick}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {/* Dataset Detail Modal */}
      {showDetailModal && (
        <DatasetDetailModal
          dataset={mockDataset}
          isOpen={showDetailModal}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default Home;
