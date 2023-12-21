import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export function UserCard({ role, userList }) {
  const router = useRouter();

  return (
    <div className="">
      {userList.map((data) => {
        return (
          <div className="mt-6 max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden text-black">
            <Card className="m-4">
              <CardHeader className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    alt="User Profile Picture"
                    src={
                      data.userAvatar == null
                        ? "/user-place-holder-image.jpg"
                        : data.userAvatar
                    }
                  />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 text-sm">
                  <div className="font-medium text-lg">{data.userName}</div>
                  <a className="text-blue-500 hover:underline" href="#">
                    {data.email}
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-1 text-sm">
                  <div>
                    <strong>Address:</strong> {data.userAddress}
                  </div>
                  <div>
                    <strong>Phone:</strong> {data.userPhone}
                  </div>
                  <div>
                    <strong>Department:</strong> {data.departmentName}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Badge className="items-center" variant="outline">
                  <UserIcon className="h-3.5 w-3.5 -translate-x-1" />
                  {data.departmentName}
                </Badge>
                <Button
                  size="sm"
                  className="text-white bg-green-500"
                  onClick={() => {
                    router.push(
                      `manager/${
                        role == "doctor"
                          ? "doctor-management"
                          : role == "nurse"
                          ? "nurse-management"
                          : role == "patient"
                          ? "patient-management"
                          : "doctor-management"
                      }/update/${data.userId}`
                    );
                  }}
                >
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
