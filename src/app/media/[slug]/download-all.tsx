"use client";

import { Button } from "@/components/ui/button";
import ButtonIcon from "@/components/ui/button-icon";
import { saveAs } from "file-saver";

interface DownloadAllButtonProps {
  media: any;
}

const DownloadAllButton: React.FC<DownloadAllButtonProps> = ({ media }) => {
  const downloadAllImages = async () => {
    const imageUrl = media?.file?.data?.attributes?.url;
    const imageName = media?.file?.data?.attributes?.name || "image.jpg";
    if (imageUrl) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      saveAs(blob, imageName);
    }
  };

  return (
    media.downloadAll && (
      <Button variant="default" onClick={downloadAllImages}>
        {media.downloadAll}
        <ButtonIcon variant="secondary" />
      </Button>
    )
  );
};

export default DownloadAllButton;
