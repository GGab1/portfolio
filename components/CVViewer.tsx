'use client';

import dynamic from 'next/dynamic';

const PDFViewer = dynamic(
    () =>
        import('@react-pdf-viewer/core').then(({ Worker, Viewer }) => {
            return function Wrapper() {
                return (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl="/CV_Gabin-Guerin.pdf" />
                    </Worker>
                );
            };
        }),
    { ssr: false }
);

export default function CVViewer() {
    return (
        <div className="w-full h-full overflow-hidden rounded-3xl bg-white">
            <PDFViewer />
        </div>
    );
}
