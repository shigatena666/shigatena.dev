export interface SelectedImage {
  src: string;
  alt: string;
  orientation: string;
}

export interface ImagePopupProps {
  src: string;
  alt: string;
  orientation: string;
  onClose: () => void;
  onDownloadComplete: (success: boolean) => void;
}

export interface MasonryGridProps {
  // Add any props if needed in the future
} 