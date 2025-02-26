import BookImage from "@/components/auth/BookImage";
import LoginFrom from "@/components/auth/SignInFrom";
import SocialLoinButtons from "@/components/auth/SocialLoginButtons";

export default function SignInPage() {
  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="col-span-2 h-screen">
        <BookImage />
      </div>
      <div className="flex flex-col justify-center items-center">
        <LoginFrom />
        <SocialLoinButtons />
      </div>
    </div>
  );
}
