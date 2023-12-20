import { jsxService } from "@/service";
import { useEffect, useState } from "react";

const list = () => {
  const [list, setList] = useState(null);

  const getDoctorList = async () => {
    const response = await jsxService().get("manager/doctor/list");
      console.log("Doctor List", response);
      
    
  };

  useEffect(() => {
    getDoctorList();
  }, []);
};

export default list;
