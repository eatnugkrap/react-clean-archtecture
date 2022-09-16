import { ReactElement } from "react";
import styled from "styled-components";
import { Post } from "../domain/post/post.service";

const Box = ({ title }: { title: ReactElement }) => (
  <BoxWrapper>
    <Title>{title}</Title>
  </BoxWrapper>
);

export default Box;

const BoxWrapper = styled.div`
  background: grey;
  width: 100px;
  margin: 10px;
  padding: 10px;
`;

const Title = styled.div``;
