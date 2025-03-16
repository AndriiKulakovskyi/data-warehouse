import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  FileText,
  BarChart2,
  BookOpen,
  Calendar,
  Quote,
} from "lucide-react";

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
}

interface DatasetDetailTabsProps {
  datasetId?: string;
  datasetName?: string;
  description?: string;
  dataTypes?: string[];
  sampleData?: any;
  publications?: Publication[];
  citationText?: string;
  citationCount?: number;
}

const DatasetDetailTabs: React.FC<DatasetDetailTabsProps> = ({
  datasetId = "ds-123",
  datasetName = "Multimodal Depression Assessment Dataset",
  description = "A comprehensive dataset containing neuroimaging, clinical assessments, and questionnaire data from 500 participants with major depressive disorder and 500 healthy controls. Data was collected between 2018-2022 across five clinical sites.",
  dataTypes = [
    "MRI",
    "fMRI",
    "Questionnaires",
    "Clinical Notes",
    "Demographic Data",
  ],
  sampleData = {
    imaging: { count: 1000, types: ["T1", "T2", "fMRI"] },
    questionnaires: { count: 15, examples: ["PHQ-9", "GAD-7", "MADRS"] },
    demographics: {
      ageRange: "18-65",
      genderDistribution: "55% female, 45% male",
    },
  },
  publications = [
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
  citationText = "Johnson, A., Smith, B., et al. (2022). Neural correlates of depression severity in a multimodal assessment study. Journal of Psychiatric Research. https://doi.org/10.1000/xyz123",
  citationCount = 42,
}) => {
  return (
    <div className="w-full h-full bg-white p-4 rounded-lg">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sample-data">Sample Data</TabsTrigger>
          <TabsTrigger value="publications">Publications</TabsTrigger>
          <TabsTrigger value="citation">Citation</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{datasetName}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {dataTypes.map((type, index) => (
                  <Badge key={index} variant="outline">
                    {type}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Dataset Details</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>Dataset ID:</span>
                      <span className="font-mono">{datasetId}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Data Types:</span>
                      <span>{dataTypes.length}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Subjects:</span>
                      <span>1,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Last Updated:</span>
                      <span>April 15, 2023</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Access Information</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>Access Level:</span>
                      <span className="text-amber-600 font-medium">
                        Restricted
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Review Time:</span>
                      <span>~7 days</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Data Agreement:</span>
                      <span>Required</span>
                    </li>
                    <li className="flex justify-between">
                      <span>IRB Approval:</span>
                      <span>Required</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline">Download Metadata</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sample Data Tab */}
        <TabsContent value="sample-data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sample Data Visualization</CardTitle>
              <CardDescription>
                Preview of available data types and formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <BarChart2 className="h-5 w-5" /> Imaging Data
                  </h3>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="border rounded-lg p-4 text-center">
                      <div className="bg-gray-200 h-40 rounded-md flex items-center justify-center mb-2">
                        <img
                          src="https://images.unsplash.com/photo-1559757175-7cb056fba93d?w=400&q=80"
                          alt="MRI Sample"
                          className="h-full w-full object-cover rounded-md"
                        />
                      </div>
                      <p className="font-medium">T1 MRI Scan</p>
                      <p className="text-sm text-muted-foreground">
                        Structural imaging
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="bg-gray-200 h-40 rounded-md flex items-center justify-center mb-2">
                        <img
                          src="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=400&q=80"
                          alt="fMRI Sample"
                          className="h-full w-full object-cover rounded-md"
                        />
                      </div>
                      <p className="font-medium">fMRI Scan</p>
                      <p className="text-sm text-muted-foreground">
                        Functional imaging
                      </p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="bg-gray-200 h-40 rounded-md flex items-center justify-center mb-2">
                        <img
                          src="https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=400&q=80"
                          alt="DTI Sample"
                          className="h-full w-full object-cover rounded-md"
                        />
                      </div>
                      <p className="font-medium">DTI Scan</p>
                      <p className="text-sm text-muted-foreground">
                        Diffusion tensor imaging
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <FileText className="h-5 w-5" /> Questionnaire Data
                  </h3>
                  <Separator className="my-2" />
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse mt-2">
                      <thead>
                        <tr className="bg-muted">
                          <th className="p-2 text-left">Questionnaire</th>
                          <th className="p-2 text-left">Description</th>
                          <th className="p-2 text-left">Score Range</th>
                          <th className="p-2 text-left">Sample Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">PHQ-9</td>
                          <td className="p-2">Patient Health Questionnaire</td>
                          <td className="p-2">0-27</td>
                          <td className="p-2">1,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">GAD-7</td>
                          <td className="p-2">
                            Generalized Anxiety Disorder Assessment
                          </td>
                          <td className="p-2">0-21</td>
                          <td className="p-2">1,000</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">MADRS</td>
                          <td className="p-2">
                            Montgomery–Åsberg Depression Rating Scale
                          </td>
                          <td className="p-2">0-60</td>
                          <td className="p-2">1,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" /> Download Sample Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Publications Tab */}
        <TabsContent value="publications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Publications Using This Dataset</CardTitle>
              <CardDescription>
                Research papers and articles that have utilized this dataset
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {publications.map((pub, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{pub.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {pub.authors}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{pub.journal}</span>
                          <Calendar className="h-4 w-4 text-muted-foreground ml-2" />
                          <span className="text-sm">{pub.year}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        DOI: {pub.doi}
                      </Badge>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="ghost" size="sm" className="text-sm">
                        View Publication
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center mt-4">
                  <Button variant="outline">View All Publications</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Citation Tab */}
        <TabsContent value="citation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Citation Information</CardTitle>
              <CardDescription>
                How to cite this dataset in your research
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h3 className="font-medium flex items-center gap-2">
                    <Quote className="h-5 w-5" /> Recommended Citation
                  </h3>
                  <p className="mt-2 text-sm">{citationText}</p>
                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm" className="text-xs">
                      Copy Citation
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <h3 className="text-2xl font-bold">{citationCount}</h3>
                    <p className="text-sm text-muted-foreground">
                      Total Citations
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <h3 className="text-2xl font-bold">15</h3>
                    <p className="text-sm text-muted-foreground">
                      Citations This Year
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <h3 className="text-2xl font-bold">4.8</h3>
                    <p className="text-sm text-muted-foreground">
                      Impact Factor
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Export Citation</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      BibTeX
                    </Button>
                    <Button variant="outline" size="sm">
                      RIS
                    </Button>
                    <Button variant="outline" size="sm">
                      EndNote
                    </Button>
                    <Button variant="outline" size="sm">
                      Plain Text
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatasetDetailTabs;
