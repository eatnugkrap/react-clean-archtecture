import type { NextPage } from "next";
import styled from "styled-components";
import DoctorRepository, {
  UseAddDoctorParams,
} from "../../data/doctor/doctor.repository";
import DoctorService from "../../domain/doctor/doctor.service";
import useForm from "../../shared/hooks/useForm";
import DoctorListBox from "./components/DoctorListBox";

// 이 페이지는 UI에 의존
// UI는 도메인 / 데이터 레이어에 의존.

const DoctorList: NextPage = () => {
  const useDoctorsParams = undefined;

  const { data } = DoctorRepository.useDoctors(useDoctorsParams, {
    select: DoctorService.parseArray,
  });

  const { mutate: addDoctorMutation } = DoctorRepository.useAddDoctor();
  const { mutate: removeDoctorMutation } = DoctorRepository.useRemoveDoctor();

  const { formState, onInput, submit } = useForm<UseAddDoctorParams>({
    name: "",
    hospitalName: "",
  });

  const addDoctor = () => {
    submit(addDoctorMutation);
  };

  const removeDoctor = (id: number) => {
    removeDoctorMutation({ id });
  };
  
  return (
    <Screen>
      {data?.map((item) => (
        <DoctorListBox
          key={`list-${item.id}`}
          doctor={item}
          onClickRemove={() => {
            removeDoctor(item.id);
          }}
        />
      ))}

      <div>
        의사 이름
        <input
          onInput={(e) => {
            onInput({ name: e.currentTarget.value });
          }}
        />
      </div>
      <div>
        병원 이름
        <input
          onInput={(e) => {
            onInput({ hospitalName: e.currentTarget.value });
          }}
        />
      </div>
      <button onClick={addDoctor}>추가하기</button>
    </Screen>
  );
};

export default DoctorList;

const Screen = styled.div`
  flex: 1;
  box-sizing: border-box;
`;
