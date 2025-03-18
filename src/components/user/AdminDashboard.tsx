import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  LineChart,
  PieChart,
  Users,
  Database,
  FileText,
  AlertTriangle,
  Plus,
} from "lucide-react";
import AddDatasetForm, {
  DatasetFormData,
} from "@/components/datasets/AddDatasetForm";

interface AdminDashboardProps {
  username?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  username = "Admin User",
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddDatasetForm, setShowAddDatasetForm] = useState(false);

  // Mock data
  const stats = {
    totalUsers: 245,
    totalDatasets: 32,
    pendingRequests: 18,
    activeUsers: 178,
  };

  const recentUsers = [
    {
      id: "user-001",
      name: "Sarah Johnson",
      email: "sarah.johnson@stanford.edu",
      institution: "Stanford University",
      joinDate: "2023-06-15",
    },
    {
      id: "user-002",
      name: "Michael Chen",
      email: "m.chen@jhu.edu",
      institution: "Johns Hopkins University",
      joinDate: "2023-06-14",
    },
    {
      id: "user-003",
      name: "Emily Rodriguez",
      email: "e.rodriguez@ucla.edu",
      institution: "UCLA Medical Center",
      joinDate: "2023-06-12",
    },
    {
      id: "user-004",
      name: "David Kim",
      email: "d.kim@mit.edu",
      institution: "MIT",
      joinDate: "2023-06-10",
    },
    {
      id: "user-005",
      name: "Lisa Patel",
      email: "l.patel@uchicago.edu",
      institution: "University of Chicago",
      joinDate: "2023-06-08",
    },
  ];

  const recentDatasets = [
    {
      id: "ds-001",
      name: "Multimodal Depression Assessment Dataset",
      owner: "Neuroscience Research Center",
      uploadDate: "2023-06-10",
      accessCount: 24,
    },
    {
      id: "ds-002",
      name: "Bipolar Disorder Longitudinal Study",
      owner: "Psychiatric Research Institute",
      uploadDate: "2023-06-05",
      accessCount: 18,
    },
    {
      id: "ds-003",
      name: "Anxiety Disorders Questionnaire Database",
      owner: "Mental Health Consortium",
      uploadDate: "2023-05-28",
      accessCount: 32,
    },
    {
      id: "ds-004",
      name: "Schizophrenia Neuroimaging Repository",
      owner: "Brain Imaging Center",
      uploadDate: "2023-05-20",
      accessCount: 15,
    },
    {
      id: "ds-005",
      name: "Autism Spectrum Disorder Assessment Tools",
      owner: "Child Development Institute",
      uploadDate: "2023-05-15",
      accessCount: 27,
    },
  ];

  const pendingRequests = [
    {
      id: "req-001",
      datasetId: "ds-001",
      datasetName: "Multimodal Depression Assessment Dataset",
      requesterName: "Sarah Johnson",
      requesterInstitution: "Stanford University",
      requestDate: "2023-06-15",
    },
    {
      id: "req-002",
      datasetId: "ds-002",
      datasetName: "Bipolar Disorder Longitudinal Study",
      requesterName: "Michael Chen",
      requesterInstitution: "Johns Hopkins University",
      requestDate: "2023-06-14",
    },
    {
      id: "req-003",
      datasetId: "ds-003",
      datasetName: "Anxiety Disorders Questionnaire Database",
      requesterName: "Emily Rodriguez",
      requesterInstitution: "UCLA Medical Center",
      requestDate: "2023-06-12",
    },
    {
      id: "req-004",
      datasetId: "ds-001",
      datasetName: "Multimodal Depression Assessment Dataset",
      requesterName: "David Kim",
      requesterInstitution: "MIT",
      requestDate: "2023-06-10",
    },
    {
      id: "req-005",
      datasetId: "ds-004",
      datasetName: "Schizophrenia Neuroimaging Repository",
      requesterName: "Lisa Patel",
      requesterInstitution: "University of Chicago",
      requestDate: "2023-06-08",
    },
  ];

  const recentActivity = [
    {
      id: "act-001",
      type: "access_granted",
      user: "Admin",
      target: "Sarah Johnson",
      dataset: "Multimodal Depression Assessment Dataset",
      date: "2023-06-14 14:32",
    },
    {
      id: "act-002",
      type: "access_denied",
      user: "Admin",
      target: "Robert Brown",
      dataset: "Bipolar Disorder Longitudinal Study",
      date: "2023-06-14 11:15",
    },
    {
      id: "act-003",
      type: "dataset_uploaded",
      user: "Dr. Jennifer Lee",
      target: null,
      dataset: "Childhood Anxiety Assessment Tools",
      date: "2023-06-13 16:45",
    },
    {
      id: "act-004",
      type: "user_registered",
      user: null,
      target: "Michael Chen",
      dataset: null,
      date: "2023-06-13 10:22",
    },
    {
      id: "act-005",
      type: "access_requested",
      user: "Emily Rodriguez",
      target: null,
      dataset: "Anxiety Disorders Questionnaire Database",
      date: "2023-06-12 15:37",
    },
    {
      id: "act-006",
      type: "dataset_updated",
      user: "Dr. William Smith",
      target: null,
      dataset: "Schizophrenia Neuroimaging Repository",
      date: "2023-06-12 09:18",
    },
    {
      id: "act-007",
      type: "access_granted",
      user: "Admin",
      target: "David Kim",
      dataset: "Autism Spectrum Disorder Assessment Tools",
      date: "2023-06-11 13:54",
    },
    {
      id: "act-008",
      type: "user_registered",
      user: null,
      target: "Lisa Patel",
      dataset: null,
      date: "2023-06-10 11:05",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "access_granted":
        return (
          <Badge className="bg-green-100 text-green-800">Access Granted</Badge>
        );
      case "access_denied":
        return <Badge className="bg-red-100 text-red-800">Access Denied</Badge>;
      case "dataset_uploaded":
        return (
          <Badge className="bg-blue-100 text-blue-800">Dataset Uploaded</Badge>
        );
      case "user_registered":
        return (
          <Badge className="bg-purple-100 text-purple-800">
            User Registered
          </Badge>
        );
      case "access_requested":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Access Requested
          </Badge>
        );
      case "dataset_updated":
        return (
          <Badge className="bg-indigo-100 text-indigo-800">
            Dataset Updated
          </Badge>
        );
      default:
        return <Badge className="bg-gray-100 text-gray-800">Activity</Badge>;
    }
  };

  const handleApproveRequest = (requestId: string) => {
    console.log(`Approving request ${requestId}`);
    // Here you would typically send an API request to approve the access request
  };

  const handleDenyRequest = (requestId: string) => {
    console.log(`Denying request ${requestId}`);
    // Here you would typically send an API request to deny the access request
  };

  const handleAddDataset = (data: DatasetFormData) => {
    console.log("Adding new dataset:", data);
    // Here you would typically send an API request to add the dataset
    // For now, we'll just hide the form and show a success message
    setShowAddDatasetForm(false);
    // In a real application, you would update the datasets list
  };

  return (
    <div className="container mx-auto py-8 bg-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">Welcome, {username}</span>
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {username.charAt(0)}
          </div>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="datasets" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Datasets
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Access Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Users
                    </p>
                    <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Datasets
                    </p>
                    <h3 className="text-2xl font-bold">
                      {stats.totalDatasets}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Database className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Pending Requests
                    </p>
                    <h3 className="text-2xl font-bold">
                      {stats.pendingRequests}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Active Users
                    </p>
                    <h3 className="text-2xl font-bold">{stats.activeUsers}</h3>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 border-b pb-4 last:border-0"
                  >
                    <div className="mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <p className="text-sm">
                        {activity.type === "user_registered" ? (
                          <span>
                            <strong>{activity.target}</strong> registered as a
                            new user
                          </span>
                        ) : activity.type === "dataset_uploaded" ||
                          activity.type === "dataset_updated" ? (
                          <span>
                            <strong>{activity.user}</strong>{" "}
                            {activity.type === "dataset_uploaded"
                              ? "uploaded"
                              : "updated"}{" "}
                            dataset <strong>{activity.dataset}</strong>
                          </span>
                        ) : activity.type === "access_requested" ? (
                          <span>
                            <strong>{activity.user}</strong> requested access to{" "}
                            <strong>{activity.dataset}</strong>
                          </span>
                        ) : activity.type === "access_granted" ||
                          activity.type === "access_denied" ? (
                          <span>
                            <strong>{activity.user}</strong>{" "}
                            {activity.type === "access_granted"
                              ? "granted"
                              : "denied"}{" "}
                            access to <strong>{activity.dataset}</strong> for{" "}
                            <strong>{activity.target}</strong>
                          </span>
                        ) : (
                          <span>Activity recorded</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage system users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Input placeholder="Search users..." className="max-w-sm" />
                <Button>Add New User</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.institution}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="datasets" className="space-y-4">
          {showAddDatasetForm ? (
            <AddDatasetForm
              onSubmit={handleAddDataset}
              onCancel={() => setShowAddDatasetForm(false)}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Dataset Management</CardTitle>
                <CardDescription>
                  View and manage available datasets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Input
                    placeholder="Search datasets..."
                    className="max-w-sm"
                  />
                  <Button
                    onClick={() => setShowAddDatasetForm(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add New Dataset
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dataset Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Access Count</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentDatasets.map((dataset) => (
                      <TableRow key={dataset.id}>
                        <TableCell className="font-medium">
                          {dataset.name}
                        </TableCell>
                        <TableCell>{dataset.owner}</TableCell>
                        <TableCell>{dataset.uploadDate}</TableCell>
                        <TableCell>{dataset.accessCount}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Request Management</CardTitle>
              <CardDescription>
                Review and process dataset access requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Input placeholder="Search requests..." className="max-w-sm" />
                <div className="flex space-x-2">
                  <Button variant="outline">Export CSV</Button>
                  <Button>Batch Process</Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dataset</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.datasetName}
                      </TableCell>
                      <TableCell>{request.requesterName}</TableCell>
                      <TableCell>{request.requesterInstitution}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleDenyRequest(request.id)}
                          >
                            Deny
                          </Button>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
