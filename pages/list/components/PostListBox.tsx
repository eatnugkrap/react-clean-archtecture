import Box from "../../../components/Box";
import { Post } from "../../../domain/post/post.service";

const PostListBox = ({ post }: { post: Post }) => (
  <Box title={<div>{post.displayName}</div>} />
);

export default PostListBox;
