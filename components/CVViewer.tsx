'use client';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export default function CVViewer() {
    return (
        <div className="w-full h-full overflow-hidden rounded-3xl bg-black">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <div
                    className={`
                        w-full h-full
                        [&_.rpv-core__viewer]:!bg-black
                        [&_.rpv-core__inner-pages]:!w-full
                        [&_.rpv-core__page-layer]:!w-full
                        [&_.rpv-core__canvas]:!bg-black
                    `}
                >
                    <Viewer fileUrl="/CV_Gabin-Guerin.pdf" />
                </div>
            </Worker>
        </div>
    );
}
