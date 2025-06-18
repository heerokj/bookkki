import Avatar from "boring-avatars";

type UserInfo = {
  created_at?: string;
  email?: string;
  id?: string;
  nickname?: string;
  password?: string;
  profile_url?: string;
  provider?: string;
  user_id?: string;
};

type Props = {
  info: UserInfo | null; // 이미지 src
  size?: number; // 프로필 원의 크기 (가로/세로)
  onClick?: () => void; // 프로필 클릭 이벤트
  className?: string;
};

export default function Profile({
  info,
  size = 35,
  onClick,
  className,
}: Props) {
  return (
    <div>
      {info && info.profile_url ? (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            overflow: "hidden",
          }}
        >
          <img
            src={info.profile_url}
            alt="profile"
            style={{ borderRadius: "50%" }}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <Avatar
          name="Sacagawea"
          variant="beam"
          size={size}
          onClick={onClick}
          className={className}
        />
      )}
    </div>
  );
}
