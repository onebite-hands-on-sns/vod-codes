import Fallback from "@/components/fallback";
import Loader from "@/components/loader";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import defaultAvatar from "@/assets/default-avatar.png";

export default function ProfileInfo({ userId }: { userId: string }) {
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchingProfilePending,
  } = useProfileData(userId);

  if (fetchProfileError) return <Fallback />;
  if (isFetchingProfilePending) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <img
        src={profile.avatar_url || defaultAvatar}
        className="h-30 w-30 rounded-full object-cover"
      />
      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">{profile.nickname}</div>
        <div className="text-muted-foreground">{profile.bio}</div>
      </div>
    </div>
  );
}
