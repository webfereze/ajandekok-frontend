import React, {useCallback, useEffect, useState} from 'react';
import HeaderAdmin from "@/pages/admin/components/HeaderAdmin";
import axios from "axios";
import {useSelector} from "react-redux";
import OrderDetailsModal from "@/pages/admin/components/OrderDetailsModal";
import {PencilSquareIcon} from '@heroicons/react/24/solid'
import {TrashIcon} from '@heroicons/react/24/outline'
import ConfirmModal from "@/pages/admin/components/ConfirmModal";
import toast, {Toaster} from "react-hot-toast";
import {router} from "next/client";
import {useRouter} from "next/router";


export default function Dashboard() {
    const user = useSelector((state: any) => state.user);
    const {token} = user;
    const apiUrl = `${process.env.API_URL}/api/orders`;
    console.log(apiUrl);
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

    const router = useRouter();

    useEffect(() => {
        if (!token) {router.push('/admin/login')}
    }, [token, router]);

    const openModal = (order:any) => {
        setSelectedOrder(order)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrders(response.data.orders);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [token]);


    const handleOrderClick = (orderId: number) => {
        setSelectedOrderId(orderId);
        setConfirmModalOpen(true);
    };

    const handleConfirm = async () => {
        if (selectedOrderId !== null) {
            try {
                const response = await axios.delete(`${process.env.API_URL}/api/orders/${selectedOrderId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('API Response:', response.data);
                toast.success("Order deleted");
                fetchData();
            } catch (error) {
                toast.error("Server error: Someting went wrong")
            }
        }
        setConfirmModalOpen(false);
        setSelectedOrderId(null);
    };

    const handleConfirmCloseModal = () => {
        setConfirmModalOpen(false);
        setSelectedOrderId(null);
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <div className="min-h-screen bg-surface">
            <HeaderAdmin/>
            {isModalOpen && (
                <OrderDetailsModal order={selectedOrder} onFetch={fetchData} onClose={closeModal} />
            )}

            <ConfirmModal isOpen={isConfirmModalOpen} onClose={handleConfirmCloseModal} onConfirm={handleConfirm} />
            <Toaster/>

            <div className="container mx-auto">
                <div className="py-10 text-secondary">
                    <div className="grid grid-cols-8 rounded-t-md bg-secondary text-white py-2 text-xs">
                        <div className="text-center">Order ID</div>
                        <div className="text-center">Shipping</div>
                        <div className="px-2">Name</div>
                        <div className="px-2">Email</div>
                        <div className="px-2">Phone</div>
                        <div className="px-2">Status</div>
                        <div className="px-2">Price</div>
                        <div className="px-2">Actions</div>
                    </div>

                    {orders.map((order:any) => (
                        <>
                            <div className="grid grid-cols-8 bg-white border-b items-center text-xs py-2" key={order.id}>
                                <div className="text-center">{order.id}</div>
                                <div className="text-center bg-indigo-500 px-1 py-0.5 inline-block text-white rounded-sm">{order.shipping}</div>
                                <div className="px-2">{order.first_name} {order.last_name}</div>
                                <div className="px-2 break-all">{order.email}</div>
                                <div className="px-2">{order.phone}</div>
                                <div className="px-2">

                                    {order.status === 1 && <div className="px-2 py-0.5 bg-orange-400 inline-block rounded-md text-white">Awaiting</div>}
                                    {order.status === 2 && <div className="px-2 py-0.5 bg-green-500 inline-block rounded-md text-white">In progress</div>}
                                    {order.status === 3 && <div className="px-2 py-0.5 bg-green-700 inline-block rounded-md text-white">Delivered</div>}
                                    {order.status === 4 && <div className="px-2 py-0.5 bg-error inline-block rounded-md text-white">Cancelled</div>}

                                </div>
                                <div className="px-2">{order.total_price}</div>
                                <div className="flex items-center px-2">

                                    <div
                                        className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2 "
                                        onClick={() => openModal(order)}
                                    >
                                        <PencilSquareIcon className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div className="text-secondary cursor-pointer" onClick={() => handleOrderClick(order.id)}>
                                        <TrashIcon className="w-5 h-5 text-error" />

                                    </div>

                                </div>
                            </div>
                        </>
                        ))}
                </div>
            </div>
        </div>
    );
}
