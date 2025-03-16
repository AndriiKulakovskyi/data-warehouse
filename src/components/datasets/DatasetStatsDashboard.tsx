import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BarChart2,
  PieChart as PieChartIcon,
  Table as TableIcon,
} from "lucide-react";

interface DatasetStatsProps {
  datasetId?: string;
  datasetName?: string;
  dataTypes?: string[];
  metadata?: {
    totalParticipants?: number;
    diagnosisGroups?: { name: string; count: number }[];
    demographics?: {
      ageRange?: string;
      meanAge?: number;
      genderDistribution?: { gender: string; percentage: number }[];
    };
    dataCollectionPeriod?: string;
    completionRate?: number;
  };
  statisticalData?: {
    clinicalScales?: {
      name: string;
      meanScore: number;
      medianScore: number;
      stdDeviation: number;
      minScore: number;
      maxScore: number;
    }[];
    diagnosisDistribution?: { name: string; value: number }[];
    ageDistribution?: { ageGroup: string; count: number }[];
    missingDataPercentage?: number;
  };
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
];

const DatasetStatsDashboard: React.FC<DatasetStatsProps> = ({
  datasetId = "ds-123",
  datasetName = "Psychiatric Disorders Dataset",
  dataTypes = ["Clinical Assessments", "Questionnaires", "Demographics"],
  metadata = {
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
  statisticalData = {
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
}) => {
  return (
    <div className="w-full h-full bg-white p-4 rounded-lg">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="clinical-scales">Clinical Scales</TabsTrigger>
          <TabsTrigger value="data-quality">Data Quality</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{datasetName}</CardTitle>
              <CardDescription>Dataset ID: {datasetId}</CardDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {dataTypes.map((type, index) => (
                  <Badge key={index} variant="outline">
                    {type}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                    <PieChartIcon className="h-5 w-5" /> Diagnosis Distribution
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statisticalData.diagnosisDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {statisticalData.diagnosisDistribution.map(
                            (entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ),
                          )}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [
                            `${value} participants`,
                            "Count",
                          ]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                    <BarChart2 className="h-5 w-5" /> Age Distribution
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statisticalData.ageDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ageGroup" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [
                            `${value} participants`,
                            "Count",
                          ]}
                        />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Participants
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-2xl font-bold">
                      {metadata.totalParticipants}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Mean Age
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-2xl font-bold">
                      {metadata.demographics?.meanAge}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Collection Period
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm">{metadata.dataCollectionPeriod}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Completion Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-2xl font-bold">
                      {metadata.completionRate}%
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Demographics Tab */}
        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Demographic Information</CardTitle>
              <CardDescription>
                Detailed breakdown of participant demographics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Gender Distribution
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={metadata.demographics?.genderDistribution.map(
                            (item) => ({
                              name: item.gender,
                              value: item.percentage,
                            }),
                          )}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {metadata.demographics?.genderDistribution.map(
                            (entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ),
                          )}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Percentage"]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Age Distribution</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statisticalData.ageDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ageGroup" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [
                            `${value} participants`,
                            "Count",
                          ]}
                        />
                        <Bar dataKey="count" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-medium mb-4">Diagnosis Groups</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-2 text-left">Diagnosis</th>
                        <th className="p-2 text-left">Count</th>
                        <th className="p-2 text-left">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metadata.diagnosisGroups?.map((group, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{group.name}</td>
                          <td className="p-2">{group.count}</td>
                          <td className="p-2">
                            {(
                              (group.count / metadata.totalParticipants) *
                              100
                            ).toFixed(1)}
                            %
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clinical Scales Tab */}
        <TabsContent value="clinical-scales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Assessment Scales</CardTitle>
              <CardDescription>
                Statistical summary of clinical assessment scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-2 text-left">Scale</th>
                        <th className="p-2 text-left">Mean</th>
                        <th className="p-2 text-left">Median</th>
                        <th className="p-2 text-left">Std Dev</th>
                        <th className="p-2 text-left">Min</th>
                        <th className="p-2 text-left">Max</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statisticalData.clinicalScales?.map((scale, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{scale.name}</td>
                          <td className="p-2">{scale.meanScore.toFixed(1)}</td>
                          <td className="p-2">
                            {scale.medianScore.toFixed(1)}
                          </td>
                          <td className="p-2">
                            ±{scale.stdDeviation.toFixed(1)}
                          </td>
                          <td className="p-2">{scale.minScore}</td>
                          <td className="p-2">{scale.maxScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Scale Score Distributions
                  </h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={statisticalData.clinicalScales?.map((scale) => ({
                          name: scale.name,
                          mean: scale.meanScore,
                          median: scale.medianScore,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="mean" fill="#8884d8" name="Mean Score" />
                        <Bar
                          dataKey="median"
                          fill="#82ca9d"
                          name="Median Score"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {statisticalData.clinicalScales?.map((scale, index) => (
                    <Card key={index}>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-md">{scale.name}</CardTitle>
                        <CardDescription>
                          Score range: {scale.minScore}-{scale.maxScore}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Mean
                            </p>
                            <p className="text-xl font-bold">
                              {scale.meanScore.toFixed(1)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Median
                            </p>
                            <p className="text-xl font-bold">
                              {scale.medianScore.toFixed(1)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Std Dev
                            </p>
                            <p className="text-xl font-bold">
                              ±{scale.stdDeviation.toFixed(1)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Quality Tab */}
        <TabsContent value="data-quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Quality Metrics</CardTitle>
              <CardDescription>
                Information about data completeness and quality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-md">Completion Rate</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-3xl font-bold">
                          {metadata.completionRate}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          of all data fields completed
                        </p>
                      </div>
                      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                        <div
                          className="h-12 w-12 rounded-full"
                          style={{
                            background: `conic-gradient(#10b981 ${metadata.completionRate}%, #e5e7eb ${metadata.completionRate}% 100%)`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-md">Missing Data</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-3xl font-bold">
                          {statisticalData.missingDataPercentage}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          of data points missing across dataset
                        </p>
                      </div>
                      <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                        <div
                          className="h-12 w-12 rounded-full"
                          style={{
                            background: `conic-gradient(#ef4444 ${statisticalData.missingDataPercentage}%, #e5e7eb ${statisticalData.missingDataPercentage}% 100%)`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-medium mb-4">
                  Data Completeness by Category
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { category: "Demographics", completeness: 98.2 },
                        { category: "Clinical Scales", completeness: 94.5 },
                        { category: "Medical History", completeness: 89.7 },
                        { category: "Medication Data", completeness: 87.3 },
                        { category: "Follow-up Data", completeness: 82.1 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Completeness"]}
                      />
                      <Bar dataKey="completeness" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Data Quality Notes</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Data has been cleaned and preprocessed to handle outliers
                  </li>
                  <li>
                    Missing values in clinical scales were imputed using mean
                    substitution where appropriate
                  </li>
                  <li>
                    Demographic data is complete for 98.2% of participants
                  </li>
                  <li>
                    Follow-up data has the highest missing data rate (17.9%)
                  </li>
                  <li>
                    Data quality checks were performed according to CDISC
                    standards
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatasetStatsDashboard;
