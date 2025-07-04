import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ProfileAvatar = ({ fallback, className }: { fallback: string, className:string }) => {
  return (
    <Avatar className={`${className}`}>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
