"use client";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";


export const Navbar = () => {
  const pathname = usePathname();
  const navItems = [
    { href: '/', key: 'home' },
    { href: '/about', key: 'reels' },
    { href: '/blog', key: 'template' },
    { href: '/docs', key: 'faq' },
    { href: '/pricing', key: 'donate' },
  ];

  return (
    <nav className="flex fixed w-full h-16 bottom-0 bg-black py-1 px-3">
      <div className="container mx-auto items-center justify-between h-full grid grid-cols-5">
        {navItems.map(item => (
          <Link className={`size-full ${pathname === item.href ? 'bg-white text-black' : 'bg-black text-white hover:bg-white/20'} transition flex items-center justify-center rounded-lg flex-col p-0 gap-1`} href={item.href} key={item.key}>
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
