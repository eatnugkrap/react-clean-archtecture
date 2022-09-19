// 클라이언트에서 사용하는 데이터
import { DoctorDto } from "../../data/doctor/doctor.api";
import DoctorRepository, {
  UseAddDoctorParams,
  UseDoctorParams,
  UseDoctorsParams,
} from "../../data/doctor/doctor.repository";

export interface Doctor extends DoctorDto {
  displayName: string;
}

const parse = (doctorDto: DoctorDto): Doctor => ({
  id: doctorDto.id,
  name: doctorDto.name,
  hospitalName: doctorDto.hospitalName,
  displayName: `${doctorDto.hospitalName} - ${doctorDto.name}`,
});

const parseArray = (doctors: Array<DoctorDto>): Array<Doctor> =>
  doctors.map(parse);

const useDoctorService = () => {
  const useDoctor = (params: UseDoctorParams) => {
    return DoctorRepository.useDoctor(params, {
      select: parse,
    });
  };
  const useDoctors = (params: UseDoctorsParams) => {
    return DoctorRepository.useDoctors(params, {
      select: parseArray,
    });
  };
  const { mutate: addDoctor } = DoctorRepository.useAddDoctor();
  const { mutate: removeDoctor } = DoctorRepository.useRemoveDoctor();

  return {
    useDoctor,
    useDoctors,
    addDoctor,
    removeDoctor,
  };
};

export default useDoctorService;
