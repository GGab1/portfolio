'use client';

import dynamic from 'next/dynamic';

const PDFViewer = dynamic(
    async () => {
        const mod = await import('@react-pdf-viewer/core');
        const { Worker, Viewer } = mod;

        return function Wrapper() {
            return (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer fileUrl="/CV_Gabin-Guerin.pdf" />
                </Worker>
            );
        };
    },
    { ssr: false }
);

export default function CVViewer() {
    return (
        <div className="w-full h-full overflow-hidden rounded-3xl bg-black">
            <PDFViewer />
        </div>
    );
}
