import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, FileText, BarChart2 } from "lucide-react";
import DatasetDetailTabs from "./DatasetDetailTabs";
import DatasetStatsDashboard from "./DatasetStatsDashboard";
import AccessRequestForm from "./AccessRequestForm";

interface Dataset {
  id: string;
  name: string;
  description: string;
  dataTypes: string[];
  sampleData?: any;
  publications?: any[];
  citationText?: string;
  citationCount?: number;
  metadata?: any;
  statisticalData?: any;
}

interface DatasetDetailModalProps {
  dataset?: Dataset;
  isOpen?: boolean;
  onClose?: () => void;
}

const DatasetDetailModal: React.FC<DatasetDetailModalProps> = ({
  dataset = {
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
    metadata: {
      totalParticipants: 1250,
      diagnosisGroups: [
        { name: "Bipolar Disorder", count: 350 },
        { name: "Major Depressive Disorder", count: 450 },
        { name: "Schizophrenia", count: 250 },
        { name: "Autism Spectrum Disorder", count: 200 },
      ],
      demographics: {
        ageRange: "18-65",
        meanAge: 34.7,
        genderDistribution: [
          { gender: "Male", percentage: 48 },
          { gender: "Female", percentage: 51 },
          { gender: "Other", percentage: 1 },
        ],
      },
      dataCollectionPeriod: "Jan 2020 - Dec 2022",
      completionRate: 92.5,
    },
    statisticalData: {
      clinicalScales: [
        {
          name: "PHQ-9",
          meanScore: 12.4,
          medianScore: 11.0,
          stdDeviation: 5.2,
          minScore: 0,
          maxScore: 27,
        },
        {
          name: "GAD-7",
          meanScore: 9.8,
          medianScore: 9.0,
          stdDeviation: 4.7,
          minScore: 0,
          maxScore: 21,
        },
        {
          name: "MADRS",
          meanScore: 22.3,
          medianScore: 21.0,
          stdDeviation: 8.1,
          minScore: 0,
          maxScore: 60,
        },
      ],
      diagnosisDistribution: [
        { name: "Bipolar Disorder", value: 350 },
        { name: "Major Depressive Disorder", value: 450 },
        { name: "Schizophrenia", value: 250 },
        { name: "Autism Spectrum Disorder", value: 200 },
      ],
      ageDistribution: [
        { ageGroup: "18-25", count: 275 },
        { ageGroup: "26-35", count: 410 },
        { ageGroup: "36-45", count: 320 },
        { ageGroup: "46-55", count: 180 },
        { ageGroup: "56-65", count: 65 },
      ],
      missingDataPercentage: 7.5,
    },
  },
  isOpen = true,
  onClose = () => {},
}) => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [activeView, setActiveView] = useState<"details" | "statistics">(
    "details",
  );

  const handleRequestAccess = () => {
    setShowRequestForm(true);
  };

  const handleCloseRequestForm = () => {
    setShowRequestForm(false);
  };

  const handleSubmitRequest = (values: any) => {
    // Handle the submission of the access request form
    console.log("Access request submitted:", values);
    setShowRequestForm(false);
  };

  if (showRequestForm) {
    return (
      <AccessRequestForm
        datasetId={dataset.id}
        datasetName={dataset.name}
        isOpen={true}
        onClose={handleCloseRequestForm}
        onSubmit={handleSubmitRequest}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-0">
        <div className="sticky top-0 z-10 bg-white border-b p-4">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold">
                {dataset.name}
              </DialogTitle>
              <DialogDescription>Dataset ID: {dataset.id}</DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-4 top-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
        </div>

        <div className="border-b">
          <Tabs value={activeView} className="w-full">
            <TabsList className="w-full justify-start px-6">
              <TabsTrigger
                value="details"
                onClick={() => setActiveView("details")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Dataset Details
              </TabsTrigger>
              <TabsTrigger
                value="statistics"
                onClick={() => setActiveView("statistics")}
                className="flex items-center gap-2"
              >
                <BarChart2 className="h-4 w-4" />
                Statistical Dashboard
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="p-6">
          {activeView === "details" ? (
            <DatasetDetailTabs
              datasetId={dataset.id}
              datasetName={dataset.name}
              description={dataset.description}
              dataTypes={dataset.dataTypes}
              sampleData={dataset.sampleData}
              publications={dataset.publications}
              citationText={dataset.citationText}
              citationCount={dataset.citationCount}
            />
          ) : (
            <DatasetStatsDashboard
              datasetId={dataset.id}
              datasetName={dataset.name}
              dataTypes={dataset.dataTypes}
              metadata={dataset.metadata}
              statisticalData={dataset.statisticalData}
            />
          )}
        </div>

        <div className="sticky bottom-0 z-10 bg-white border-t p-4 flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Close
          </Button>
          <Button onClick={handleRequestAccess}>Request Access</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DatasetDetailModal;
