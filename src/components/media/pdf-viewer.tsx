"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Document, Page, Thumbnail, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import ButtonIcon from "../ui/button-icon";

export interface PDFViewerProps {
  file: { url: string; alternativeText: string; name: string };
  className?: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function PDFViewer({ file, className }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const proxyUrl = `/api/pdf?pdfUrl=${encodeURIComponent(file.url)}`;
  const scale = containerWidth ? containerWidth / 1024 : 1;

  function goPrevPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function goNextPage() {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {proxyUrl && (
        <a
          download={file.name || "image.jpg"}
          href={proxyUrl ?? ``}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center lg:justify-end pb-2"
        >
          <Button
            className="h-fit w-fit"
            variant="default"
          >
            Télécharger
            <ButtonIcon variant="secondary" />
          </Button>
        </a>
      )}
      <div className="mx-auto flex w-full flex-wrap items-center justify-center space-x-4">
        {numPages > 1 && (
          <Button
            className="flex h-fit w-fit justify-center rounded-full !p-0"
            onClick={goPrevPage}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft
              aria-hidden="true"
              className="h-8 w-8 lg:h-12 lg:w-12"
            />
          </Button>
        )}
        <Document
          loading="Chargement du PDF..."
          file={proxyUrl}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            key={pageNumber}
            pageNumber={pageNumber}
            scale={scale}
            loading="Chargement du PDF..."
            className="m-auto flex flex-grow items-center justify-center"
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
        {numPages > 1 && (
          <Button
            className="flex h-fit w-fit justify-center rounded-full !p-0"
            onClick={goNextPage}
            disabled={pageNumber >= numPages!}
          >
            <ChevronRight
              aria-hidden="true"
              className="h-8 w-8 lg:h-12 lg:w-12"
            />
          </Button>
        )}
      </div>
      <p className="mx-auto mt-5 flex w-fit items-center justify-center border border-accent p-2 py-2 text-base font-semibold">
        Page {pageNumber} sur {numPages}
      </p>
    </div>
  );
}

export function PDFThumbnail({ file }: { file: string }) {
  const proxyUrl = `/api/pdf?pdfUrl=${encodeURIComponent(file)}`;

  return (
    <Document loading="Chargement du PDF..." file={proxyUrl}>
      <Thumbnail pageIndex={0} />
    </Document>
  );
}
