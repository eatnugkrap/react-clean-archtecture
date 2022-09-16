import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import PostRepository from "../data/post/post.repository";
import CharacterRepository from "../data/post/post.repository";
import PostService from "../domain/post/post.service";

// 이 페이지는 UI에 의존
// UI는 도메인 / 데이터 레이어에 의존.

const Home: NextPage = () => {
  return (
    <Screen>
      <Link href="list">
        <a>to list</a>
      </Link>
    </Screen>
  );
};

export default Home;

const Screen = styled.div`
  flex: 1;
  height: 100vh;
  width: 100vw;
  background: orange;
  box-sizing: border-box;
`;
