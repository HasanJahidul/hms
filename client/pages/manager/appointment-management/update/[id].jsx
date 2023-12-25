import { apiService } from "@/service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateAppointment = () => {
  const router = useRouter();

  console.log("Appointment Id", router.query.id);
  const [data, setData] = useState();

  const getAppointmentDetails = async (id) => {
    try {
      const response = await apiService.get(`appointments/get-by-id?id=${id}`);
      console.log("Appointment Details", response);

      if (response.status == 200) {
        const availableAppointments = [];
        response.data.doctor.availableAppointments.forEach((element, index) => {
          availableAppointments.push({
            id: element.id,
            dateTime: element.dateTime,
          });
        });
        const responseData = {
          doctorId: response.data.doctorId,
          patientId: response.data.patientId,
          availableAppointmentId: response.data.availableAppointmentId,
          doctorDetails: {
            id: response.data.doctor.id,
            email: response.data.doctor.email,
            name: response.data.doctor.userDetails.name,
            address: response.data.doctor.userDetails.address,
            phone: response.data.doctor.userDetails.phone,
            avatar: response.data.doctor.userDetails.avatar,
            departmentId: response.data.doctor.department.id,
            departmentName: response.data.doctor.department.name,
            departmentDescription: response.data.doctor.department.description,
            availableAppointments: availableAppointments,
          },
          patientDetails: {
            id: response.data.patient.id,
            email: response.data.patient.email,
            name: response.data.patient.userDetails.name,
            address: response.data.patient.userDetails.address,
            phone: response.data.patient.userDetails.phone,
            avatar: response.data.patient.userDetails.avatar,
          },
        };

        setData(responseData);
      }
    } catch (error) {
      console.log("Error Fetching Appointment Details", error);
      toast.error(error.message);
    }
  };

  const updateAppointment = async (id) => {
    try {
      const response = await apiService.put(`appointments/update?id=${id}`);
      console.log("Update Appointment Log", response);

      if (response.status === 201 || response.data.status === 200) {
        toast.success("Appointment Updated Successfully!");
      } else {
        toast.error("Failed to update appointment!");
      }
    } catch (error) {
      console.log("Error Updating Appointment", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getAppointmentDetails(String(router.query.id));
    }
  }, [router]);
};

export default UpdateAppointment;
