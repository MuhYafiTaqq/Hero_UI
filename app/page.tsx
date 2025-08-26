"use client"
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useRef } from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

import { CloudUpload } from 'lucide-react';
import {Divider} from "@heroui/divider";
import {Chip} from "@heroui/chip";
import { BookOpen } from 'lucide-react';
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from "next/image";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="flex flex-col items-center justify-center gap-4 container mx-auto">
      <div className="grid grid-rows-20 flex-1 lg:grid-cols-20">
        <div className="row-span-6 text-center justify-center items-center flex flex-col lg:col-span-10 lg:row-span-9 lg:justify-end lg:pb-15">
          <span className="text-2xl font-bold lg:text-5xl">The best platform to cut your images, <span className="text-violet-500">twizzcutter.com</span></span>
        </div>

        <div className="row-span-9 text-center justify-center items-center flex flex-col px-4 gap-4 order-3 lg:col-span-10 lg:row-span-10 lg:justify-start lg:pt-5">
            <Chip radius="sm" variant="shadow" startContent={<BookOpen className="h-4 w-4" size={16} />} className="mb-2 font-bold pl-3">My Blog !!</Chip>
          <div className="w-full">
            <Link className="text-sm text-default-500 lg:text-lg">Cara Membuat Postingan Bersambung? <SquareArrowOutUpRight className="h-4 w-4 ml-2" size={16} /></Link>
            <Divider className="my-3 w-4/5 lg:w-3/5 mx-auto" />
            <Link className="text-sm text-default-500 lg:text-lg">Perbedaan WithGap dan Without Gap? <SquareArrowOutUpRight className="h-4 w-4 ml-2" size={16} /></Link>
            <Divider className="my-3 w-4/5 lg:w-3/5 mx-auto" />
            <Link className="text-sm text-default-500 lg:text-lg">Cara Membuat Reels Bersambung? <SquareArrowOutUpRight className="h-4 w-4 ml-2" size={16} /></Link>
          </div>
          {/* <div className="flex gap-3 mt-2">
            <Link
              isExternal
              className={buttonStyles({
                color: "success",
                radius: "full",
                variant: "shadow",
              })}
              href={siteConfig.links.docs}
            >
              Documentation
            </Link>
            <Link
              isExternal
              className={buttonStyles({ variant: "bordered", radius: "full" })}
              href={siteConfig.links.github}
            >
              <GithubIcon size={20} />
              GitHub
            </Link>
          </div> */}
        </div>

        <div className="row-span-4 px-10 lg:col-span-10 lg:row-span-19 lg:px-0 lg:flex lg:justify-center lg:items-center lg:flex-col">
          <input 
            type="file"
            className="hidden"
            ref={inputRef}
            accept="image/*"
          />
          <Image
            src="/starship.svg"
            alt="starship image"
            width={100}
            height={100}
            className="hidden lg:flex mb-15 w-1/3"
          />
          <HoverBorderGradient
            containerClassName="size-full rounded-2xl cursor-pointer lg:w-1/2 lg:h-1/4"
            className="flex flex-col justify-center items-center"
            duration={1}
            onClick={() => inputRef.current?.click()}
          >
            <div className="flex items-center justify-center h-7 w-7 border dark:border-white/40 rounded-sm lg:h-10 lg:w-10">
              <CloudUpload className="h-4 w-4 lg:h-6 lg:w-6" />
            </div>
            <p className="text-center text-xs mt-4"><span className="font-bold opacity-100 lg:text-sm">Click to upload </span><span className="opacity-50">or drag and drop</span></p>
            <p className="text-center text-xs  opacity-50">Supported formats: PNG and JPG</p>
          </HoverBorderGradient>
        </div>

        <div className="row-span-1 flex items-end justify-center pb-2 order-4 lg:col-span-20 lg:row-span-1">
          <p className="text-center text-[10px] opacity-50 lg:text-sm">by continuing, you agree to terms and ethics of use</p>
        </div>
      </div>
      {/* <div className="inline-block max-w-xl text-center justify-center">
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div> */}
    </section>
  );
}
