import { HeartFilledIcon } from "@/components/icons";
import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Download } from 'lucide-react';
import ThemeImage from "@/components/theme-image";


export default function HomeResult({images, onBack, onRestart}: {images: string[], onBack: () => void, onRestart: () => void}) {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col px-2 size-full items-center justify-start gap-4 container mx-auto pb-5 lg:grid lg:grid-cols-20">
            <div className="flex py-5 flex-col items-center justify-center gap-4 w-full lg:col-span-7 lg:order-2">
                <ThemeImage
                    lightSrc="/starship-light.svg"
                    darkSrc="/starship-dark.svg"
                    alt="Starship Logo"
                    width={150}
                    height={37}
                    />
                <h5 className="text-xl font-bold">Here are your cropped images</h5>
                <div className="w-full">
                    <Button
                        variant="flat"
                        className="w-full"
                        startContent={<HeartFilledIcon className="text-danger" />}
                        color="danger"
                    >
                        Support Me</Button>
                    <div className="flex gap-2 mt-2">
                        <Button
                            variant="shadow"
                            className="w-full"
                            onPress={onBack}
                        >
                            Back</Button>
                        <Button
                            variant="shadow"
                            className="w-full"
                            color="success"
                            onPress={onRestart}
                        >
                            Restart
                        </Button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-1 bg-black/30 p-3 rounded-xl border-2 border-black/50 lg:col-span-13 lg:order-1 flex-1 lg:h-[900px] overflow-auto">
                {images.map((image, index) => (
                    <div key={index} className="flex flex-col items-center relative">
                        <Image
                            src={image}
                            alt={`Cropped Image ${index}`}
                            width={200}
                            height={200}
                            className="border border-black object-cover md:w-full"
                        />
                        <a href={image} download={`cropped-${index + 1}.png`} className="bg-blue-500 right-2 top-0 absolute text-white px-2 py-1 rounded mt-2">
                            <Download className="w-5 h-5" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}