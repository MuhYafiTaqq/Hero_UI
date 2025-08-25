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
    <header className="h-12 flex justify-between px-5 items-center w-full">
        <p>
            <Logo className="h-6 w-6 text-primary" />
        </p>
        <div className="flex items-center gap-2">
            <ThemeSwitch />
            <Button
                className="text-xs font-normal text-default-600 bg-default-100 h-8 mr-1"
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
                className="transition-transform h-6 w-6"
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
