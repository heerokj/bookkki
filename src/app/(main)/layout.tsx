import { UserProvider } from "@/context/UserContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="flex flex-co justify-center">
        <div className="wrap w-[1200px]">{children}</div>
      </div>
    </UserProvider>
  );
}
