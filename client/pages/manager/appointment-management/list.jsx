import AppointmentTable from "@/components/AppointmentTable";
import { apiService } from "@/service";
import axios from "axios";
import { useEffect, useState } from "react";
const list = () => {
  const [appointmentList, setAllAppointmentList] = useState([]);

  const getAllAppointmentList = async () => {
    try {
      const response = await apiService.get(
        "http://localhost:3000/appointments/get-all"
      );
      console.log(response);

      if (response.status == 200) {
        setAllAppointmentList(response.data.message);
      }
    } catch (error) {
      console.log("Error Fetching Appointment List:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllAppointmentList();
  }, []);

  return (
    <div className="text-center">
      <AppointmentTable data={appointmentList} />
    </div>
  );
};

export default list;
