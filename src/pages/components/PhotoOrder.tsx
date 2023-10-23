import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import GalleryIcon from "@/assets/svg/gallery.svg"
import Image from "next/image";
import toast, {Toaster} from "react-hot-toast";
import {TrashIcon, PencilSquareIcon, PlusIcon} from '@heroicons/react/24/outline'
import BillingData, {FormData} from "@/pages/components/BillingData";
import {SubmitHandler, useForm} from "react-hook-form";

interface ImageField {
    file: File | null;
    dimensions: string | null;
    quantity: number;
    previewURL: string | null;
    error: string;
}

interface CurrentStep {
    step: number;
}

export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    country: string;
    city: string;
    postalCode: string;
    phone: string;
    shippingOption: string;
}

export default function PhotoOrder() {
    const apiUrl = 'https://www.ajandekok.fereze.com/api/canvas';
    const [availableDimensions, setAvailableDimensions] = useState([]);
    const [currentStep, setCurrentStep] = useState<CurrentStep>({step: 3});
    const [orderDetails, setOrderDetails] = useState<[]>([]);
    const [checkoutPossible, setCheckoutPossible] = useState<boolean>(false);


    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    };

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
        updatedFields[index].error = '';
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                updatedFields[index].previewURL = e.target ? e.target.result as string : '';
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
            const selectedDimension = availableDimensions.find((dim: any) => dim.dimension === field.dimensions);
            if (selectedDimension) {
                return total + field.quantity * (selectedDimension as { dimension: string; price: number }).price;
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

    const calculateFieldPrice = (dimension: string, quantity: number): number | undefined => {
        if (availableDimensions) {
            const matchingObject = availableDimensions?.find((item: { dimension:string, price:number }) => item.dimension === dimension);
            if (matchingObject) {
                return matchingObject?.price * quantity;
            } else {
                return undefined; // Return undefined if dimension is not found
            }
        }
    };

    useEffect(() => {
        calculateTotalPrice();
        console.log(imageFields);
        if (imageFields.length == 0) {
            setCurrentStep({step: 1});
        } else {
            setCurrentStep({step: 2});
        }
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
            setCurrentStep({step: 3});
            console.log('Submitted data:', imageFields);
        }
    }

    const [formData, setFormData] = useState<FormData | null>(null);

    // Function to receive form data from the child component
    const handleFormData = (data: FormData) => {
        setFormData(data);
        console.log(data);
    };


    return (

        <>
            <Toaster/>
            <div className="container px-2 mx-auto my-10">
                <div
                    onClick={()=>setCurrentStep({step:1})}
                    className={`${currentStep.step === 2 ? 'steps-border-half' : ''} ${currentStep.step === 3 ? '!steps-border-full ' : ''}relative my-5 flex mx-auto sm:w-1/2 md:1/3 lg:1/4 justify-between steps-border`}>
                    <div className="text-center flex flex-col">
                        <span
                            className={`text-white bg-primary  w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer z-[2]`}>1</span>
                        <p className="text-sm text-secondary font-semibold mt-1">Add photos</p>
                    </div>
                    <div className="text-center flex flex-col" onClick={addImageField}>
                        <span
                            className={`${currentStep.step > 1 ? 'text-white bg-primary' : 'text-secondary bg-surface'} w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer z-[2]`}>2</span>
                        <p className="text-sm text-secondary font-semibold mt-1">Configure</p>
                    </div>
                    <div className="text-center flex flex-col">
                        <span
                            className={`${currentStep.step > 2 ? 'text-white bg-primary' : 'text-secondary bg-surface'} w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer z-[2]`}>3</span>
                        <p className="text-sm text-secondary font-semibold mt-1">Place order</p>
                    </div>
                </div>
            </div>

            {currentStep.step === 1 &&
                <div className="container px-2 mx-auto my-10">
                    <h1 className="text-center text-secondary text-4xl font-bold mb-10">Photo order</h1>
                    <div className="bg-background block md:grid grid-cols-3 p-10 w-full rounded-xl">
                        <div className="bg-background col-span-2 rounded-xl py-5 px-5 cursor-pointer text-center">
                            <Image className="mx-auto" src={GalleryIcon} alt="Ajandekok.ro | Gallery"/>
                            <p className="text-secondary text-sm pt-5 text-center">Click on button to configure
                                photo</p>
                            <p className="text-lightGrey text-xs py-2">JPG/TIF, min 700x700 px, max 3000x3000 px,
                                max 2GB</p>
                            <div
                                onClick={addImageField} role="presentation"
                                className="bg-primary inline-block text-white text-center py-2 px-5 rounded-full mt-5 cursor-pointer">
                                Start configuring
                            </div>
                        </div>
                        <div className="text-right col-span-1 md:px-10">
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
            }


            {currentStep.step == 2 && imageFields.length > 0 &&
                <div className="container mx-auto">
                    <h1 className="text-3xl text-secondary text-center my-5 font-bold ">Configure your options</h1>
                    <div className="block md:grid grid-cols-3 lg:grid-cols-4 gap-4 mt-10 mb-20">
                        {imageFields.map((field, index) => (
                            <div key={index}
                                 className="relative bg-background rounded-xl mb-10 border border-y-4 py-5 px-5 cursor-pointer text-center text-secondary flex flex-col justify-between">
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
                                        <div className="relative flex-col w-full h-32 mb-5 flex mx-auto cursor-pointer text-center border-b"
                                             onClick={() => fileInputRefs.current[index]?.click()}>
                                            <Image className="mx-auto" src={GalleryIcon} alt="Ajandekok.ro | Gallery"/>
                                            <p className="text-center text-sm mt-2">Click <strong>here</strong> to upload </p>

                                        </div>)
                                    }

                                    <div>
                                        <p className="text-center text-sm mb-1">Dimension</p>
                                        <select
                                            value={field.dimensions as string}
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
                                                className="cursor-pointer flex items-center justify-center bg-gray-400 w-full h-full py-3 text-white uppercase text-center border-r"
                                            >
                                                <PencilSquareIcon className="w-5 h-5 text-white"/>

                                            </button>)}
                                        <button
                                            onClick={() => removeImageField(index)}
                                            className="cursor-pointer flex items-center justify-center bg-gray-400 w-full h-full py-3 text-white uppercase text-center"
                                        >
                                            <TrashIcon className="w-5 h-5 text-white"/>
                                        </button>
                                    </div>
                                    <div className="text-secondary my-2 text-sm">
                                        price: <strong>{calculateFieldPrice(field.dimensions, field.quantity)} RON</strong>
                                    </div>

                                    {field.error &&
                                        <p className="text-error bg-primary text-white text-sm">{field.error}</p>}
                                </div>

                            </div>
                        ))}
                        <div
                            className="bg-background rounded-xl mb-10 py-10 px-5 cursor-pointer text-center text-secondary  justify-between"
                            onClick={addImageField} role="presentation">
                            <div className="relative mb-10 flex mx-auto cursor-pointer text-center">
                                <PlusIcon className="w-20 h-20 text-primary mx-auto"/>
                            </div>
                            <p className="text-secondary text-sm text-center">Let's add another one!</p>
                            <p className="text-lightGrey text-xs py-2">This box helps you to create a configurations based on your desire.
                                If you want to add a new one, just click <strong>here</strong>
                            </p>
                            <p className="text-lightGrey text-xs py-2">Also <strong>discounts</strong> are apllied. </p>
                            <div className="text-xs">
                                <div>>50db - 10%</div>
                                <div>>100db - 20%</div>
                                <div>>200db - 30%</div>
                                <div>>400db - 40%</div>
                                <div>>500db - 50%</div>
                            </div>
                            <div>
                                <div
                                    className="bg-primary inline-block text-white text-center py-2 px-5 rounded-full mt-5 cursor-pointer">
                                    Add configuration
                                </div>
                            </div>


                        </div>
                    </div>
                </div>}

            {currentStep.step === 3 && imageFields.length > 0 && <div className="text-secondary">
                <div className="bg-background">
                    <div className="container mx-auto px-2">
                        <div className="grid grid-cols-6 py-5">

                            <div className="col-span-3">
                                <div className="py-10 px-5 rounded-md bg-white shadow-md text-secondary">

                                    <h3 className="font-bold text-sm mb-5 text-secondary">Billing details</h3>
                                    <BillingData onFormSubmit={handleFormData}/>
                                </div>

                            </div>
                            <div className="col-span-1"></div>

                            <div className="col-span-2">


                                <div className="py-10 px-5 rounded-md bg-white shadow-md text-secondary">
                                    <div className="flex items-center justify-between pb-5 border-b">
                                        <div>
                                            <h3 className="font-bold flex items-center justify-between">Order summary</h3>
                                            <span className="text-sm"> ({imageFields.length}) items</span>
                                        </div>
                                        <PencilSquareIcon role="presentation" onClick={() => setCurrentStep({step:2})} className="w-7 h-7 text-primary"/>
                                    </div>

                                    <div>
                                        {imageFields.map((field, index) => (
                                            <div className="flex items-center justify-start" key={index}>
                                                {field.previewURL && (
                                                    <div className="relative">
                                                        <Image
                                                            src={field.previewURL}
                                                            alt="Preview"
                                                            width={80}
                                                            height={80}
                                                            className="w-20 h-20 mx-auto object-contain"
                                                        />
                                                    </div>
                                                )}
                                                <div className="pl-5 text-sm">
                                                    {field.dimensions}
                                                    {field.quantity}
                                                    <div className="text-secondary text-sm">
                                                        price: <strong>{calculateFieldPrice(field.dimensions, field.quantity)} RON</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 pt-10 border-t">
                                        <div className="text-left font-bold">Total</div>
                                        <div className="text-right font-bold">{totalPrice.toFixed(2)} RON</div>
                                    </div>
                                    <div className="text-center">

                                        <div
                                            className={`${!checkoutPossible ? 'pointer-events-none opacity-50' : ''} font-semibold bg-primary inline-block text-white py-3 mt-5 rounded-full px-5 text-sm`}>Check
                                            out
                                        </div>
                                        {!checkoutPossible &&
                                            <p className="text-xs mt-5">Make sure you have completed all the datas for the complete checkout</p>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            }


            <div
                className={`${currentStep.step === 1 || currentStep.step === 2 ? 'flex opacity-100' : 'hidden opacity-0' } bg-background border-t shadow-md py-5 fixed left-0 right-0 bottom-0 flex justify-between text-right px-10`}>
                <div className="text-secondary text-left">
                    <p>Photos</p>
                    <div>
                        Total Price: <strong>RON: {totalPrice.toFixed(2)}</strong>
                    </div>
                </div>

                {currentStep.step === 1 &&
                    <div onClick={addImageField} role="presentation"
                         className="font-semibold bg-primary inline-block py-4 rounded-full px-5 text-sm">Configureaza
                    </div>}


                {currentStep.step === 2 &&
                    <div onClick={() => saveImages()}
                         className="font-semibold bg-primary inline-block py-4 rounded-full px-5 text-sm">Finalizeaza
                        comanda
                    </div>}

            </div>

        </>
    )
}
