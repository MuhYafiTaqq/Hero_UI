"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";

type ThemeImageProps = Omit<ImageProps, "src"> & {
  lightSrc: string;
  darkSrc: string;
};

export default function ThemeImage({ lightSrc, darkSrc, ...props }: ThemeImageProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Image
      {...props}
      src={theme === "dark" ? darkSrc : lightSrc}
    />
  );
}