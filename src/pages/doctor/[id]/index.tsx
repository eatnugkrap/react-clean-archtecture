import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import DoctorRepository from "../../../data/doctor/doctor.repository";
import useDoctorService from "../../../domain/doctor/doctor.service";
import DoctorService from "../../../domain/doctor/doctor.service";

// 이 페이지는 UI에 의존
// UI는 도메인 / 데이터 레이어에 의존.

const DoctorDetail: NextPage = () => {
  const doctorService = useDoctorService();
  const router = useRouter();
  const useDoctorParams = { id: Number(router.query.id as string) };
  const { data } = doctorService.useDoctor(useDoctorParams);

  return <Screen></Screen>;
};

export default DoctorDetail;

const Screen = styled.div`
  flex: 1;
  box-sizing: border-box;
`;
