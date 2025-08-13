'use client';
// import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

export default function CVViewer() {
  const [PDFWrapper, setPDFWrapper] = useState<React.FC | null>(null);

  useEffect(() => {
    (async () => {
      const mod = await import('@react-pdf-viewer/core');
      const { Worker, Viewer } = mod;

      const Wrapper = () => (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl="/CV_Gabin-Guerin.pdf" />
        </Worker>
      );

      setPDFWrapper(() => Wrapper);
    })();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden rounded-3xl bg-black">
      {PDFWrapper ? <PDFWrapper /> : <p>Chargement du CV…</p>}
    </div>
  );
}
