import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "@/userManagement/userSlice";
import {router} from "next/client";
import {useRouter} from "next/router";


export default function Dashboard() {
   console.log("DASHBOARD")
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state:any) => state.user);

    console.log("LOGGED IN USER:", user);

    const handleLogout = () => {
        // Dispatch the logout action to clear the user data
        dispatch(logout());
        router.push('/admin/login');
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
