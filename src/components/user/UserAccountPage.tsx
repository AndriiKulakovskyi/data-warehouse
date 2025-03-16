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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  UserCircle,
  Settings,
  FileText,
  Lock,
  Bell,
  LogOut,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserAccountPageProps {
  isAdmin?: boolean;
  username?: string;
  email?: string;
}

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(160).optional(),
  institution: z.string().min(2, { message: "Institution name is required." }),
  role: z.string().min(2, { message: "Role is required." }),
});

const notificationFormSchema = z.object({
  accessRequestUpdates: z.boolean().default(true),
  datasetUpdates: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationFormValues = z.infer<typeof notificationFormSchema>;

const UserAccountPage: React.FC<UserAccountPageProps> = ({
  isAdmin = false,
  username = "John Researcher",
  email = "john.researcher@example.edu",
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: username,
      email: email,
      bio: "Clinical researcher specializing in depression and anxiety disorders.",
      institution: "University Medical Center",
      role: "Principal Investigator",
    },
  });

  // Notification form
  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      accessRequestUpdates: true,
      datasetUpdates: true,
      marketingEmails: false,
    },
  });

  // Mock data for access requests
  const pendingRequests = [
    {
      id: "req-001",
      datasetName: "Multimodal Depression Assessment Dataset",
      requestDate: "2023-05-15",
      status: "Pending",
    },
    {
      id: "req-002",
      datasetName: "Bipolar Disorder Longitudinal Study",
      requestDate: "2023-06-02",
      status: "Pending",
    },
  ];

  const approvedRequests = [
    {
      id: "req-003",
      datasetName: "Anxiety Disorders Questionnaire Database",
      requestDate: "2023-04-10",
      approvalDate: "2023-04-15",
      expiryDate: "2024-04-15",
    },
    {
      id: "req-004",
      datasetName: "Schizophrenia Neuroimaging Repository",
      requestDate: "2023-03-22",
      approvalDate: "2023-03-28",
      expiryDate: "2024-03-28",
    },
  ];

  // Admin-specific data
  const pendingApprovals = [
    {
      id: "req-005",
      datasetName: "Multimodal Depression Assessment Dataset",
      requestDate: "2023-05-18",
      requesterName: "Sarah Johnson",
      requesterInstitution: "Stanford University",
    },
    {
      id: "req-006",
      datasetName: "Bipolar Disorder Longitudinal Study",
      requestDate: "2023-06-05",
      requesterName: "Michael Chen",
      requesterInstitution: "Johns Hopkins University",
    },
    {
      id: "req-007",
      datasetName: "Anxiety Disorders Questionnaire Database",
      requestDate: "2023-06-10",
      requesterName: "Emily Rodriguez",
      requesterInstitution: "UCLA Medical Center",
    },
  ];

  const handleProfileSubmit = (data: ProfileFormValues) => {
    console.log("Profile updated:", data);
    // Here you would typically update the user profile in your backend
  };

  const handleNotificationSubmit = (data: NotificationFormValues) => {
    console.log("Notification preferences updated:", data);
    // Here you would typically update notification preferences in your backend
  };

  const handleApproveRequest = (requestId: string) => {
    console.log(`Approving request ${requestId}`);
    // Here you would typically send an API request to approve the access request
  };

  const handleDenyRequest = (requestId: string) => {
    console.log(`Denying request ${requestId}`);
    // Here you would typically send an API request to deny the access request
  };

  const handleRequestMoreInfo = (requestId: string) => {
    console.log(`Requesting more info for ${requestId}`);
    // Here you would typically send an API request to request more information
  };

  const handleSignOut = () => {
    console.log("User signed out");
    // Here you would typically clear auth tokens/session
    // For now we'll just redirect to home page
    navigate("/");
  };

  const handleGoToMainPage = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto py-8 bg-white">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
                  <UserCircle className="h-16 w-16" />
                </div>
                <h2 className="text-xl font-bold">{username}</h2>
                <p className="text-gray-500">{email}</p>
                {isAdmin && (
                  <div className="mt-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Administrator
                  </div>
                )}
              </div>

              <nav className="space-y-2">
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant={activeTab === "requests" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("requests")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Access Requests
                </Button>
                {isAdmin && (
                  <Button
                    variant={activeTab === "approvals" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("approvals")}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Pending Approvals
                  </Button>
                )}
                <Button
                  variant={activeTab === "notifications" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleGoToMainPage}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Main Page
                </Button>
                <Separator className="my-4" />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "profile" && "Profile Settings"}
                {activeTab === "requests" && "Your Access Requests"}
                {activeTab === "approvals" && "Pending Approval Requests"}
                {activeTab === "notifications" && "Notification Preferences"}
                {activeTab === "settings" && "Account Settings"}
              </CardTitle>
              <CardDescription>
                {activeTab === "profile" && "Manage your account information"}
                {activeTab === "requests" &&
                  "View and manage your dataset access requests"}
                {activeTab === "approvals" &&
                  "Review and process access requests from researchers"}
                {activeTab === "notifications" &&
                  "Control which notifications you receive"}
                {activeTab === "settings" &&
                  "Manage your account settings and preferences"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <Form {...profileForm}>
                  <form
                    onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Brief description of your research interests
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
              )}

              {/* Access Requests Tab */}
              {activeTab === "requests" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Pending Requests
                    </h3>
                    {pendingRequests.length > 0 ? (
                      <div className="space-y-4">
                        {pendingRequests.map((request) => (
                          <Card key={request.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium">
                                    {request.datasetName}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    Requested on: {request.requestDate}
                                  </p>
                                </div>
                                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                                  {request.status}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No pending requests</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Approved Requests
                    </h3>
                    {approvedRequests.length > 0 ? (
                      <div className="space-y-4">
                        {approvedRequests.map((request) => (
                          <Card key={request.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium">
                                    {request.datasetName}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    Approved on: {request.approvalDate}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Expires on: {request.expiryDate}
                                  </p>
                                </div>
                                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                  Active
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No approved requests</p>
                    )}
                  </div>

                  <Button className="w-full">
                    Request Access to New Dataset
                  </Button>
                </div>
              )}

              {/* Admin Approvals Tab */}
              {activeTab === "approvals" && isAdmin && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium mb-4">
                    Pending Approval Requests
                  </h3>
                  {pendingApprovals.length > 0 ? (
                    <div className="space-y-6">
                      {pendingApprovals.map((request) => (
                        <Card key={request.id}>
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium text-lg">
                                  {request.datasetName}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Request ID: {request.id}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Requested on: {request.requestDate}
                                </p>
                              </div>

                              <div className="bg-gray-50 p-4 rounded-md">
                                <h5 className="font-medium mb-2">
                                  Requester Information
                                </h5>
                                <p>
                                  <span className="font-medium">Name:</span>{" "}
                                  {request.requesterName}
                                </p>
                                <p>
                                  <span className="font-medium">
                                    Institution:
                                  </span>{" "}
                                  {request.requesterInstitution}
                                </p>
                              </div>

                              <div className="flex space-x-3">
                                <Button
                                  variant="default"
                                  onClick={() =>
                                    handleApproveRequest(request.id)
                                  }
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handleDenyRequest(request.id)}
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                >
                                  Deny
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    handleRequestMoreInfo(request.id)
                                  }
                                >
                                  Request More Info
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No pending approval requests
                    </p>
                  )}
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <Form {...notificationForm}>
                  <form
                    onSubmit={notificationForm.handleSubmit(
                      handleNotificationSubmit,
                    )}
                    className="space-y-6"
                  >
                    <FormField
                      control={notificationForm.control}
                      name="accessRequestUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Access Request Updates
                            </FormLabel>
                            <FormDescription>
                              Receive notifications about your dataset access
                              requests
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="datasetUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Dataset Updates
                            </FormLabel>
                            <FormDescription>
                              Receive notifications when datasets you have
                              access to are updated
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="marketingEmails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Marketing Emails
                            </FormLabel>
                            <FormDescription>
                              Receive emails about new features and related
                              research opportunities
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Save Preferences</Button>
                  </form>
                </Form>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Password</h3>
                    <div className="grid gap-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button className="mt-2">Change Password</Button>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                    <div className="flex items-center space-x-2">
                      <Switch id="2fa" />
                      <Label htmlFor="2fa">
                        Enable Two-Factor Authentication
                      </Label>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-red-600">
                      Danger Zone
                    </h3>
                    <p className="text-sm text-gray-500">
                      Permanently delete your account and all associated data
                    </p>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;
