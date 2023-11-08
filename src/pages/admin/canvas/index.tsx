import React, {useEffect} from 'react';
import HeaderAdmin from "@/pages/admin/components/HeaderAdmin";
import CanvasDetails from "@/pages/admin/components/CanvasDetails";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";


export default function Canvas() {
    const user = useSelector((state: any) => state.user);
    const {token} = user;
    const router = useRouter();


    useEffect(() => {
        if (!token) {router.push('/admin/login')}
    }, [token, router]);


    return (
        <div className="min-h-screen bg-surface">
            <HeaderAdmin/>
            <div className="container mx-auto">
                <CanvasDetails/>
            </div>
        </div>
    );
}
