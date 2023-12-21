import { UserCard } from "@/components/UserCard";
import { apiService } from "@/service";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const list = () => {
  const [userList, setUserList] = useState([]);

  const getPatientList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/manager/patient/list",
        {
          withCredentials: true,
        }
      );
      console.log("Patient List", response);

      const temp = [];
      if (response.status == 200) {
        response.data.message.forEach((element) => {
          const data = {
            userId: element.id,
            userName: element.userDetails.name,
            userAddress: element.userDetails.address,
            userPhone: element.userDetails.phone,
            userAvatar: element.userDetails.avatar,
            email: element.email,
            isActive: element.is_active,
            departmentId: element.department.id,
            departmentName: element.department.name,
            departmentDescription: element.department.description,
            services: element.services,
            appointments: element.appointments,
            availableAppointments: element.availableAppointments,
            roleId: element.role.id,
            roleName: element.role.name,
          };
          temp.push(data);
        });
        setUserList(temp);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error fetching patient list:", error);
    }
  };

  useEffect(() => {
    getPatientList();
  }, []);

  return (
    <div>
      <UserCard role={"patient"} userList={userList} />
    </div>
  );
};

export default list;
