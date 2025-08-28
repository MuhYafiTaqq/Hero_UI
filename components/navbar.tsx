"use client";

import { Link } from "@heroui/link";

import { usePathname } from "next/navigation";
import Image from "next/image";


export const Navbar = () => {
  const pathname = usePathname();
  const navItems = [
    { href: '/', key: 'home' },
    { href: '/reels', key: 'reels' },
    { href: '/template', key: 'template' },
    { href: '/faq', key: 'faq' },
    { href: '/donate', key: 'donate' },
  ];

  return (
    <nav className="flex z-20 fixed w-full h-16 bottom-0 bg-black dark:bg-[#191919] py-1 px-3 lg:h-full lg:w-22 lg:px-1 lg:py-4">
      <div className="container mx-auto items-center justify-between grid grid-cols-5 lg:grid-cols-1 lg:justify-start lg:flex lg:flex-col lg:gap-1">
        <Image src="/logo.png" alt="Logo" width={100} height={100} className="h-16 w-16 text-white hidden lg:block lg:mb-4" />
        {navItems.map(item => (
          <Link className={`size-full ${pathname === item.href ? 'bg-white text-black' : 'text-white hover:bg-white/20'} transition flex items-center justify-center rounded-lg flex-col p-0 gap-1 lg:h-16`} href={item.href} key={item.key}>
            <Image
              src={`/NavBar-Icon/${item.key}${pathname === item.href ? "-active" : ""}.svg`}
              alt={item.key}
              width={24}
              height={24}
            />
            <p className="text-xs">
              {item.key}
            </p>
          </Link>
        ))}
      </div>
    </nav>
  );
};
