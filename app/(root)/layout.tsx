import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/Sidebar";
import Image from "next/image";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {

  const loggedin = {firstName : "Sagar" , lastName : "Rathore"}
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
