"use client";

import { useState } from "react";
import Masonry from "react-masonry-css";
import { SmartImage, RevealFx, TiltFx, useToast } from "@/once-ui/components";
import styles from "./Gallery.module.scss";
import { gallery } from "@/app/resources/content";
import ImagePopup from "./ImagePopup";

interface SelectedImage {
  src: string;
  alt: string;
  orientation: string;
}

export default function MasonryGrid() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const { addToast } = useToast();

  const breakpointColumnsObj = {
    default: 4,
    1440: 3,
    1024: 2,
    560: 1,
  };

  const handleDownloadComplete = (success: boolean) => {
    addToast({
      variant: success ? "success" : "danger",
      message: success ? "The image has been downloaded to your device." : "There was an error downloading the image."
    });
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {gallery.images.map((image, index) => (
          <TiltFx  
            position="relative"
            maxWidth={48}
            aspectRatio={0.75}
            radius="l">
            <SmartImage
              priority={index < 10}
              sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
              key={index}
              radius="m"
              aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "9 / 16"}
              src={image.src}
              alt={image.alt}
              className={styles.gridItem}
              onClick={() => setSelectedImage(image)}
            />
          </TiltFx>
        ))}
      </Masonry>
      
      {selectedImage && (
        <ImagePopup
          src={selectedImage.src}
          alt={selectedImage.alt}
          orientation={selectedImage.orientation}
          onClose={() => setSelectedImage(null)}
          onDownloadComplete={handleDownloadComplete}
        />
      )}
    </>
  );
}
