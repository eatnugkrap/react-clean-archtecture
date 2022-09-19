import client from "../../shared/http";
import { AppQueryClient } from "../../shared/query";

export type DoctorDto = {
  id: number;
  name: string;
  hospitalName: string;
};

export type GetDoctorsApiRequest = undefined;

export type GetDoctorsApiResponse = Array<DoctorDto>;

const getDoctors = async (request: GetDoctorsApiRequest) => {
  const response = await client.get<GetDoctorsApiResponse>("/doctor", request);
  return response.data;
};

export type GetDoctorApiRequest = { id: number };

export type GetDoctorApiResponse = DoctorDto;

const getDoctor = async (request: GetDoctorApiRequest) => {
  const response = await client.get<GetDoctorApiResponse>(
    `/doctor/${request.id}`
  );
  return response.data;
};

export type AddDoctorApiRequest = Omit<DoctorDto, "id">;

export type AddDoctorApiResponse = {
  success: boolean;
  result: DoctorDto;
};

const addDoctor = async (request: AddDoctorApiRequest) => {
  const response = await client.post<AddDoctorApiResponse>("/doctor", request);
  return response.data;
};

export type RemoveDoctorApiRequest = { id: number };

export type RemoveDoctorApiResponse = {
  success: boolean;
};
const removeDoctor = async (request: RemoveDoctorApiRequest) => {
  const response = await client.delete<AddDoctorApiResponse>(
    `/doctor/${request.id}`
  );
  return response.data;
};

const DoctorApi = {
  getDoctors,
  getDoctor,
  addDoctor,
  removeDoctor,
};

export default DoctorApi;
