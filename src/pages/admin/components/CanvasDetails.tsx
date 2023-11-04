import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import { useSelector} from "react-redux";
import {PencilIcon, MinusCircleIcon} from '@heroicons/react/24/solid'
import {MinusIcon} from "@heroicons/react/20/solid";

interface Product {
    id: string;
    dimension: string;
    price: number;
}

export default function CanvasDetails() {
    const [products, setProducts] = useState([]);
    const user = useSelector((state: any) => state.user);
    const {token} = user;
    const apiUrl = 'https://www.ajandekok.fereze.com/api/canvas';
    const [newProduct, setNewProduct] = useState({dimension: '', price: 0});
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [apiUrl, token]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
    };
    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`https://www.ajandekok.fereze.com/api/canvas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleSave = async () => {
        const data = [];
        data.push(newProduct)
        try {
            const response = await axios.post(apiUrl, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
        setNewProduct({dimension: '', price: 0});
        setIsAddingNew(false);
    };

    const handleSaveEdit = async () => {
        if (editingProduct) {
            const data =
                {
                    dimension: editingProduct.dimension,
                    price: editingProduct.price
                }
            setEditingProduct(null);
            try {
                const response = await axios.put(`https://www.ajandekok.fereze.com/api/canvas/${editingProduct.id}`, data, {
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
                <h2 className="text-lg font-semibold mb-4">Available canvas options:</h2>
                <ul>
                    {products && products?.map((product: { id: string; dimension: string; price: number }) => (
                        <li key={product.id} className="p-5 border rounded mb-5 shadow-sm">
                            <div className="flex items-center">
                                <div className="flex items-center rounded-md text-white bg-gray-500 w-fit mr-5 border">
                                    <div className="w-[100px] px-2">
                                        {product.dimension}
                                    </div>
                                    <div className="w-[100px] text-center bg-gray-200 ml-5 p-2 text-secondary">
                                        {product.price} RON
                                    </div>
                                </div>

                                {!editingProduct && (
                                    <div className="cursor-pointer">
                                        <button className="bg-blue-500 text-white p-2 rounded-full"
                                                onClick={() => handleEdit(product)}>
                                            <PencilIcon className="h-4 w-4"/>
                                        </button>
                                        <button className="bg-error text-white p-2 rounded-full ml-2"
                                                onClick={() => handleDelete(product.id)}>
                                            <MinusIcon className="h-4 w-4"/>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {editingProduct && editingProduct.id === product.id && (
                                <>
                                <div className="grid grid-cols-3 gap-3 mt-5 mb-1">
                                    <div className="text-sm">Dimension</div>
                                    <div className="text-sm">Price</div>
                                </div>
                                    <div className="grid grid-cols-3 gap-3 mb-5">
                                        <input
                                            type="text"
                                            placeholder="Dimension"
                                            className="p-2 border rounded-sm"
                                            value={editingProduct.dimension}
                                            onChange={(e) => setEditingProduct({...editingProduct, dimension: e.target.value})}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            className="p-2 border rounded-sm"
                                            value={editingProduct.price}
                                            onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                                        />
                                        <button className="bg-primary text-white rounded-md"
                                                onClick={handleSaveEdit}>Save
                                        </button>
                                    </div>
                                    <button className="text-center text-sm my-5  block w-full font-bold text-blue-500"
                                            onClick={() => {
                                                setIsAddingNew(false), setEditingProduct(null)
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
                        <div className="grid grid-cols-3 gap-3 mt-5 mb-1">
                            <div className="text-sm">Dimension</div>
                            <div className="text-sm">Price</div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-5">
                            <input
                                type="text"
                                className="p-2 border rounded-sm"
                                placeholder="Dimension"
                                value={newProduct.dimension}
                                onChange={(e) => setNewProduct({...newProduct, dimension: e.target.value})}
                            />
                            <input
                                className="p-2 border rounded-sm"
                                type="number"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                            />
                            <button className="bg-primary text-white rounded-md" onClick={handleSave}>Save</button>
                        </div>
                        <button className="text-center text-sm my-5  block w-full font-bold text-blue-500"
                                onClick={() => {
                                    setIsAddingNew(false), setEditingProduct(null)
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
