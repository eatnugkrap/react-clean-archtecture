import Link from "next/link";
import Box from "../../../components/Box";
import { Doctor } from "../../../domain/doctor/doctor.service";
import { Post } from "../../../domain/post/post.service";

const DoctorListBox = ({
  doctor,
  onClickRemove,
}: {
  doctor: Doctor;
  onClickRemove: () => void;
}) => (
  <div>
    <Box
      title={
        <Link href={`/doctor/${doctor.id}`}>
          <a>{doctor.displayName}</a>
        </Link>
      }
    />
    <button onClick={onClickRemove}>삭제하기</button>
  </div>
);

export default DoctorListBox;
