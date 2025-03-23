"use client";

import { useState } from "react";
import Masonry from "react-masonry-css";
import { SmartImage, Feedback, RevealFx, TiltFx } from "@/once-ui/components";
import styles from "./Gallery.module.scss";
import { gallery } from "@/app/resources/content";
import ImagePopup from "./ImagePopup";

interface SelectedImage {
  src: string;
  alt: string;
  orientation: string;
}

interface FeedbackState {
  show: boolean;
  isError: boolean;
}

export default function MasonryGrid() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>({ show: false, isError: false });

  const breakpointColumnsObj = {
    default: 4,
    1440: 3,
    1024: 2,
    560: 1,
  };

  const handleDownloadComplete = (success: boolean) => {
    setFeedback({ show: true, isError: !success });
    setTimeout(() => {
      setFeedback({ show: false, isError: false });
    }, 3000);
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

      {feedback.show && (
        <RevealFx
          speed="fast"
          trigger={true}
          style={{
            position: 'fixed',
            bottom: 'calc(var(--static-space-24) + var(--static-space-64))',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2000
          }}
        >
          <Feedback
            icon
            variant={feedback.isError ? "danger" : "success"}
            title={feedback.isError ? "Download failed" : "Download successful"}
            description={feedback.isError ? "There was an error downloading the image." : "The image has been downloaded to your device."}
            style={{
              padding: 'var(--static-space-4)',
              width: 'fit-content',
              minWidth: '320px'
            }}
          />
        </RevealFx>
      )}
    </>
  );
}
