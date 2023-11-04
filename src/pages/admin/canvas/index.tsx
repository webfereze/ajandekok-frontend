import React from 'react';
import HeaderAdmin from "@/pages/admin/components/HeaderAdmin";
import CanvasDetails from "@/pages/admin/components/CanvasDetails";


export default function Canvas() {
    return (
        <div className="min-h-screen bg-surface">
            <HeaderAdmin/>
            <div className="container mx-auto">
                <CanvasDetails/>
            </div>
        </div>
    );
}
