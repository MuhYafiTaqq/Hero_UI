import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Button } from "@heroui/button";
import ThemeImage from "@/components/theme-image";
import { supabase } from "@/lib/supabase";

export default function HomeSettings({
  images,
  onImageChange,
  onCroppedImages,
}: {
  images: string;
  onImageChange: (image: string) => void;
  onCroppedImages: (images: string[]) => void;
}) {
  const [cropMode, setCropMode] = useState("grid");
  const [gridMode, setGridMode] = useState("withgap");
  const [gridCols, setGridCols] = useState(1);
  const [gridRows, setGridRows] = useState(1);

  const handleAddColumn = () => setGridCols(gridCols + 1);
  const handleRemoveColumn = () => gridCols > 1 && setGridCols(gridCols - 1);
  const handleAddRow = () => setGridRows(gridRows + 1);
  const handleRemoveRow = () => gridRows > 1 && setGridRows(gridRows - 1);

  const prevRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const [loading, setLoading] = useState(false);

  // Fungsi untuk mereset grid
  const resetGrid = () => {
    if (cropMode === "grid") {
      setGridCols(1);
    }
    if (cropMode === "carousel") {
      setGridRows(1);
    }
  };

  // Fungsi untuk menggambar grid pada canvas
  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    // 🔹 Inisialisasi variabel dengan nilai default untuk mencegah 'undefined'
    let cellWidth = 0,
      cellHeight = 0;
    let startX = 0,
      startY = 0;
    let totalCols = 0,
      totalRows = 0;

    // 🔹 Logika perhitungan berdasarkan mode crop
    if (cropMode === "grid") {
      let aspectRatio;
      if (gridMode === "withgap") {
        aspectRatio = 0.4313099041533546;
      } else {
        aspectRatio = 0.4340836012861736;
      }
      cellWidth = canvas.width / 3;
      cellHeight = cellWidth * 3 * aspectRatio;

      let totalWidth = cellWidth * 3;
      let totalHeight = cellHeight * gridRows;

      // Jika total tinggi lebih besar dari canvas, sesuaikan ukuran grid
      if (totalHeight > canvas.height) {
        cellHeight = canvas.height / gridRows;
        cellWidth = cellHeight / (3 * aspectRatio);
      }

      totalWidth = cellWidth * 3;
      totalHeight = cellHeight * gridRows;

      // Pusatkan grid di tengah-tengah canvas
      if (totalWidth < canvas.width) {
        startX = (canvas.width - totalWidth) / 2;
      }
      if (totalHeight < canvas.height) {
        startY = (canvas.height - totalHeight) / 2;
      }

      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < gridRows; j++) {
          const x = startX + i * cellWidth;
          const y = startY + j * cellHeight;
          ctx.strokeRect(x, y, cellWidth, cellHeight);
        }
      }
      return 1;
    } else if (cropMode === "carousel") {
      totalCols = gridCols;
      totalRows = 1; // Carousel selalu memiliki 1 baris

      // Asumsi rasio 4:5 (bisa diubah)
      const aspectRatio = 4 / 5;
      cellWidth = canvas.width / totalCols;
      cellHeight = cellWidth / aspectRatio;

      // Jika tinggi sel melebihi canvas, sesuaikan
      if (cellHeight > canvas.height) {
        cellHeight = canvas.height;
        cellWidth = cellHeight * aspectRatio;
      }

      startX = (canvas.width - cellWidth * totalCols) / 2;
      startY = (canvas.height - cellHeight * totalRows) / 2;
    } else if (cropMode === "custom") {
      totalCols = gridCols;
      totalRows = gridRows;

      cellWidth = canvas.width / totalCols;
      cellHeight = canvas.height / totalRows;

      // Pusatkan grid
      startX = (canvas.width - cellWidth * totalCols) / 2;
      startY = (canvas.height - cellHeight * totalRows) / 2;
    }

    // 🔹 Bagian Gambar Grid (Tidak ada pengulangan lagi)
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;

    for (let i = 0; i < totalCols; i++) {
      for (let j = 0; j < totalRows; j++) {
        const x = startX + i * cellWidth;
        const y = startY + j * cellHeight;
        ctx.strokeRect(x, y, cellWidth, cellHeight);
      }
    }
  };

  // Fungsi untuk memperbarui canvas dengan gambar
  const updateCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const img = new window.Image();
    img.src = images;
    img.onload = function () {
      const aspectRatio = img.width / img.height;
      let adjustedWidth = width;
      let adjustedHeight = adjustedWidth / aspectRatio;

      if (adjustedHeight > height) {
        adjustedHeight = height;
        adjustedWidth = adjustedHeight * aspectRatio;
      }

      canvas.width = adjustedWidth;
      canvas.height = adjustedHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      drawGrid(ctx, canvas);
    };
  };

  const handleCrop = async () => {
    setLoading(true);
        try {
      const { error } = await supabase.from("crop_image").insert({});
      // Jika error, log saja (tidak tampil ke user)
      if (error) {
        // eslint-disable-next-line no-console
        console.error("Supabase error:", error);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Supabase exception:", err);
    }

    const img = new window.Image();
    img.src = images;
    img.onload = function () {
      const originalWidth = img.width;
      const originalHeight = img.height;
      const croppedData = [];
      console.log("loading:", loading);

      if (cropMode === "grid") {
        const height = 1350;
        let aspectRatio, width, crop;
        if (gridMode === "withgap") {
          aspectRatio = 0.4313099041533546;
          width = 3130;
          crop = [0, 1025, 2050];
        } else {
          aspectRatio = 0.4340836012861736;
          width = 3110;
          crop = [0, 1015, 2030];
        }
        let startX = 0,
          startY = 0;

        // 🔹 Hitung ukuran grid berdasarkan gambar asli
        let gridCellWidth = originalWidth / gridCols;
        let gridCellHeight = gridCellWidth * aspectRatio;

        let totalGridWidth = gridCellWidth * gridCols;
        let totalGridHeight = gridCellHeight * gridRows;

        if (totalGridHeight > originalHeight) {
          gridCellHeight = originalHeight / gridRows;
          gridCellWidth = gridCellHeight / aspectRatio;
        }

        totalGridWidth = gridCellWidth * gridCols;
        totalGridHeight = gridCellHeight * gridRows;

        // 🔹 Pusatkan grid dalam gambar asli
        if (totalGridWidth < originalWidth) {
          startX = (originalWidth - totalGridWidth) / 2;
        }
        if (totalGridHeight < originalHeight) {
          startY = (originalHeight - totalGridHeight) / 2;
        }

        for (let j = 0; j < gridRows; j++) {
          for (let i = 0; i < gridCols; i++) {
            const cropCanvas = document.createElement("canvas");
            const cropCtx = cropCanvas?.getContext("2d");

            // 🔹 Hitung posisi crop berdasarkan gambar asli
            const cropX = startX + i * gridCellWidth;
            const cropY = startY + j * gridCellHeight;

            cropCanvas.width = width; // Ukuran output tetap
            cropCanvas.height = height;

            cropCtx?.drawImage(
              img,
              cropX,
              cropY,
              gridCellWidth,
              gridCellHeight, // **Crop area di gambar asli**
              0,
              0,
              width,
              height // **Resize hasil crop ke 3312x1440**
            );

            // 🔹 **Bagi hasil crop menjadi 3 bagian**
            for (let k = 0; k < 3; k++) {
              const cropCanvas2 = document.createElement("canvas");
              const cropCtx2 = cropCanvas2.getContext("2d");

              cropCanvas2.width = 1080; // Ukuran output tetap
              cropCanvas2.height = 1350;

              cropCtx2?.drawImage(
                cropCanvas,
                crop[k],
                0,
                1080,
                1350, // **Crop area di hasil grid**
                0,
                0,
                1080,
                1350 // **Resize hasil crop ke 1080x1350**
              );

              croppedData.push(cropCanvas2.toDataURL("image/png"));
            }
          }
        }
      } else if (cropMode === "custom") {
        // MODE CUSTOM: Memotong dengan grid
        const cellWidth = originalWidth / gridCols;
        const cellHeight = originalHeight / gridRows;

        for (let j = 0; j < gridRows; j++) {
          for (let i = 0; i < gridCols; i++) {
            const cropCanvas = document.createElement("canvas");
            const cropCtx = cropCanvas?.getContext("2d");
            cropCanvas.width = cellWidth;
            cropCanvas.height = cellHeight;

            cropCtx?.drawImage(
              img,
              i * cellWidth,
              j * cellHeight,
              cellWidth,
              cellHeight,
              0,
              0,
              cellWidth,
              cellHeight
            );

            croppedData.push(cropCanvas.toDataURL("image/png"));
          }
        }
      } else if (cropMode === "carousel") {
        // Asumsi rasio 4:5 (bisa diubah)
        const aspectRatio = 4 / 5;
        let targetWidth = originalWidth / gridCols;
        let targetHeight = targetWidth / aspectRatio;

        // Jika tinggi sel melebihi canvas, sesuaikan
        if (targetHeight > originalHeight) {
          targetHeight = originalHeight;
          targetWidth = targetHeight * aspectRatio;
        }

        const startX = (originalWidth - targetWidth * gridCols) / 2;
        const startY = (originalHeight - targetHeight) / 2;

        for (let i = 0; i < gridCols; i++) {
          const cropCanvas = document.createElement("canvas");
          const cropCtx = cropCanvas?.getContext("2d");

          cropCanvas.width = 1080; // Ukuran output tetap 4:5
          cropCanvas.height = 1350;

          const cropX = startX + i * targetWidth; // Mulai crop dari tengah secara horizontal
          const cropY = startY; // **Fix: Crop benar-benar dari tengah vertikal**

          cropCtx?.drawImage(
            img,
            cropX,
            cropY,
            targetWidth,
            targetHeight, // **Crop area di gambar asli**
            0,
            0,
            1080,
            1350 // **Resize ke 1080x1350**
          );

          croppedData.push(cropCanvas.toDataURL("image/png"));
        }
      }
      onCroppedImages(croppedData);
      setLoading(false);
    };
  };

  // Panggil updateCanvas saat gambar dimuat atau ukuran container berubah
  useEffect(() => {
    if (prevRef.current) {
      setHeight(prevRef.current.clientHeight);
      setWidth(prevRef.current.clientWidth);
    }
    if (images && width && height) {
      updateCanvas();
    }
  }, [images, width, height]);

  useEffect(() => {
    if (images) {
      updateCanvas();
    }
  }, [images, gridCols, gridRows, cropMode, gridMode]);

  return (
    <div className="flex-1 grid grid-rows-20 w-full p-2 lg:grid-cols-20 lg:mb-6 overflow-auto">
      <div className="row-span-10 w-full rounded-xl p-2 bg-black/30 border-2 border-dashed border-black/50 dark:bg-white/30 dark:border-white/50 lg:col-span-12 lg:row-span-20">
        <div
          ref={prevRef}
          className="h-full w-full flex justify-center items-center"
        >
          <canvas
            className="border-1 md:border-2 border-black"
            ref={canvasRef}
          />
        </div>
      </div>

      <div className="row-span-10 pt-4 lg:col-span-7 lg:row-span-20 lg:col-start-14 lg:pt-0 lg:grid lg:grid-rows-3">
        <div className="hidden w-full lg:flex justify-center items-center">
          <ThemeImage
            lightSrc="/starship-light.svg"
            darkSrc="/starship-dark.svg"
            alt="starship"
            className="h-60 w-60"
            width={150}
            height={37}
          />
        </div>
        <div className="flex flex-col justify-between h-full lg:row-span-2">
          <div>
            <p className="flex items-center font-bold gap-2 mb-1 md:text-xl text-sm">
              <Image src="/type.svg" width={20} height={20} alt="type image" />
              Type
            </p>

            <div
              className={`inline-flex w-full justify-between border-1 md:gap-1.5 border-black dark:border-white rounded-full relative md:w-full`}
            >
              <span
                className={`absolute w-1/3 h-full bg-black dark:bg-white top-0 left-0 rounded-full z-1 transition duration-500 ease-in-out ${
                  cropMode === "grid"
                    ? "translate-x-0"
                    : cropMode === "custom"
                      ? "translate-x-[200%]"
                      : "translate-x-[100%]"
                }`}
              ></span>
              <Button
                onClick={() => {
                  setCropMode("grid");
                  resetGrid();
                }}
                className={`text-sm md:text-lg z-2 w-1/3 px-4 rounded bg-transparent lg:h-10 ${
                  cropMode === "grid"
                    ? "text-white font-bold dark:text-black"
                    : "text-black dark:text-white"
                }`}
                size="sm"
              >
                Grid
              </Button>
              <Button
                onClick={() => {
                  setCropMode("carousel");
                  resetGrid();
                }}
                className={`text-sm md:text-lg z-2 w-1/3 px-4 rounded bg-transparent lg:h-10 ${
                  cropMode === "carousel"
                    ? "text-white font-bold dark:text-black"
                    : "text-black dark:text-white"
                }`}
                size="sm"
              >
                Carousel
              </Button>
              <Button
                onClick={() => {
                  setCropMode("custom");
                }}
                className={`text-sm md:text-lg z-2 w-1/3 px-4 rounded bg-transparent lg:h-10 ${
                  cropMode === "custom"
                    ? "text-white font-bold dark:text-black"
                    : "text-black dark:text-white"
                }`}
                size="sm"
              >
                Custom
              </Button>
            </div>
            <div
              className={`flex ${
                cropMode != "grid" ? "gap-1" : ""
              } md:text-xl mt-6`}
            >
              {(cropMode === "custom" || cropMode === "carousel") && (
                <div className="w-1/2">
                  <>
                    <p className="flex md:text-xl items-center gap-2 mb-1 font-bold text-sm">
                      <Image
                        src="/column.svg"
                        width={20}
                        height={20}
                        alt="columns image"
                      />
                      Columns
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <Button
                        onClick={handleRemoveColumn}
                        className="rounded-full bg-black dark:bg-white flex justify-center items-center lg:h-10"
                        size="sm"
                      >
                        <Minus className="text-white dark:text-black" />
                      </Button>
                      <h6 className="inline-flex text-black dark:text-white px-4">
                        {gridCols}
                      </h6>
                      <Button
                        onClick={handleAddColumn}
                        className="rounded-full bg-black dark:bg-white flex justify-center items-center lg:h-10"
                        size="sm"
                      >
                        <Plus className="text-white dark:text-black" />
                      </Button>
                    </div>
                  </>
                </div>
              )}

              {(cropMode === "custom" || cropMode === "grid") && (
                <div className="w-1/2">
                  <>
                    <p className="flex md:text-xl items-center gap-2 font-bold mb-1 text-sm">
                      <Image
                        src="/row.svg"
                        width={20}
                        height={20}
                        alt="rows image"
                      />
                      Rows
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <Button
                        onClick={handleRemoveRow}
                        className="rounded-full bg-black dark:bg-white flex justify-center items-center lg:h-10"
                        size="sm"
                      >
                        <Minus className="text-white dark:text-black" />
                      </Button>
                      <h6 className="inline-flex text-black dark:text-white px-4">
                        {gridRows}
                      </h6>
                      <Button
                        onClick={handleAddRow}
                        className="rounded-full bg-black dark:bg-white flex justify-center items-center lg:h-10"
                        size="sm"
                      >
                        <Plus className="text-white dark:text-black" />
                      </Button>
                    </div>
                  </>
                </div>
              )}
            </div>

            {cropMode === "grid" && (
              <>
                <p className="flex items-center font-bold gap-2 mb-1 md:text-xl text-sm mt-6">
                  <Image
                    src="/type.svg"
                    width={20}
                    height={20}
                    alt="type image"
                  />
                  {/* <VscSettings className="h-4 w-4 md:w-10 md:h-10"/> */}
                  Type of Grid
                </p>
                <div
                  className={`inline-flex w-2/3 justify-between border-1 md:gap-1.5 border-black dark:border-white rounded-full relative md:w-full`}
                >
                  <span
                    className={`absolute w-1/2 h-full bg-black dark:bg-white top-0 rounded-full z-1 transition duration-500 ${
                      gridMode === "withgap"
                        ? "left-0"
                        : gridMode === "withoutgap"
                          ? "translate-x-[100%]"
                          : "left-1/2 transform -translate-x-1/2"
                    }`}
                  ></span>
                  <Button
                    onClick={() => {
                      setGridMode("withgap");
                      resetGrid();
                    }}
                    className={`text-sm md:text-xl z-2 w-1/2 px-4 rounded bg-transparent lg:h-10 ${
                      gridMode === "withgap"
                        ? "text-white font-bold dark:text-black"
                        : "text-black dark:text-white"
                    }`}
                    size="sm"
                  >
                    With Gap
                  </Button>
                  <Button
                    onClick={() => {
                      setGridMode("withoutgap");
                      resetGrid();
                    }}
                    className={`text-sm md:text-xl z-2 w-1/2 px-4 rounded bg-transparent lg:h-10 ${
                      gridMode === "withoutgap"
                        ? "text-white font-bold dark:text-black"
                        : "text-black dark:text-white"
                    }`}
                    size="sm"
                  >
                    Without Gap
                  </Button>
                </div>
              </>
            )}
            {cropMode !== "custom" && (
              <p className="text-red-500 font-bold text-sm mt-2">
                {`Resolution recommendations : ${
                  cropMode === "grid"
                    ? gridMode === "withgap"
                      ? "3130px x " + gridRows * 1350 + "px"
                      : "3110px x " + gridRows * 1350 + "px"
                    : cropMode === "carousel"
                      ? 1080 * gridCols + "px x 1350px"
                      : ""
                }
                            `}
              </p>
            )}
          </div>

          <div className="w-full flex pb-2 mt-4 gap-1 items-end">
            <Button
              className="mt-2 text-sm border-black w-1/2 rounded-full"
              onClick={() => {
                images = "";
                onImageChange(images);
              }}
              size="lg"
              variant="shadow"
            >
              Back
            </Button>
            <Button
              className="mt-2 text-sm font-bold text-white w-1/2 rounded-full"
              onClick={() => {
                handleCrop();
              }}
              size="lg"
              color="success"
              variant="shadow"
              
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="ml-2">Loading...</span>
                </div>
              ) : (
                "Crop"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
