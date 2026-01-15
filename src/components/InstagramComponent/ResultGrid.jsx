import StatCard from "./StatCard";

export default function ResultGrid({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <StatCard label="Username" value={data.username} />
      <StatCard label="Followers" value={data.followers.toLocaleString()} />
      <StatCard label="Following" value={data.following.toLocaleString()} />
      <StatCard label="Posts" value={data.posts.toLocaleString()} />
      <StatCard label="Avg Likes" value={data.avgLikes.toLocaleString()} />
      <StatCard label="Avg Comments" value={data.avgComments.toLocaleString()} />
      <StatCard label="Engagement Rate" value={data.engagementRate} />
      <StatCard label="Content Type" value={data.contentType} />
    </div>
  );
}
