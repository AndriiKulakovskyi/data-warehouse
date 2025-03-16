import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, FilterIcon, XIcon } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
  className?: string;
}

interface FilterState {
  dataTypes: {
    imaging: boolean;
    questionnaires: boolean;
    clinicalNotes: boolean;
    genomics: boolean;
    physiological: boolean;
  };
  availability: {
    public: boolean;
    restricted: boolean;
    private: boolean;
  };
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  sampleSize: [number, number];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onFilterChange = () => {},
  className = "",
}) => {
  const [filters, setFilters] = useState<FilterState>({
    dataTypes: {
      imaging: false,
      questionnaires: false,
      clinicalNotes: false,
      genomics: false,
      physiological: false,
    },
    availability: {
      public: false,
      restricted: false,
      private: false,
    },
    dateRange: {
      from: undefined,
      to: undefined,
    },
    sampleSize: [0, 10000],
  });

  const handleDataTypeChange = (type: keyof FilterState["dataTypes"]) => {
    const newFilters = {
      ...filters,
      dataTypes: {
        ...filters.dataTypes,
        [type]: !filters.dataTypes[type],
      },
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAvailabilityChange = (
    type: keyof FilterState["availability"],
  ) => {
    const newFilters = {
      ...filters,
      availability: {
        ...filters.availability,
        [type]: !filters.availability[type],
      },
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateRangeChange = (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    const newFilters = {
      ...filters,
      dateRange: range,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSampleSizeChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      sampleSize: [value[0], value[1]],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const newFilters = {
      dataTypes: {
        imaging: false,
        questionnaires: false,
        clinicalNotes: false,
        genomics: false,
        physiological: false,
      },
      availability: {
        public: false,
        restricted: false,
        private: false,
      },
      dateRange: {
        from: undefined,
        to: undefined,
      },
      sampleSize: [0, 10000],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div
      className={cn(
        "w-[280px] h-full bg-white border-r p-4 overflow-y-auto",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FilterIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="h-8 px-2"
        >
          <XIcon className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={[
          "data-types",
          "availability",
          "publication-date",
          "sample-size",
        ]}
        className="space-y-4"
      >
        <AccordionItem value="data-types" className="border rounded-md p-1">
          <AccordionTrigger className="px-3">Data Types</AccordionTrigger>
          <AccordionContent className="px-3 pt-2 pb-3 space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="imaging"
                checked={filters.dataTypes.imaging}
                onCheckedChange={() => handleDataTypeChange("imaging")}
              />
              <Label htmlFor="imaging">Imaging</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="questionnaires"
                checked={filters.dataTypes.questionnaires}
                onCheckedChange={() => handleDataTypeChange("questionnaires")}
              />
              <Label htmlFor="questionnaires">Questionnaires</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="clinical-notes"
                checked={filters.dataTypes.clinicalNotes}
                onCheckedChange={() => handleDataTypeChange("clinicalNotes")}
              />
              <Label htmlFor="clinical-notes">Clinical Notes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="genomics"
                checked={filters.dataTypes.genomics}
                onCheckedChange={() => handleDataTypeChange("genomics")}
              />
              <Label htmlFor="genomics">Genomics</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="physiological"
                checked={filters.dataTypes.physiological}
                onCheckedChange={() => handleDataTypeChange("physiological")}
              />
              <Label htmlFor="physiological">Physiological</Label>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability" className="border rounded-md p-1">
          <AccordionTrigger className="px-3">Availability</AccordionTrigger>
          <AccordionContent className="px-3 pt-2 pb-3 space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="public"
                checked={filters.availability.public}
                onCheckedChange={() => handleAvailabilityChange("public")}
              />
              <Label htmlFor="public">Public</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="restricted"
                checked={filters.availability.restricted}
                onCheckedChange={() => handleAvailabilityChange("restricted")}
              />
              <Label htmlFor="restricted">Restricted</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="private"
                checked={filters.availability.private}
                onCheckedChange={() => handleAvailabilityChange("private")}
              />
              <Label htmlFor="private">Private</Label>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="publication-date"
          className="border rounded-md p-1"
        >
          <AccordionTrigger className="px-3">Publication Date</AccordionTrigger>
          <AccordionContent className="px-3 pt-2 pb-3 space-y-3">
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange.from ? (
                      filters.dateRange.to ? (
                        <>
                          {format(filters.dateRange.from, "PPP")} -{" "}
                          {format(filters.dateRange.to, "PPP")}
                        </>
                      ) : (
                        format(filters.dateRange.from, "PPP")
                      )
                    ) : (
                      <span>Select date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={{
                      from: filters.dateRange.from,
                      to: filters.dateRange.to,
                    }}
                    onSelect={handleDateRangeChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sample-size" className="border rounded-md p-1">
          <AccordionTrigger className="px-3">Sample Size</AccordionTrigger>
          <AccordionContent className="px-3 pt-2 pb-3 space-y-3">
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 10000]}
                max={10000}
                step={100}
                value={[filters.sampleSize[0], filters.sampleSize[1]]}
                onValueChange={handleSampleSizeChange}
              />
              <div className="flex justify-between">
                <span className="text-sm">{filters.sampleSize[0]}</span>
                <span className="text-sm">{filters.sampleSize[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6">
        <Button className="w-full" onClick={() => onFilterChange(filters)}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
