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
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";


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
    <nav className="flex fixed w-full h-16 bottom-0 bg-black dark:bg-[#191919] py-1 px-3 lg:h-full lg:w-22 lg:px-1 lg:py-4">
      <div className="container mx-auto items-center justify-between grid grid-cols-5 lg:grid-cols-1 lg:justify-start lg:flex lg:flex-col lg:gap-1">
        <Logo className="h-16 w-16 text-white hidden lg:block lg:mb-4" />
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
