// CVSection.tsx
'use client';

import { useEffect, useState } from 'react';

export default function CVSection() {
    const [ViewerComp, setViewerComp] = useState<React.ReactNode>(null);

    useEffect(() => {
        import('@/components/CVViewer').then((mod) => {
            setViewerComp(<mod.default />);
        });
    }, []);

    return (
        <div className="w-full h-full overflow-hidden rounded-3xl bg-white">
            {ViewerComp || <p className="text-center p-4 text-black">Chargement du CV...</p>}
        </div>
    );
}
