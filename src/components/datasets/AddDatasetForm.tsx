import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, FileUp, Database } from "lucide-react";

interface AddDatasetFormProps {
  onSubmit?: (data: DatasetFormData) => void;
  onCancel?: () => void;
}

export interface DatasetFormData {
  name: string;
  description: string;
  institution: string;
  dataType: string;
  accessType: string;
  collaborationType: string;
  contactEmail: string;
  sampleSize: string;
  yearCollected: string;
  keywords: string;
  requiresEthicsApproval: boolean;
  hasPublications: boolean;
}

const AddDatasetForm: React.FC<AddDatasetFormProps> = ({
  onSubmit,
  onCancel = () => {},
}) => {
  const [formData, setFormData] = useState<DatasetFormData>({
    name: "",
    description: "",
    institution: "",
    dataType: "mixed",
    accessType: "collaboration",
    collaborationType: "academic",
    contactEmail: "",
    sampleSize: "",
    yearCollected: "",
    keywords: "",
    requiresEthicsApproval: true,
    hasPublications: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Prepare dataset data for API
      const datasetData = {
        name: formData.name,
        description: formData.description,
        institution: formData.institution,
        data_type: formData.dataType,
        access_type: formData.accessType,
        collaboration_type: formData.collaborationType,
        contact_email: formData.contactEmail,
        sample_size: formData.sampleSize,
        year_collected: formData.yearCollected,
        keywords: formData.keywords,
        requires_ethics_approval: formData.requiresEthicsApproval,
        has_publications: formData.hasPublications,
      };

      // Send request to backend API
      const response = await fetch("http://localhost:8000/datasets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(datasetData),
      });

      if (!response.ok) {
        throw new Error("Failed to create dataset");
      }

      const createdDataset = await response.json();

      // Call the onSubmit prop
      onSubmit?.(createdDataset);

      // Reset form after submission
      setFormData({
        name: "",
        description: "",
        institution: "",
        dataType: "mixed",
        accessType: "collaboration",
        collaborationType: "academic",
        contactEmail: "",
        sampleSize: "",
        yearCollected: "",
        keywords: "",
        requiresEthicsApproval: true,
        hasPublications: false,
      });
    } catch (error) {
      console.error("Error creating dataset:", error);
      // Here you would typically show an error message to the user
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-600" />
          <CardTitle>Add New Dataset</CardTitle>
        </div>
        <CardDescription>
          Register a new dataset in the data warehouse. This will make the
          dataset discoverable, but access will be granted through collaboration
          requests.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Dataset Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Multimodal Depression Assessment Dataset"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution">Institution/Owner *</Label>
              <Input
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="e.g., Psychiatric Research Institute"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of the dataset, including its purpose and potential applications..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataType">Data Type *</Label>
              <Select
                value={formData.dataType}
                onValueChange={(value) => handleSelectChange("dataType", value)}
              >
                <SelectTrigger id="dataType">
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="imaging">Neuroimaging</SelectItem>
                  <SelectItem value="questionnaire">
                    Questionnaires/Scales
                  </SelectItem>
                  <SelectItem value="clinical">Clinical Notes</SelectItem>
                  <SelectItem value="genetic">Genetic Data</SelectItem>
                  <SelectItem value="physiological">
                    Physiological Measurements
                  </SelectItem>
                  <SelectItem value="mixed">Mixed/Multimodal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessType">Access Type *</Label>
              <Select
                value={formData.accessType}
                onValueChange={(value) =>
                  handleSelectChange("accessType", value)
                }
              >
                <SelectTrigger id="accessType">
                  <SelectValue placeholder="Select access type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collaboration">
                    Collaboration Only
                  </SelectItem>
                  <SelectItem value="restricted">
                    Restricted (Application Required)
                  </SelectItem>
                  <SelectItem value="controlled">
                    Controlled (Ethics Approval Required)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="collaborationType">Collaboration Type *</Label>
              <Select
                value={formData.collaborationType}
                onValueChange={(value) =>
                  handleSelectChange("collaborationType", value)
                }
              >
                <SelectTrigger id="collaborationType">
                  <SelectValue placeholder="Select collaboration type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic Research</SelectItem>
                  <SelectItem value="clinical">Clinical Research</SelectItem>
                  <SelectItem value="industry">Industry Partnership</SelectItem>
                  <SelectItem value="government">Government Agency</SelectItem>
                  <SelectItem value="nonprofit">
                    Non-profit Organization
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="e.g., research@institution.edu"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sampleSize">Sample Size</Label>
              <Input
                id="sampleSize"
                name="sampleSize"
                value={formData.sampleSize}
                onChange={handleChange}
                placeholder="e.g., 250 participants"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearCollected">Year Collected</Label>
              <Input
                id="yearCollected"
                name="yearCollected"
                value={formData.yearCollected}
                onChange={handleChange}
                placeholder="e.g., 2018-2022"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                placeholder="e.g., depression, neuroimaging, longitudinal, adolescents"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="requiresEthicsApproval"
                checked={formData.requiresEthicsApproval}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(
                    "requiresEthicsApproval",
                    checked as boolean,
                  )
                }
              />
              <Label
                htmlFor="requiresEthicsApproval"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Requires ethics approval for access
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasPublications"
                checked={formData.hasPublications}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("hasPublications", checked as boolean)
                }
              />
              <Label
                htmlFor="hasPublications"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Has associated publications
              </Label>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Important Note on Data Sharing</p>
              <p>
                Adding a dataset to the warehouse makes it discoverable to
                researchers, but does not automatically share the data. Access
                will be granted through a formal request process, allowing for
                proper scientific collaboration and compliance with
                institutional policies.
              </p>
            </div>
          </div>

          <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
            <FileUp className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              Upload sample data or documentation (optional)
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Drag and drop files here or click to browse
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              Browse Files
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t p-6">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Dataset</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddDatasetForm;
