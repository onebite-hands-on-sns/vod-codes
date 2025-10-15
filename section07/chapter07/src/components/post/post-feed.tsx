import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import PostItem from "@/components/post/post-item";
import { usePostsData } from "@/hooks/queries/use-posts-data";

export default function PostFeed() {
  const { data, error, isPending } = usePostsData();

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {data.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}
