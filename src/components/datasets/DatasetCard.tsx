import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Eye, Download, BookmarkPlus, Share2 } from "lucide-react";

export interface DatasetCardProps {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  dataTypes?: string[];
  isAvailable?: boolean;
  publicationDate?: string;
  institution?: string;
  citations?: number;
  onClick?: () => void;
}

const DatasetCard = ({
  id = "dataset-1",
  title = "Neuroimaging Dataset for Depression Studies",
  description = "A comprehensive collection of MRI and fMRI scans from patients with major depressive disorder and healthy controls.",
  imageUrl = "https://images.unsplash.com/photo-1559757175-7cb036e0d465?w=400&q=80",
  dataTypes = ["MRI", "fMRI", "Questionnaires"],
  isAvailable = true,
  publicationDate = "2023-05-15",
  institution = "University Medical Center",
  citations = 42,
  onClick = () => console.log("Dataset card clicked"),
}: DatasetCardProps) => {
  return (
    <Card className="w-full max-w-[380px] h-[320px] overflow-hidden flex flex-col bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-40 overflow-hidden">
        <img
          src={imageUrl}
          alt={`${title} preview`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge
            variant={isAvailable ? "default" : "secondary"}
            className={isAvailable ? "bg-green-500" : "bg-gray-400"}
          >
            {isAvailable ? "Available" : "Restricted"}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-bold truncate" title={title}>
          {title}
        </CardTitle>
        <CardDescription className="text-xs text-gray-500">
          {institution} • Published {publicationDate}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm line-clamp-2 mb-2">{description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {dataTypes.map((type, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {type}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-xs text-gray-500">{citations} citations</div>
        <div className="flex space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <BookmarkPlus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save for later</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share dataset</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button onClick={onClick} className="ml-1">
            Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DatasetCard;
