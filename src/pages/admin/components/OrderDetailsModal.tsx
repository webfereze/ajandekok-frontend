import React, {useState} from 'react';
import {FolderArrowDownIcon, XMarkIcon} from '@heroicons/react/24/solid'
import axios from "axios";
import {useSelector} from "react-redux";

function OrderDetailsModal({ order, onClose, onFetch } : {order:any, onClose:any, onFetch:any}) {
    const user = useSelector((state: any) => state.user);
    const {token} = user;
    const apiUrl = `${process.env.API_URL}/api/orders`;
    const downloadImage = (imageUrl:string) => {
        const anchor = document.createElement('a');
        anchor.href = imageUrl;
        window.open(imageUrl, '_blank');
        anchor.click();
    };

    const [selectedStatus, setSelectedStatus] = useState<string>(order.status);

    const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value;
        setSelectedStatus(newStatus);
        try {
             const response = await axios.put(apiUrl, {status:parseInt(newStatus)}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onFetch();
        } catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-400 bg-opacity-70">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-s backdrop-blur-sm"></div>
                </div>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 w-full  text-left">
                                <div className="flex items-center justify-between border-b pb-3">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Order Details</h3>
                                        <div className="flex items-center">
                                            <label htmlFor="statusSelect" className="mr-2 text-secondary">
                                                Select Status:
                                            </label>
                                            <select
                                                id="statusSelect"
                                                name="status"
                                                value={selectedStatus}
                                                onChange={handleStatusChange}
                                                className="px-2 py-1 border rounded-md text-secondary"
                                            >
                                                <option value="1">Awaiting</option>
                                                <option value="2">In Progress</option>
                                                <option value="3">Delivered</option>
                                                <option value="4">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>



                                    <div
                                        className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                                        <XMarkIcon onClick={onClose} className="w-5 h-5 text-secondary" />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        <strong> Order ID: </strong> {order.id}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <strong> Shipping: </strong> {order.shipping}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <strong> First Name:</strong> {order.first_name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <strong>Last Name:</strong> {order.last_name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <strong>Email:</strong> {order.email}
                                    </p>
                                    <p className="text-sm text-gray-500 pb-2 border-b">
                                        <strong>Phone: </strong>{order.phone}
                                    </p>

                                    <p className="text-sm text-gray-500 pt-2">
                                        <strong>Address: </strong>{order.address}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        <strong>ZIP Code: </strong>{order.zip_code}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        <strong>City: </strong>{order.city}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        <strong> Mentions: </strong> {order.details}
                                    </p>
                                    <p className="text-sm text-gray-500 pb-2 border-b">
                                        <strong>Country: </strong>{order.country}
                                    </p>



                                    {order.order_photos && order.order_photos.map((photo:any) => (
                                        <div key={photo.url} className="border-b text-sm py-4 text-gray-500 relative flex items-start justify-between">
                                            <div>
                                                <div><strong>Quantity: </strong>{photo.quantity}</div>
                                                <strong>Size: </strong>{photo.size}
                                                <div role="presentation" onClick={()=>downloadImage(photo.url)} className="text-right flex items-center justify-center text-indigo-500 cursor-pointer">
                                                    Download
                                                    <FolderArrowDownIcon className="w-5 h-5 ml-2 text-indigo-500"></FolderArrowDownIcon>

                                                </div>
                                            </div>
                                            <img className="w-[150px]" src={photo.url.endsWith('.heic') || photo.url.endsWith('.heif') ? 'https://www.pozacanvas.ro/placeholder.png' : photo.url} />
                                             </div>
                                    ))}


                                    {/* Add more order details here */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 border-t px-4 py-2 text-right text-secondary">
                        Total:
                        <div className="bg-primary px-1 py-1.5 text-sm rounded-md inline-block text-white ml-2 ">{order.total_price} LEI</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsModal;
