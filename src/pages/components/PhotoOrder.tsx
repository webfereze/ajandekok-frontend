import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import GalleryIcon from "@/assets/svg/gallery.svg"
import Image from "next/image";
import {PencilIcon} from '@heroicons/react/24/solid'
import toast, {Toaster} from "react-hot-toast";

interface ImageField {
    file: File | null;
    dimensions: string | null;
    quantity: number;
    previewURL: string | null;
    error: string;
}

export default function PhotoOrder() {
    const apiUrl = 'https://www.ajandekok.fereze.com/api/canvas';
    const [availableDimensions, setAvailableDimensions] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(apiUrl);
            setAvailableDimensions(response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [imageFields, setImageFields] = useState<ImageField[]>([]);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Function to add a new image field
    const addImageField = () => {
        toast.success('Image field added. Please complete your request.')
        const newImageField: ImageField = {
            file: null,
            dimensions: availableDimensions[0].dimension,
            quantity: 1,
            previewURL: null,
            error: '',
        };
        setImageFields([...imageFields, newImageField]);
    };

    // Function to handle file input changes
    const handleFileChange = (index: number, file: File | null) => {
        const updatedFields = [...imageFields];
        updatedFields[index].file = file;
        updatedFields[index].error = file ? '' : 'File is required';
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                updatedFields[index].previewURL = e.target.result as string;
                setImageFields(updatedFields);
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to handle dimensions selection
    const handleDimensionsChange = (index: number, dimensions: string) => {
        const updatedFields = [...imageFields];
        updatedFields[index].dimensions = dimensions;
        setImageFields(updatedFields);
    };

    // Function to handle quantity input changes
    const handleQuantityChange = (index: number, quantity: number) => {
        const updatedFields = [...imageFields];
        updatedFields[index].quantity = quantity;
        setImageFields(updatedFields);
    };

    // Function to remove an image field
    const removeImageField = (index: number) => {
        const updatedFields = [...imageFields];
        updatedFields.splice(index, 1);
        setImageFields(updatedFields);
    };

    // Function to calculate the total price
    const calculateTotalPrice = () => {
        const price = imageFields.reduce((total, field) => {
            const selectedDimension = availableDimensions.find((dim) => dim.dimension === field.dimensions);
            if (selectedDimension) {
                return total + field.quantity * selectedDimension.price;
            }
            return total;
        }, 0);

        setTotalPrice(price);
    };

    const increaseQuantity = (index: number) => {
        const updatedFields = [...imageFields];
        updatedFields[index].quantity += 1;
        setImageFields(updatedFields);
    };

    // Function to decrease quantity (minimum value is 1)
    const decreaseQuantity = (index: number) => {
        const updatedFields = [...imageFields];
        if (updatedFields[index].quantity > 1) {
            updatedFields[index].quantity -= 1;
            setImageFields(updatedFields);
        }
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [imageFields]);

    const saveImages = () => {
        const isAnyFileEmpty = imageFields.some((field) => !field.file);

        if (isAnyFileEmpty) {
            const updatedFields = imageFields.map((field) => ({
                ...field,
                error: field.file ? '' : 'File is required',
            }));
            setImageFields(updatedFields);
            console.log('File is required for all fields.');
            toast.error("Some fields are required");
        } else {
            calculateTotalPrice();
            console.log('Submitted data:', imageFields);
        }
    }


    return (

        <>
            <Toaster/>
            <div className="py-5 px-2 text-secondary bg-background">
                <div className="container mx-auto">
                    <div className="block md:flex items-center justify-between w-1/2 mx-auto">
                        <div className="text-left mb-5 ">
                            <h1 className="text-3xl text-secondary text-center mb-5 font-bold ">Photo Order</h1>

                            <div className="bg-white rounded-xl py-5 px-5 cursor-pointer text-center"
                                 onClick={addImageField} role="presentation">
                                <Image className="mx-auto" src={GalleryIcon} alt="Ajandekok.ro | Gallery"/>
                                <p className="text-secondary text-sm pt-5 text-center">Click here to upload photo</p>
                                <p className="text-lightGrey text-xs py-2">JPG/TIF, min 700x700 px, max 3000x3000 px,
                                    max 2GB</p>
                                <div
                                    className="bg-primary inline-block text-white text-center py-2 px-5 rounded-full mt-5 cursor-pointer">
                                    Upload photo
                                </div>
                            </div>

                        </div>

                        <div className="text-right col">
                            <h3 className="text-secondary text-center mb-5 font-bold text-xl">Print prices</h3>
                            <div className="grid grid-cols-2 gap-4 text-secondary">
                                <p className="text-left">Dimension</p>
                                <p>Price</p>
                            </div>
                            <hr className="border-b my-5"/>
                            {availableDimensions && availableDimensions.map((item: {
                                dimension: string;
                                price: number
                            }) => (
                                <div className="grid grid-cols-2 gap-4 text-secondary" key={item.dimension}>
                                    <p className="text-left">{item.dimension}</p>
                                    <p>{item.price} RON</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <h1 className="text-3xl text-secondary text-center my-5 font-bold ">Configure your options</h1>
                <div className="grid grid-cols-4 gap-4 my-10">
                    <div className="bg-background rounded-xl  py-10 px-5 cursor-pointer text-center text-secondary flex flex-col justify-between"
                         onClick={addImageField} role="presentation">
                        <Image className="mx-auto" src={GalleryIcon} alt="Ajandekok.ro | Gallery"/>
                        <p className="text-secondary text-sm pt-5 text-center">Click here to upload new photo</p>
                        <p className="text-lightGrey text-xs py-2">You need to upload one photo and configure by the available options. If you want to add another photo, just click <strong>here</strong></p>
                        <div
                            className="bg-primary inline-block text-white text-center py-2 px-5 rounded-full mt-5 cursor-pointer">
                            Upload photo
                        </div>
                    </div>
                    {imageFields.map((field, index) => (
                        <div key={index}
                             className="bg-background rounded-xl border border-y-4 py-10 px-5 cursor-pointer text-center text-secondary flex flex-col justify-between">

                            <div>
                                <div>
                                    {field.previewURL && (
                                        <div className="relative w-32 h-32 mb-5  mx-auto">
                                            <Image
                                                src={field.previewURL}
                                                alt="Preview"
                                                width={128}
                                                height={128}
                                                className="w-32 h-32 mx-auto object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={(el) => (fileInputRefs.current[index] = el)}
                                    onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
                                    className="hidden"
                                />

                                {!field.previewURL && (
                                    <div className="py-5 px-5 cursor-pointer text-center"
                                         onClick={() => fileInputRefs.current[index]?.click()}>
                                        <Image className="mx-auto" src={GalleryIcon} alt="Ajandekok.ro | Gallery"/>
                                    </div>)
                                }

                                <div>
                                    <p className="text-center text-sm mb-1">Dimension</p>
                                    <select
                                        value={field.dimensions}
                                        onChange={(e) => handleDimensionsChange(index, e.target.value)}
                                        className="border p-1 border-secondary rounded-md pl-3 w-1/2 mx-auto text-center"
                                    >
                                        {availableDimensions.map((dim: { dimension: string }, dimIndex) => (
                                            <option key={dimIndex} value={dim.dimension}>
                                                {dim.dimension}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mt-5">
                                    <p className="text-center text-sm mb-1">Quantity</p>
                                    <div className="flex items-center justify-center mb-5 mx-auto">
                                        <button
                                            onClick={() => decreaseQuantity(index)}
                                            className="text-error text-3xl mr-3"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={field.quantity}
                                            onChange={(e) => handleQuantityChange(index, +e.target.value)}
                                            className="border p-1 border-secondary rounded-md pl-3 w-16 text-center"
                                        />
                                        <button
                                            onClick={() => increaseQuantity(index)}
                                            className="text-error text-3xl ml-3"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>


                            <div>
                                <div className="flex items-center justify-center">
                                {field.previewURL && (
                                    <button
                                        onClick={() => fileInputRefs.current[index]?.click()}
                                        className="text-error uppercase text-center mx-2"
                                    >
                                        EDIT
                                    </button>)}
                                    <button
                                        onClick={() => removeImageField(index)}
                                        className="text-error uppercase text-center mx-5"
                                    >
                                        Remove
                                    </button>
                                </div>
                                {field.error && <p className="text-red-600 text-sm">{field.error}</p>}
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            <div
                className="bg-background py-5 flex justify-between  shadow-md text-right px-10">
                <div className="text-secondary text-left">
                    <p>Photos</p>
                    <div>
                        Total Price: <strong>RON: {totalPrice.toFixed(2)}</strong>
                    </div>
                </div>
                <div onClick={()=>saveImages()} className="font-semibold bg-primary inline-block py-4 rounded-full px-5 text-sm">Finalizeaza
                    comanda
                </div>
            </div>
        </>
    )
}
