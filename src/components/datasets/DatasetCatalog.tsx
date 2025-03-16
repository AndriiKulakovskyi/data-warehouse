import React, { useState } from "react";
import DatasetCard from "./DatasetCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Grid, List, SlidersHorizontal } from "lucide-react";

interface Dataset {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  dataTypes: string[];
  isAvailable: boolean;
  publicationDate: string;
  institution: string;
  citations: number;
}

interface DatasetCatalogProps {
  datasets?: Dataset[];
  onDatasetClick?: (datasetId: string) => void;
  onFilterChange?: (filters: any) => void;
  totalDatasets?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const DatasetCatalog = ({
  datasets = [
    {
      id: "dataset-1",
      title: "Neuroimaging Dataset for Depression Studies",
      description:
        "A comprehensive collection of MRI and fMRI scans from patients with major depressive disorder and healthy controls.",
      imageUrl:
        "https://media.istockphoto.com/id/1173351472/photo/human-brain.jpg?s=612x612&w=0&k=20&c=oyScKiElzYs1lotxyxXQpSsyQXlGJby7qB-VXHp0g1k=",
      dataTypes: ["MRI", "fMRI", "Questionnaires"],
      isAvailable: true,
      publicationDate: "2023-05-15",
      institution: "University Medical Center",
      citations: 42,
    },
    {
      id: "dataset-2",
      title: "Anxiety Disorder EEG Collection",
      description:
        "Electroencephalogram recordings from patients with various anxiety disorders during rest and stress-inducing tasks.",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
      dataTypes: ["EEG", "Questionnaires", "Clinical Notes"],
      isAvailable: true,
      publicationDate: "2022-11-30",
      institution: "Psychiatric Research Institute",
      citations: 28,
    },
    {
      id: "dataset-3",
      title: "Schizophrenia Longitudinal Study Data",
      description:
        "10-year longitudinal study tracking cognitive, behavioral, and neurological changes in schizophrenia patients.",
      imageUrl:
        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&q=80",
      dataTypes: ["MRI", "Cognitive Tests", "Clinical Notes"],
      isAvailable: false,
      publicationDate: "2021-08-12",
      institution: "National Mental Health Research Center",
      citations: 103,
    },
    {
      id: "dataset-4",
      title: "PTSD Voice Analysis Database",
      description:
        "Audio recordings and voice pattern analysis from PTSD patients during therapy sessions and controlled interviews.",
      imageUrl:
        "https://images.unsplash.com/photo-1516981879613-9f5da904015f?w=400&q=80",
      dataTypes: ["Audio", "Transcripts", "Questionnaires"],
      isAvailable: true,
      publicationDate: "2023-02-28",
      institution: "Veterans Health Research Collaborative",
      citations: 17,
    },
    {
      id: "dataset-5",
      title: "Bipolar Disorder Medication Response",
      description:
        "Clinical trial data on medication responses, side effects, and outcomes for bipolar disorder treatments.",
      imageUrl:
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80",
      dataTypes: ["Clinical Trials", "Blood Work", "Questionnaires"],
      isAvailable: true,
      publicationDate: "2022-06-10",
      institution: "University Psychiatric Department",
      citations: 56,
    },
    {
      id: "dataset-6",
      title: "Adolescent Mental Health Survey",
      description:
        "Comprehensive survey data on mental health indicators among adolescents aged 12-18 across multiple countries.",
      imageUrl:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80",
      dataTypes: ["Surveys", "Questionnaires", "Demographics"],
      isAvailable: true,
      publicationDate: "2023-01-15",
      institution: "Child & Adolescent Psychology Institute",
      citations: 31,
    },
  ],
  onDatasetClick = (id) => console.log(`Dataset ${id} clicked`),
  onFilterChange = (filters) => console.log("Filters changed:", filters),
  totalDatasets = 42,
  currentPage = 1,
  onPageChange = (page) => console.log(`Page changed to ${page}`),
}: DatasetCatalogProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Calculate total pages
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalDatasets / itemsPerPage);

  // Handle dataset card click
  const handleDatasetClick = (id: string) => {
    onDatasetClick(id);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-4 overflow-y-auto">
      {/* Top controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-auto flex-1 max-w-md">
          <Input
            placeholder="Search datasets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="citations">Most Cited</SelectItem>
              <SelectItem value="az">A-Z</SelectItem>
              <SelectItem value="za">Z-A</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Results count */}
      <div className="mb-4 text-sm text-gray-500">
        Showing{" "}
        {Math.min(
          itemsPerPage,
          totalDatasets - (currentPage - 1) * itemsPerPage,
        )}{" "}
        of {totalDatasets} datasets
      </div>
      {/* Dataset grid */}
      <div
        className={
          ` ${viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"} ` +
          " justify-center items-start"
        }
      >
        {datasets.map((dataset) => (
          <div
            key={dataset.id}
            className={viewMode === "list" ? "w-full" : ""}
            onClick={() => handleDatasetClick(dataset.id || "")}
          >
            <DatasetCard
              id={dataset.id}
              title={dataset.title}
              description={dataset.description}
              imageUrl={dataset.imageUrl}
              dataTypes={dataset.dataTypes}
              isAvailable={dataset.isAvailable}
              publicationDate={dataset.publicationDate}
              institution={dataset.institution}
              citations={dataset.citations}
            />
          </div>
        ))}
      </div>
      {/* Empty state */}
      {datasets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-gray-100 p-6 mb-4">
            <SlidersHorizontal className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No datasets found</h3>
          <p className="text-gray-500 max-w-md mb-6">
            Try adjusting your search or filter criteria to find what you're
            looking for.
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSortBy("recent");
              onFilterChange({});
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
      {/* Pagination */}
      {datasets.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) onPageChange(currentPage - 1);
                  }}
                  className={
                    currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(pageNum);
                      }}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(totalPages);
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) onPageChange(currentPage + 1);
                  }}
                  className={
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DatasetCatalog;
