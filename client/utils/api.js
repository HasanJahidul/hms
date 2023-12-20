import axios from "axios";

const serverUrl = String(process.env.NEXT_PUBLIC_SERVER_BASE_URL);

export const userLogin = async (data) => {
  const response = await axios.post(`${serverUrl}/auth/login`, data);
};

export const signUp = (data) => {
  return axios.post(`${serverUrl}/auth/signup`, data);
};

export const uploadProfilePicture = (data, id) => {
  return axios.post(`${serverUrl}/user/upload?id=${id}`, data);
};

export const getUserById = (id) => {
  return axios.get(`${serverUrl}/auth/getUserByID?id=${id}`);
};

export const getManagerProfile = () => {
  return axios.get(`${serverUrl}/manager/profile`);
};

export const updateManagerProfile = (data) => {
  return axios.put(`${serverUrl}/manager`, data);
};

export const createDoctor = (data) => {
  return axios.post(`${serverUrl}/manager/doctor`, data);
};

export const getDoctorList = () => {
  return axios.get(`${serverUrl}/manager/doctor/list`);
};

export const getDoctorDetails = (id) => {
  return axios.get(`${serverUrl}/manager/doctor?id=${id}`);
};

export const updateDoctorProfile = (data) => {
  return axios.put(`${serverUrl}/manager/doctor/profile`, data);
};

export const createNurse = (data) => {
  return axios.post(`${serverUrl}/manager/nurse`, data);
};

export const getNurseList = () => {
  return axios.get(`${serverUrl}/manager/nurse/list`);
};

export const getNurseDetails = (id) => {
  return axios.get(`${serverUrl}/manager/nurse?id=${id}`);
};

export const updateNurseProfile = (data) => {
  return axios.put(`${serverUrl}/manager/nurse/profile`, data);
};

export const createPatient = (data) => {
  return axios.post(`${serverUrl}/manager/patient`, data);
};

export const getPatientList = () => {
  return axios.get(`${serverUrl}/manager/patient/list`);
};

export const getPatientDetails = (id) => {
  return axios.get(`${serverUrl}/manager/patient?id=${id}`);
};

export const updatePatientProfile = (data) => {
  return axios.put(`${serverUrl}/manager/patient/profile`, data);
};

export const createAppointment = (data) => {
  return axios.post(`${serverUrl}/appointments/make-appointment`, data);
};

export const assignAvailableAppointmentsToDoctor = (data) => {
  return axios.post(`${serverUrl}/appointments/available`, data);
};

export const getAvailableAppointmentListByDoctor = (id) => {
  return axios.get(`${serverUrl}/appointments/available?doctorId=${id}`);
};

export const getAllAppointmentList = () => {
  return axios.get(`${serverUrl}/appointments/get-all`);
};

export const getAppointmentById = (id) => {
  return axios.get(`${serverUrl}/appointments/get-by-id?id=${id}`);
};

export const updateAppointment = (data) => {
  return axios.put(`${serverUrl}/appointments/update`, data);
};

export const deleteAppointments = () => {
  return axios.delete(`${serverUrl}/appointments`);
};
