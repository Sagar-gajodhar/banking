import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {

  const loggedin = await getLoggedInUser();

  if(!loggedin) redirect('/sign-in')
  return (
    <main className="flex h-screen w-full">
        <SideBar user={loggedin}/>

        <div className="flex flex-col size-full">
          <div className="root-layout">
            <Image src="/icons/logo.svg" width={30} height={30} alt="menu icon"/>
            <div>
              <MobileNav user={loggedin}/>
            </div>
          </div>
          {children}
        </div>
    </main>
  );
}
