"use client"
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from "next/image";
  

const MobileNav = ({user} : MobileNavProps)=>{
    const pathname = usePathname();
    return (<section>
                <Sheet>
                <SheetTrigger>
                    <Image 
                    src="/icons/hamburger.svg"
                    width={30}
                    height={30}
                    alt="Menu"
                    className="cursor-pointer"/>
                </SheetTrigger>
                <SheetContent side="left" className="border-none bg-white">
                    <Link href="/" className="flex cursor-pointer items-center gap-2">
                    <Image
                        src = "/icons/logo.svg"
                        width={34}
                        height={34} 
                        alt="Horizon LOGO" className="size-[24px] max-xl:size-14"/>
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
                </Link>

                <div className="mobilenav-sheet">
                    <SheetClose asChild>
                        <nav className="flex flex-col pt-16 text-white h-full gap-6">
                            {sidebarLinks.map( (item) =>{
                            const isActive = (pathname === item.route || pathname.startsWith(`${item.route}/`))
                            return (
                                <SheetClose asChild key={item.route}>
                                <Link
                                    href={item.route}
                                    key={item.label}
                                    className={cn('mobilenav-sheet_close w-full-link',{'bg-bank-gradient':isActive})}> 

                                    <Image width={20} height={20} src={item.imgURL} alt={item.label} className={cn({'brightness-[4] invert-0':isActive})}/>
                                    <p className={cn('text-16 font-semibold text-black-2',{'text-white':isActive})}>
                                        {item.label}  
                                    </p>
                                </Link>
                                </SheetClose>
                            )
                            })}
                        </nav>
                    </SheetClose> 
                </div>



                </SheetContent>
                </Sheet>
    </section>)
}

export default MobileNav