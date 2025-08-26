"use client"

import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@heroui/dropdown";

import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

import { Link } from "@heroui/link";

import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

export function Header() {
  return (
    <header className="h-12 flex justify-between px-5 items-center w-auto lg:h-16 lg:container lg:mx-auto">
        <div>
            <Logo className="h-6 w-6 text-primary lg:hidden" />
        </div>
        <div className="flex items-center gap-2">
            <div className="flex gap-2">
                <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter} className="hidden lg:flex">
                <TwitterIcon className="text-default-500" />
                </Link>
                <Link isExternal aria-label="Discord" href={siteConfig.links.discord} className="hidden lg:flex">
                    <DiscordIcon className="text-default-500" />
                </Link>
                <Link isExternal aria-label="Github" href={siteConfig.links.github} className="hidden lg:flex">
                    <GithubIcon className="text-default-500" />
                </Link>
                <ThemeSwitch />
            </div>
            <Button
                className="hidden text-xs font-normal text-default-600 bg-default-100 h-8 lg:h-10 lg:text-sm lg:flex"
                href={siteConfig.links.sponsor}
                startContent={<DiscordIcon className="text-green-600" />}
                variant="flat"
            >
                Join Our Comunity
            </Button>
            <Button
                className="text-xs font-normal text-default-600 bg-default-100 h-8 mr-1 lg:h-10 lg:text-sm"
                href={siteConfig.links.sponsor}
                startContent={<HeartFilledIcon className="text-danger" />}
                variant="flat"
            >
                Support
            </Button>
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                isBordered
                as="button"
                className="transition-transform h-6 w-6 lg:h-10 lg:w-10"
                color="secondary"
                name="Jason Hughes"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger">
                Log Out
                </DropdownItem>
            </DropdownMenu>
            </Dropdown>
        </div>
    </header>
  );
}
