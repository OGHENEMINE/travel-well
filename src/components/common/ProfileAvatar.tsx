import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ProfileAvatar = ({
  fallback="CN",
  src="",
  className,
}: {
  fallback?: string;
  src?: string;
  className: string;
}) => {
  return (
    <Avatar className={`${className}`}>
      <AvatarImage src={src} />
      <AvatarFallback className="bg-transparent">{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
