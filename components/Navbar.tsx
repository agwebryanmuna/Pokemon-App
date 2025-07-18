'use client'

import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Heart, LayoutDashboard, LogIn, LogOut, UserPlus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const { user, isLoading } = useUser()
  const pathname = usePathname()
  const router = useRouter()
  
  const menu = [
    {
      name: 'Browser',
      link: '/',
      icon: <LayoutDashboard size={20}/>,
    }, {
      name: 'Favorites',
      link: '/favorites',
      icon: <Heart size={22}/>,
    }, {
      name: 'Saved',
      link: '/bookmarks',
      icon: <Bookmark size={22}/>,
    },
  ]
  
  if (isLoading) return null
  
  return (
    <header className={'min-h-[8vh] px-16 py-6 w-full bg-white flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center shadow-sm'}>
      <Link href={'/'}>
        <Image src={'/pokemon--logo.png'} alt={'Pokemon Logo'} width={120} height={90}/>
      </Link>
      
      <nav>
        <ul className={'flex items-center gap-8 text-gray-400'}>
          {user && user?.sub && menu.map((item, index: number) => (
           <li key={index}>
              <Link
                href={item.link}
                className={`py-2 px-6 text-sm flex items-center gap-2 font-bold rounded-lg
                ${pathname === item.link ? 'bg-[#6c5ce7]/15 text-[#6c5ce7]' : ''}
              `}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {user?.sub && !isLoading && <div>
          <DropdownMenu>
              <DropdownMenuTrigger className="outline-none border-none">
                  <div className="bg-[#6c5ce7]/15 flex items-center justify-center gap-2 rounded-lg cursor-pointer">
                <span className="pl-2 text-[#6c5ce7] text-sm font-bold">
                  {user?.name || "User"}
                </span>
                      <Image
                          src={user?.picture || ""}
                          width={40}
                          height={40}
                          alt="avatar"
                          className="p-1 rounded-lg"
                      />
                  </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[160px]">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => router.push("/auth/logout")}
                  >
                      <LogOut />
                      Logout
                  </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
      </div>}
      
      {!user?.sub && !isLoading && <div className={'flex items-center gap-4'}>
        <Link href={'/auth/login'}
              className={'py-2 px-6 text-sm flex items-center font-bold gap-2 rounded-lg bg-[#6c5ce7]/15 text-[#6c5ce7] hover:bg-[#6c5ce7]/30 transition-all duration-300 ease-in-out'}>
          <LogIn size={20}/>
          Login
        </Link>
        
        <Link href={'/auth/login'}
              className={'py-2 px-6 text-sm flex items-center font-bold gap-2 rounded-lg bg-[#6c5ce7] text-white hover:bg-[#6c5ce7]/90 transition-all duration-300 ease-in-out'}>
          <UserPlus size={20}/>
          Register
        </Link>
      </div>}
    </header>
  )
}
export default Navbar
