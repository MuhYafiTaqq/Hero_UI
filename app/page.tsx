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

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="flex flex-col items-center justify-center gap-4 container mx-auto">
      <div className="grid grid-rows-20 flex-1">
        <div className="row-span-5 text-center justify-center items-center flex flex-col">
          <span className="text-2xl font-bold">The best platform to cut your images, <span className="text-violet-500">twizzcutter.com</span></span>
        </div>
        <div className="row-span-4 px-3">
          <input 
            type="file"
            className="hidden"
            ref={inputRef}
            accept="image/*"
          />
          <HoverBorderGradient
            containerClassName="size-full rounded-2xl"
            className="flex flex-col justify-center items-center"
            duration={1}
            onClick={() => inputRef.current?.click()}
          >
            <div className="flex items-center justify-center h-7 w-7 border dark:border-white/40 rounded-sm">

            </div>
            <p className="text-center text-xs mt-4 opacity-50"><span className="font-bold">Click to upload </span>or drag and drop</p>
            <p className="text-center text-xs  opacity-50">Supported formats: PNG and JPG</p>
          </HoverBorderGradient>

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
