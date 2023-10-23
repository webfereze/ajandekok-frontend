import React from 'react';
import HeaderAdmin from "@/pages/admin/components/HeaderAdmin";
import Orders from "@/pages/admin/components/Orders";
import axios from "axios";
import {useSelector} from "react-redux";


export default function Dashboard() {
    const user = useSelector((state: any) => state.user);
    const {token} = user;
    const apiUrl = 'https://www.ajandekok.fereze.com/api/orders';

    const fetchData = async () => {
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchData();

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
