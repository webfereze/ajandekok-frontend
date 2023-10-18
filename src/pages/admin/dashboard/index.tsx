import React from 'react';
import HeaderAdmin from "@/pages/admin/components/HeaderAdmin";
import Orders from "@/pages/admin/components/Orders";


export default function Dashboard() {


    return (
        <div className="min-h-screen bg-surface">
            <HeaderAdmin/>
            <div className="container mx-auto">
                <div className="py-10">
                    <h1 className="text-left text-3xl text-secondary">Dashboard</h1>
                </div>
                <Orders/>
            </div>
        </div>
    );
}
