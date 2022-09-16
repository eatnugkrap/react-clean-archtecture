import React from "react";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import PostApi, {
  AddPostApiRequest,
  AddPostApiResponse,
  GetPostsApiRequest,
  GetPostsApiResponse,
} from "./post.api";

const queryKeys = {
  all: ["posts"] as const,
  list: () => [...queryKeys.all, "list"] as const,
};

type UsePostsParams = GetPostsApiRequest;
type UsePostsResults = GetPostsApiResponse;

function usePosts<TFnData, TError, TData>(
  params: UsePostsParams,
  options?: UseQueryOptions<UsePostsResults, TError, TData>
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<UsePostsResults, TError, TData>(
    queryKeys.list(),
    () => {
      const getPostsRequest: GetPostsApiRequest = params;
      return PostApi.getPosts(getPostsRequest);
    },
    options
  );
}

type UseAddPostParams = AddPostApiRequest;
type UseAddPostResult = AddPostApiResponse;

function useAddPost<TData, TError>(
  options?: UseMutationOptions<UseAddPostResult, TError, UseAddPostParams>
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation<UseAddPostResult, TError, UseAddPostParams>(
    (params) => {
      const addPostRequest: AddPostApiRequest = params;
      return PostApi.addPost(addPostRequest);
    },
    { ...options }
  );
}

const PostRepository = {
  usePosts,
  useAddPost,
  queryKeys,
};

export default PostRepository;
