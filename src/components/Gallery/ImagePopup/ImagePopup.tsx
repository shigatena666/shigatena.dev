"use client";

import { Flex, ToggleButton } from "@/once-ui/components";
import { useState } from "react";
import { type ImagePopupProps } from '../types';
import styles from './ImagePopup.module.scss';

const ImagePopup = ({ src, alt, orientation, onClose, onDownloadComplete }: ImagePopupProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      const response = await fetch(src);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = src.split('/').pop() || 'image';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      onDownloadComplete(true);
      onClose();
      setIsDownloading(false);
    } catch (error) {
      console.error('Error downloading image:', error);
      onDownloadComplete(false);
      setIsDownloading(false);
    }
  };

  return (
    <div className={styles.imagePopupOverlay} onClick={onClose}>
      <Flex direction="column" gap="16" onClick={(e) => e.stopPropagation()}>
        <Flex
          background="surface"
          padding="16"
          radius="l"
          border="neutral-medium"
          shadow="l"
          horizontal="center"
          vertical="center"
        >
          <img
            src={src}
            alt={alt}
            className={styles.popupImage}
          />
        </Flex>
        <Flex horizontal="center">
          <Flex
            background="surface"
            padding="4"
            radius="l"
            border="neutral-medium"
            shadow="l"
            horizontal="center"
            gap="4"
          >
            <ToggleButton
              prefixIcon="close"
              onClick={onClose}
              label="Close"
              selected={false}
              className="font-code"
              variant="ghost"
            />
            <ToggleButton
              prefixIcon={isDownloading ? "loading" : "download"}
              onClick={handleDownload}
              label={isDownloading ? "Downloading..." : "Download"}
              selected={false}
              className="font-code"
              variant="ghost"
              disabled={isDownloading}
            />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default ImagePopup; 