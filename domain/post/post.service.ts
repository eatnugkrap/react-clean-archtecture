// 클라이언트에서 사용하는 데이터

import { PostDto } from "../../data/post/post.api";

export type Post = {
  id: number;
  title: string;
  displayName: string;
};

const parse = (postDto: PostDto): Post => ({
  id: postDto.id,
  title: postDto.title,
  displayName: `${postDto.id} - ${postDto.title}`,
});

const parseArray = (posts: Array<PostDto>): Array<Post> => posts.map(parse);

const PostService = {
  parse,
  parseArray,
};

export default PostService;
