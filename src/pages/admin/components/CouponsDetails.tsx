import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import { useSelector} from "react-redux";
import {PencilIcon, MinusCircleIcon} from '@heroicons/react/24/solid'
import {MinusIcon} from "@heroicons/react/20/solid";
import process from "process";
import toast from "react-hot-toast";

interface Coupon {
    id: string;
    name: string;
    value: number;
    qty: number;
    active: number
}

export default function CouponsDetails() {
    const [coupons, setCoupons] = useState([]);
    const user = useSelector((state: any) => state.user);
    const {token} = user;
    const apiUrl = `${process.env.API_URL}/api/coupons`;
    const [newCoupon, setNewCoupon] = useState({name: '', value: 0, active: 1, qty: 0});
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCoupons(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [apiUrl, token]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (coupon: Coupon) => {
        setEditingCoupon(coupon);
    };
    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`${process.env.API_URL}/api/coupons/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCoupons(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleSave = async () => {
        const data = [];
        data.push(newCoupon)
        try {
            const response = await axios.post(apiUrl, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchData();
        } catch (error) {
            toast.error("Someting went wrong")
            console.error('Error:', error);
        }
        setNewCoupon({name: '', value: 0, active: 1, qty: 0});
        setIsAddingNew(false);
    };

    const handleSaveEdit = async () => {
        if (editingCoupon) {
            const data =
                {
                    name: editingCoupon.name,
                    value: editingCoupon.value,
                    qty: editingCoupon.qty,
                    active: editingCoupon.active
                }
            setEditingCoupon(null);
            try {
                const response = await axios.put(`${process.env.API_URL}/api/coupons/${editingCoupon.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                fetchData();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    return (

        <div className="py-10 px-2 text-secondary">
            <div>
                <h2 className="text-lg font-semibold mb-4">Available coupons options:</h2>
                <ul>
                    {coupons && coupons?.map((coupon: Coupon) => (
                        <li key={coupon.id} className="p-5 border rounded mb-5 shadow-sm">
                            <div className="flex items-center">
                                <div className="flex items-center rounded-md text-white bg-gray-500 w-fit mr-5 border">
                                    <div className="w-[120px] px-2">
                                        {coupon.name}
                                    </div>
                                    <div className="w-[120px] text-center bg-gray-200 ml-5 p-2 text-secondary">
                                        {coupon.value} %
                                    </div>
                                </div>
                                <span className="mr-5">{'Qty: ' + coupon.qty}</span>
                                {coupon.active == 1 && <span className="mr-5 font-bold">Active</span>}
                                {coupon.active == 0 && <span className="mr-5 font-bold">Inactive</span>}

                                {!editingCoupon && (
                                    <div className="cursor-pointer">
                                        <button className="bg-blue-500 text-white p-2 rounded-full"
                                                onClick={() => handleEdit(coupon)}>
                                            <PencilIcon className="h-4 w-4"/>
                                        </button>
                                        <button className="bg-error text-white p-2 rounded-full ml-2"
                                                onClick={() => handleDelete(coupon.id)}>
                                            <MinusIcon className="h-4 w-4"/>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {editingCoupon && editingCoupon.id === coupon.id && (
                                <>
                                <div className="grid grid-cols-5 gap-5 mt-5 mb-1">
                                    <div className="text-sm">Name</div>
                                    <div className="text-sm">Value</div>
                                    <div className="text-sm">Qty</div>
                                    <div className="text-sm">Active</div>
                                </div>
                                    <div className="grid grid-cols-5 gap-5 mb-5">
                                        <input
                                            type="text"
                                            placeholder="Dimension"
                                            className="p-2 border rounded-sm"
                                            value={editingCoupon.name}
                                            onChange={(e) => setEditingCoupon({...editingCoupon, name: e.target.value})}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Value"
                                            className="p-2 border rounded-sm"
                                            value={editingCoupon.value}
                                            onChange={(e) => setEditingCoupon({...editingCoupon, value: parseFloat(e.target.value)})}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Qty"
                                            className="p-2 border rounded-sm"
                                            value={editingCoupon.qty}
                                            onChange={(e) => setEditingCoupon({...editingCoupon, qty: parseInt(e.target.value)})}
                                        />
                                        <input 
                                            type="checkbox" 
                                            checked={editingCoupon.active == 1}
                                            className="w-5" 
                                            onChange={() => setEditingCoupon({...editingCoupon, active: editingCoupon.active == 1 ? 0: 1})}
                                        />
                                        <button className="bg-primary text-white rounded-md"
                                                onClick={handleSaveEdit}>Save
                                        </button>
                                    </div>
                                    <button className="text-center text-sm my-5  block w-full font-bold text-blue-500"
                                            onClick={() => {
                                                setIsAddingNew(false), setEditingCoupon(null)
                                            }}>- Undo change
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                {isAddingNew ? (
                    <>
                        <div className="px-5">
                        <div className="grid grid-cols-5 gap-5 mt-5 mb-1">
                            <div className="text-sm">Name</div>
                            <div className="text-sm">Value</div>
                            <div className="text-sm">Qty</div>
                            <div className="text-sm">Active</div>
                        </div>
                        <div className="grid grid-cols-5 gap-5 mb-5">
                            <input
                                type="text"
                                className="p-2 border rounded-sm"
                                placeholder="Name"
                                value={newCoupon.name}
                                onChange={(e) => setNewCoupon({...newCoupon, name: e.target.value})}
                            />
                            <input
                                className="p-2 border rounded-sm"
                                type="number"
                                placeholder="Value"
                                value={newCoupon.value}
                                onChange={(e) => setNewCoupon({...newCoupon, value: parseFloat(e.target.value)})}
                            />
                            <input
                                className="p-2 border rounded-sm"
                                type="number"
                                placeholder="Qty"
                                value={newCoupon.qty}
                                onChange={(e) => setNewCoupon({...newCoupon, qty: parseInt(e.target.value)})}
                            />
                            <input 
                                type="checkbox"
                                checked={newCoupon.active == 1}
                                className="w-5"
                                onChange={() => setNewCoupon({...newCoupon, active: newCoupon.active == 1 ? 0: 1})}
                            />
                            <button className="bg-primary text-white rounded-md" onClick={handleSave}>Save</button>
                        </div>
                        <button className="text-center text-sm my-5  block w-full font-bold text-blue-500"
                                onClick={() => {
                                    setIsAddingNew(false), setEditingCoupon(null)
                                }}>- Undo change
                        </button>
                        </div>
                    </>
                ) : (
                    <button className="text-center text-sm my-5  block w-full font-bold text-primary"
                            onClick={() => setIsAddingNew(true)}>+ Add New Entry</button>
                )}
            </div>
        </div>
    )
}
