import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import PostRepository from "../../data/post/post.repository";
import PostService from "../../domain/post/post.service";
import Box from "../../components/Box";
import PostListBox from "./components/postListBox";

// 이 페이지는 UI에 의존
// UI는 도메인 / 데이터 레이어에 의존.

const List: NextPage = () => {
  const usePostsParams = undefined;

  const { data } = PostRepository.usePosts(usePostsParams, {
    select: PostService.parseArray,
  });
  const { mutate } = PostRepository.useAddPost();

  const addPost = () => {
    const post = { id: 1, title: "sss" };
    mutate(post);
  };

  return (
    <Screen>
      {data?.map((item) => (
        <PostListBox key={`list-${item.id}`} post={item} />
      ))}
      <button onClick={addPost}>추가하기</button>
    </Screen>
  );
};

export default List;

const Screen = styled.div`
  flex: 1;
  box-sizing: border-box;
`;
