// 클라이언트에서 사용하는 데이터

import { DoctorDto } from "../../data/doctor/doctor.api";

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

const DoctorService = {
  parse,
  parseArray,
};

export default DoctorService;
