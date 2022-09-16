import client from "../../shared/http";
import { AppQueryClient } from "../../shared/query";

export type PostDto = {
  id: number;
  title: string;
};

export type GetPostsApiRequest = undefined;

export type GetPostsApiResponse = Array<PostDto>;

const getPosts = async (request: GetPostsApiRequest) => {
  const response = await client.get<GetPostsApiResponse>("/posts", request);
  return response.data;
};

export type AddPostApiRequest = Omit<PostDto, "id">;

export type AddPostApiResponse = {
  success: boolean;
  result: PostDto;
};

const addPost = async (request: AddPostApiRequest) => {
  // const response = await client.post<AddPostApiResponse>("/posts", request);
  // return response.data;
  
  // 아무튼 add 하는 api 모킹
  const data = AppQueryClient.getQueryData(["posts"]) as Array<PostDto>;
  const newPost = { ...request, id: data.length + 1 };
  AppQueryClient.setQueryData(["posts"], [...data, newPost]);
  return { success: true, result: newPost } as AddPostApiResponse;
};

const PostApi = {
  getPosts,
  addPost,
};

export default PostApi;
