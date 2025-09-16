import { UserProvider } from "@/context/UserContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="flex justify-center">
        <div className="main-wrap w-[1220px]">{children}</div>
      </div>
    </UserProvider>
  );
}
