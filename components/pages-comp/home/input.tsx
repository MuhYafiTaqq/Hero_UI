"use client"

import { Link } from "@heroui/link";
import { useRef, useState } from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

import { CloudUpload } from 'lucide-react';
import {Divider} from "@heroui/divider";
import {Chip} from "@heroui/chip";
import { BookOpen } from 'lucide-react';
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from "next/image";
import { useTheme } from "next-themes";
import ThemeImage from "@/components/theme-image";

export default function HomeInput({ inputImage }: { inputImage: (image: string) => void }) {
    const { theme } = useTheme();
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    // Perbaikan: Tambahkan tipe untuk parameter 'file'
    const handleFile = (file: File) => {
        if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const imageData = reader.result;

            // Perbaikan: Pengecekan tipe imageData
            if (typeof imageData === "string") {
                inputImage(imageData);
            }
        };
        }
    };

    // Perbaikan: Tambahkan tipe untuk event
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        handleFile(file);
        }
    };

    // Perbaikan: Tambahkan tipe untuk event drag
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    // Perbaikan: Tambahkan tipe untuk event drop
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
        handleFile(file);
        }
    };

    return (
        <div className="grid grid-rows-20 flex-1 lg:grid-cols-20 bg-white dark:bg-black">
          <div className="row-span-6 text-center justify-center items-center flex flex-col lg:col-span-10 lg:row-span-9 lg:justify-end lg:pb-15">
            <span className="text-2xl font-bold lg:text-5xl">The best platform to cut your images, <span className="text-violet-500">twizzcutter.com</span></span>
          </div>

          <div className="row-span-9 text-center justify-center items-center flex flex-col px-4 gap-4 order-3 lg:col-span-10 lg:row-span-10 lg:justify-start lg:pt-5">
              <Chip radius="sm" variant="shadow" startContent={<BookOpen className="h-4 w-4" size={16} />} className="mb-2 font-bold pl-3">My Blog !!</Chip>
            <div className="w-full">
              <Link className="text-sm text-default-500 lg:text-lg" onClick={() => {window.open("https://www.instagram.com/p/DNVYDaxzgE1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", "_blank");}} >Cara Membuat Postingan Bersambung? <SquareArrowOutUpRight className="h-4 w-4 ml-2" size={16} /></Link>
              <Divider className="my-3 w-4/5 lg:w-3/5 mx-auto" />
              <Link className="text-sm text-default-500 lg:text-lg" onClick={() => {window.open("https://www.instagram.com/p/DNX_Hfmzi-s/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", "_blank");}} >Perbedaan WithGap dan Without Gap? <SquareArrowOutUpRight className="h-4 w-4 ml-2" size={16} /></Link>
              <Divider className="my-3 w-4/5 lg:w-3/5 mx-auto" />
              <Link className="text-sm text-default-500 lg:text-lg" onClick={() => {window.open("https://www.instagram.com/p/DNm1X3-zpro/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", "_blank");}} >Cara Membuat Reels Bersambung? <SquareArrowOutUpRight className="h-4 w-4 ml-2" size={16} /></Link>
            </div>
          </div>

          <div className="row-span-4 px-10 lg:col-span-10 lg:row-span-19 lg:px-0 lg:flex lg:justify-center lg:items-center lg:flex-col">
            <input 
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
              multiple={false}
              onChange={handleFileChange}
            />
            <ThemeImage
              lightSrc="/starship-light.svg"
              darkSrc="/starship-dark.svg"
              alt="starship image"
              width={100}
              height={100}
              className="hidden lg:flex mb-15 w-1/3"
            />
            <HoverBorderGradient
              containerClassName="size-full rounded-2xl cursor-pointer lg:w-1/2 lg:h-1/4"
              className={`flex flex-col justify-center items-center hover:dark:bg-[#292929] ${isDragging ? 'dark:bg-[#292929] bg-[#d3d2d2]' : ''} hover:bg-[#d3d2d2]`}
              duration={1}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => {
                // Perbaikan: Tambahkan pengecekan null
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              <div className="flex items-center justify-center h-7 w-7 border dark:border-white/40 border-black/50 rounded-sm lg:h-10 lg:w-10">
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
    )
}