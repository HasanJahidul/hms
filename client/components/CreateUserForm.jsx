import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function CreateUserForm({
  formTitle,
  roleId,
  role,
  userId = 0,
  isUpdate = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    role_id: 0,
    department_id: 0,
  });

  useEffect(() => {
    if (isUpdate) {
      // api call and set the data
    }
  }, [isUpdate]);
  return (
    <div className="mx-auto max-w-md space-y-6">
      <Card className="space-y-2">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold">
            {!isUpdate ? "Create" : "Update"} {formTitle}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter details to {!isUpdate ? "create" : "update"} {formTitle}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="text-black"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="text-black"
              placeholder="john@example.com"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              className="text-black"
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, password: e.target.value }));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              className="text-black"
              placeholder="123 Main St."
              value={formData.address}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, address: e.target.value }));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              className="text-black"
              placeholder="123-456-7890"
              type="text"
              value={formData.phone}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, phone: e.target.value }));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <select
              className="w-full h-10 border border-gray-300 rounded-md text-black"
              id="department"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            >
              <option id={1}>Heart</option>
              <option id={2}>Brain</option>
              <option id={3}>Stomach</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              className="w-full h-10 border border-gray-300 rounded-md text-black"
              id="role"
              disabled={true}
            >
              <option id={roleId}>
                {roleId == 3
                  ? "Doctor"
                  : roleId == 4
                  ? "Nurse"
                  : roleId == 5
                  ? "Patient"
                  : ""}
              </option>
            </select>
          </div>
          <Button
            className="w-full bg-green-500 text-white"
            type="submit"
            onClick={() => {
              if (!isUpdate) {
                // create api call
              } else {
                // update api call
              }
            }}
          >
            {!isUpdate ? "Create" : "Update"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
