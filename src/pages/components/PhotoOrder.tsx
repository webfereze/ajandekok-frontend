import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import GalleryIcon from "@/assets/svg/gallery.svg"
import Image from "next/image";
import toast, {Toaster} from "react-hot-toast";
import {TrashIcon, PencilSquareIcon, PlusIcon} from '@heroicons/react/24/outline'
import {SubmitHandler, useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import HeroImage2 from "@/assets/img/hero.png";
import {Router, useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import useWindowDimensions from "@/pages/components/useMediaQuery";
import * as process from "process";

interface ImageField {
    file: File | null;
    dimensions: number;
    quantity: number;
    previewURL: string | null;
    error: string;
    id?:number;
}

interface CurrentStep {
    step: number;
}

export interface FormData {
    first_name: string;
    last_name: string;
    terms: boolean;
    email: string;
    address: string;
    country: string;
    city: string;
    zip_code: string;
    phone: string;
    details: string;
    shipping: string;
}

export interface AdminFormData {
    email: string;
    password: string;
}

export default function PhotoOrder() {
    const apiUrl = `${process.env.API_URL}/api/orders`;
    const [availableDimensions, setAvailableDimensions] = useState<{ id:number; dimension:string;price:number }[]>([]);
    const [currentStep, setCurrentStep] = useState<CurrentStep>({step: 1});
    const { t } = useTranslation();
    const { isMobile } = useWindowDimensions();
    const router = useRouter();

    const user = useSelector((state: any) => state.user);
    const {token} = user;
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {


        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('email', data.email);
        formData.append('zip_code', data.zip_code);
        formData.append('address', data.address);
        formData.append('country', data.country);
        formData.append('city', data.city);
        formData.append('phone', data.phone);
        formData.append('shipping', data.shipping);
        formData.append('details', data.details);

        imageFields.forEach((image, index) => {
            if (image.file) {
                const imageKey = `images[${index}]`;
                const { file, dimensions, quantity } = image;
                formData.append(`${imageKey}[file]`, file);
                // @ts-ignore
                formData.append(`${imageKey}[dimensions]`, dimensions);
                // @ts-ignore
                formData.append(`${imageKey}[quantity]`, quantity);
                formData.append(`${imageKey}[paper_type]`, 'soon');
            }
        });

        try {
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            await router.push('/thankyou');
        } catch (error) {
            toast.error("Error processing your request.");
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.API_URL}/api/canvas`);
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
            dimensions: availableDimensions[0].id,
            quantity: 1,
            previewURL: null,
            error: '',
        };
        setImageFields([...imageFields, newImageField]);
    };

    const handleFileChange = async (index: number, file: File | null) => {
        const updatedFields = [...imageFields];
        updatedFields[index].file = file;
        updatedFields[index].error = '';

        if (file) {
            const reader = new FileReader();
            reader.onload = (e:any) => {
                let imagePreviewUrl = e.target ? e.target.result as string : '';
                if (!isMobile && (file.type == 'image/heic' || file.type === 'image/heif')) {
                    imagePreviewUrl = 'https://pozacanvas.ro/placeholder.png';
                }
                updatedFields[index].previewURL = imagePreviewUrl;
                setImageFields(updatedFields);
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to handle dimensions selection
    const handleDimensionsChange = (index: number, dimensions: number) => {
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
            const selectedDimension = availableDimensions.find((dim: any) => dim.id == field.dimensions);
            if (selectedDimension) {
                return total + field.quantity * (selectedDimension as { dimension: string; price: number }).price;
            }
            return total;
        }, 0);

        setTotalPrice(price);
    };
    const returnDimensionNameById = (id:number) => {
        const selectedDimension = availableDimensions.find((dim: any) => dim.id == id);
        return selectedDimension?.dimension
    }

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

    const calculateFieldPrice = (id: number, quantity: number): number | undefined => {
        if (availableDimensions) {
            const matchingObject = availableDimensions?.find((item: { id:number, price:number }) => item.id == id);
            if (matchingObject) {
                return matchingObject?.price * quantity;
            } else {
                return undefined; // Return undefined if dimension is not found
            }
        }
    };

    useEffect(() => {
        calculateTotalPrice();
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
            toast.error(t('global.fields.required'));
        } else {
            calculateTotalPrice();
            setCurrentStep({step: 3});
        }
    }

    const submitButtonRef = useRef<HTMLButtonElement | null>(null);

    // Function to trigger the submit button click event
    const handleClick = () => {
        if (submitButtonRef.current) {
            submitButtonRef.current.click();
        }
    };

    // @ts-ignore
    return (

        <>
            <Toaster position="top-right"/>
            <div className="container px-2 mx-auto my-10">
                <div
                    className={`${currentStep.step === 2 ? 'steps-border-half' : ''} ${currentStep.step === 3 ? '!steps-border-full ' : ''}relative my-5 flex mx-auto sm:w-1/2 md:1/3 lg:1/4 justify-between steps-border`}>
                    <div className="text-center flex flex-col" onClick={()=>setCurrentStep({step:1})}>
                        <span
                            className={`text-white bg-primary  w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer ml-0 z-[2]`}>1</span>
                        <p className="text-pico md:text-sm text-secondary font-semibold mt-1">{t('global.step.1')}</p>
                    </div>
                    <div className="text-center flex flex-col" onClick={addImageField}>
                        <span
                            className={`${currentStep.step > 1 ? 'text-white bg-primary' : 'text-secondary bg-surface'} w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer z-[2]`}>2</span>
                        <p className="text-pico md:text-sm text-secondary font-semibold mt-1">{t('global.step.2')}</p>
                    </div>
                    <div onClick={()=> toast.error("Complete the details please.")} className="text-center flex flex-col">
                        <span
                            className={`${currentStep.step > 2 ? 'text-white bg-primary' : 'text-secondary bg-surface'} w-8 h-8 flex ml-auto mr-0 items-center justify-center border-primary border-2 rounded-full cursor-pointer z-[2]`}>3</span>
                        <p className="text-pico md:text-sm text-secondary font-semibold mt-1">{t('global.step.3')}</p>
                    </div>


                </div>
            </div>


            {currentStep.step === 1 &&
            <div className="container mx-auto">
                <div className="block md:grid grid-cols-2 gap-3">
                    <div>
                        <Image alt="Ajandekok.ro | Order page" className="rounded-md" src={HeroImage2}/>
                    </div>
                    <div className="p-2 md:p-10 text-secondary">
                        <h1 className="text-left text-4xl font-bold ">
                            {t('hero.title')}</h1>
                        <span className="text-xs block">Part of <a href="https://www.ajandekok.ro" className="text-primary font-semibold">ajandekok.ro</a> KolPicShop.</span>

                        <p className="py-5 text-md">
                            {t('hero.copyright')}
                            {t('hero.description')}
                        </p>
                        <p className="text-md">
                            {t('hero.description.2')}
                        </p>
                        <div
                            onClick={addImageField} role="presentation"
                            className="bg-primary w-full md:w-fit inline-block text-white text-center py-2 px-5 rounded-full mt-5 cursor-pointer">
                            {t('button.try')}
                        </div>
                        </div>
                </div>

            </div>
            }

            {currentStep.step === 1 &&
                <div className="container px-2 mx-auto my-10">
                    <h1 className="text-center text-secondary text-4xl font-bold mb-10">{t('global.photo.order.text')}</h1>
                    <div className="bg-background block md:grid grid-cols-3 p-10 w-full rounded-xl">
                        <div className="bg-background col-span-2 rounded-xl py-5 px-5 cursor-pointer text-center">
                            <Image className="mx-auto" src={GalleryIcon} alt="Ajandekok.ro | Gallery"/>
                            <p className="text-secondary text-xs pt-5 text-center">
                                {t('descriptive.text.click.to.configure')}
                            </p>
                            <p className="text-lightGrey text-xs py-2">JPG/TIF, min 700x700 px, max 3000x3000 px,
                                max 2MB</p>
                            <div
                                onClick={addImageField} role="presentation"
                                className="bg-primary inline-block text-white text-center py-2 px-5 rounded-full mt-5 cursor-pointer">
                                {t('descriptive.text.start.configure')}
                            </div>
                        </div>
                        <div className="text-right col-span-1 md:px-10">
                            <h3 className="text-secondary text-center mb-5 font-bold text-xl">{t('descriptive.text.prices.title')}</h3>
                            <div className="grid grid-cols-2 gap-4 text-secondary">
                                <p className="text-left">{t('descriptive.text.dimensions')}</p>
                                <p>{t('descriptive.text.price')}</p>
                            </div>
                            <hr className="border-b my-5"/>
                            {availableDimensions && availableDimensions.map((item: { id:number; dimension:string;price:number }) => (
                                <div className="grid grid-cols-2 gap-4 text-secondary" key={item.id}>
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
                    <h1 className="text-3xl text-secondary text-center my-5 font-bold ">{t('descriptive.text.click.to.configure')}</h1>
                    <div className="block md:grid grid-cols-3 lg:grid-cols-4 gap-4 mt-10 mb-20">
                        {imageFields.map((field:any, index) => (
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
                                        accept="image/*, image/heic, image/heif"
                                        ref={(el) => (fileInputRefs.current[index] = el)}
                                        onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
                                        className="hidden"
                                    />

                                    {!field.previewURL && (
                                        <div className="relative flex-col w-full h-32 mb-5 flex mx-auto cursor-pointer text-center border-b"
                                             onClick={() => fileInputRefs.current[index]?.click()}>
                                            <Image className="mx-auto" src={GalleryIcon} alt="Ajandekok.ro | Gallery"/>
                                            <p className="text-center text-sm mt-2">{t('descriptive.text.click.here')} </p>

                                        </div>)
                                    }

                                    <div>
                                        <p className="text-center text-sm mb-1">{t('descriptive.text.dimensions')}</p>
                                        <select
                                            value={field.id}
                                            onChange={(e) => handleDimensionsChange(index, parseInt(e.target.value))}
                                            className="border p-1 border-secondary rounded-md pl-3 w-1/2 mx-auto text-center"
                                        >
                                            {availableDimensions.map((dim: { dimension: string, id:number }, dimIndex) => (
                                                <option key={dimIndex} value={dim.id}>
                                                    {dim.dimension}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mt-5">
                                        <p className="text-center text-sm mb-1">{t('descriptive.text.quantity')}</p>
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
                                                min={1}
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
                                                className="cursor-pointer flex items-center justify-center bg-gray-400 w-full h-full py-3 text-white uppercase text-center border-r">
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
                                        {t('descriptive.text.price')}: <strong>{calculateFieldPrice(field.dimensions, field.quantity)} RON</strong>
                                    </div>

                                    {field.error &&
                                        <p className="text-white bg-primary text-sm">{field.error}</p>}
                                </div>

                            </div>
                        ))}
                        <div
                            className="bg-background rounded-xl mb-10 py-10 px-5 cursor-pointer text-center text-secondary  justify-between"
                            onClick={addImageField} role="presentation">
                            <div className="relative mb-10 flex mx-auto cursor-pointer text-center">
                                <PlusIcon className="w-20 h-20 text-primary mx-auto"/>
                            </div>
                            <p className="text-secondary text-sm text-center">{t('descriptive.text.another.one.title')}</p>
                            <p className="text-lightGrey text-xs py-2">{t('descriptive.text.another.one.desc')}</p>

                            <div>
                                <div
                                    className="bg-primary inline-block text-white text-center py-2 px-5 rounded-full mt-5 cursor-pointer">
                                    {t('global.config.add')}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
            {currentStep.step === 3 && imageFields.length > 0 && <div className="text-secondary">
                <div className="bg-background">
                    <div className="container mx-auto px-2">
                        <div className="block md:grid grid-cols-3 gap-5 py-5">

                            <div className="col-span-2 mt-2 md:mt-0">
                                <div className="py-5 md:py-10 px-5 rounded-md bg-white shadow-md text-secondary">

                                    <h3 className="font-bold text-sm mb-5 text-secondary"> {t('global.billing.details')}</h3>
                                    <form onSubmit={handleSubmit(onSubmit)} >
                                        <div>
                                            <div className="grid grid-cols-2 gap-3 mb-10">
                                                <div className="relative">
                                                    <label htmlFor="first_name" className="absolute left-0 ml-1 -translate-y-3 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">{t('global.order.firstname')}</label>
                                                    <input
                                                        type="text"
                                                        id="first_name"
                                                        {...register('first_name', {required: t('global.label.required'),})}
                                                        className="border border-gray-300 rounded p-2 w-full"
                                                    />
                                                    {errors.first_name && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.first_name.message}</p>}
                                                </div>


                                                <div className="relative">
                                                    <label htmlFor="last_name" className="absolute left-0 ml-1 -translate-y-3 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">{t('global.order.lastname')}</label>

                                                    <input
                                                        type="text"
                                                        id="last_name"
                                                        {...register('last_name', {required: t('global.label.required'),})}
                                                        className="border border-gray-300 rounded p-2 w-full"
                                                    />
                                                    {errors.last_name && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.last_name.message}</p>}
                                                </div>
                                            </div>

                                            <div className="relative my-10">
                                                <label htmlFor="email" className="absolute left-0 ml-1 -translate-y-3 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">E-mail</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    {...register('email', {
                                                        required: t('global.label.required'),
                                                        pattern: {
                                                            value: /\S+@\S+\.\S+/,
                                                            message: 'Invalid email format',
                                                        },
                                                    })}
                                                    className="border border-gray-300 rounded p-2 w-full"
                                                />
                                                {errors.email && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.email.message}</p>}
                                            </div>

                                            <div className="relative mb-10">
                                                <label htmlFor="address" className="absolute left-0 ml-1 -translate-y-3 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">{t('global.order.address')}</label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    {...register('address', {required: t('global.label.required'),})}
                                                    className="border border-gray-300 rounded p-2 w-full"
                                                />
                                                {errors.address && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.address.message}</p>}
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 mb-10">
                                                <div className="relative">
                                                    <label htmlFor="country" className="absolute left-0 ml-1 -translate-y-3 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">{t('global.order.country')}</label>
                                                    <input
                                                        type="text"
                                                        id="country"
                                                        {...register('country', {required: t('global.label.required'),})}
                                                        className="border border-gray-300 rounded p-2 w-full"
                                                    />
                                                    {errors.country && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.country.message}</p>}
                                                </div>

                                                <div className="relative">
                                                    <label htmlFor="city" className="absolute left-0 ml-1 -translate-y-3 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">{t('global.order.city')}</label>

                                                    <input
                                                        type="text"
                                                        id="city"
                                                        {...register('city', {required: t('global.label.required'),})}
                                                        className="border border-gray-300 rounded p-2 w-full"
                                                    />
                                                    {errors.city && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.city.message}</p>}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 mb-10">

                                                <div className="relative">
                                                    <label htmlFor="zip_code" className="absolute left-0 ml-1 -translate-y-3 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">{t('global.order.zip')}</label>

                                                    <input
                                                        type="text"
                                                        id="zip_code"
                                                        {...register('zip_code', {required: t('global.label.required')})}
                                                        className="border border-gray-300 rounded p-2 w-full"
                                                    />
                                                    {errors.zip_code && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.zip_code.message}</p>}
                                                </div>


                                                <div className="relative">
                                                    <label htmlFor="phone" className="absolute left-0 ml-1 -translate-y-3 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">{t('global.order.phone')}</label>

                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        placeholder="Telefon (e.g., 07xxxxxxxx)"
                                                        {...register('phone', {
                                                            required: t('global.label.required'),
                                                            pattern: {
                                                                value: /^(0[2347][0-9]{2}[-. ]?[0-9]{3}[-. ]?[0-9]{3}|0[56][0-9]{8})$/,
                                                                message: 'Invalid format',
                                                            },
                                                        })}
                                                        className="border border-gray-300 rounded p-2 w-full"
                                                    />
                                                    {errors.phone && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.phone.message}</p>}
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <label htmlFor="zip_code" className="absolute left-0 ml-1 -translate-y-3 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm">{t('global.order.details')}</label>

                                                <input
                                                    type="text"
                                                    id="details"
                                                    {...register('details')}
                                                    className="border border-gray-300 rounded p-2 w-full"
                                                />
                                                {errors.details && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.details.message}</p>}
                                            </div>

                                            <div className="relative my-5 px-4 py-2 bg-background rounded-sm">
                                                <label className="font-bold">{t('global.order.shipping')}</label>
                                                <div className="relative flex flex-col text-secondary">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            checked={true}
                                                            className="mr-2"
                                                            value="personal"
                                                            {...register('shipping', {required: t('global.order.shipping')})}
                                                        />
                                                        {t('global.personal.upload')}

                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            className="mr-2"
                                                            value="courier"
                                                            {...register('shipping', {required: t('global.order.shipping')})}
                                                        />
                                                        {t('global.curier.upload')}
                                                    </label>
                                                </div>
                                                {errors.shipping && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.shipping.message}</p>}
                                            </div>

                                            <div className="relative">
                                                <div className="relative text-secondary">
                                                    <label className="font-bold">
                                                        <input
                                                            className="mr-2"
                                                            type="checkbox"
                                                            {...register('terms', {required: t('global.label.required')})}
                                                        />
                                                        <span className="font-light">{t('global.terms.text')} <a className="font-semibold text-primary underline" href="https://ajandekok.ro/termeni-si-conditii">{t('global.here')}</a>. </span>
                                                    </label>

                                                </div>
                                                {errors.terms && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.terms.message}</p>}
                                            </div>
                                        </div>
                                        <button type="submit" ref={submitButtonRef} className="hidden opacity-0 invisible"></button>

                                    </form>
                                </div>

                            </div>

                            <div className="col-span-1 mt-2 md:mt-0">


                                <div className="py-5 px-5 rounded-md bg-white shadow-md text-secondary">
                                    <div className="flex items-center justify-between pb-5 border-b">
                                        <div>
                                            <h3 className="font-bold flex items-center justify-between">{t('global.billing.details')}</h3>
                                            <span className="text-sm"> ({imageFields.length}) {t('global.billing.quantity')}</span>
                                        </div>
                                        <PencilSquareIcon role="presentation" onClick={() => setCurrentStep({step:2})} className="w-7 h-7 text-primary"/>
                                    </div>

                                    <div>
                                        {imageFields.map((field:any, index) => (
                                            <div className="flex items-center justify-start mb-4 mt-2" key={index}>
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
                                                    {returnDimensionNameById(field.dimensions)}
                                                    <div className="text-secondary text-sm">
                                                        {t('descriptive.text.quantity')}: {field.quantity}
                                                    </div>
                                                    <div className="text-secondary text-sm">
                                                        {t('descriptive.text.price')}: <strong>{calculateFieldPrice(field.dimensions, field.quantity)} RON</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 py-2 border-t border-b">
                                        <div className="text-left font-bold">{t('global.billing.total')}</div>
                                        <div className="text-right font-bold">{totalPrice.toFixed(2)} RON</div>
                                    </div>


                                    <div className="text-center my-5">
                                        <button className="font-semibold text-white bg-primary inline-block py-2 rounded-full px-5 text-sm" onClick={handleClick}> {t('button.order')}</button>
                                    </div>
                                    <p className="text-xs pt-10">{t('global.write.us')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }

            <div
                className={`${ currentStep.step === 2 ? 'block md:flex opacity-100' : 'hidden opacity-0' }  text-center bg-background border-t shadow-md py-5 justify-between md:text-right px-10`}>
                <div className="text-secondary text-left mb-3 md:mb-0 flex items-center">
                    <div>
                        {t('global.billing.total')}: <strong>RON: {totalPrice.toFixed(2)}</strong>
                    </div>
                </div>

                {currentStep.step === 1 &&
                    <div onClick={addImageField} role="presentation"
                         className="font-semibold bg-primary inline-block py-4 rounded-full px-5 text-sm">
                        {t('global.config')}
                    </div>}

                {currentStep.step === 2 &&
                    <div onClick={() => saveImages()}
                         className="font-semibold bg-primary inline-block py-2 rounded-full px-5 text-sm cursor-pointer">  {t('global.finish')}
                    </div>}

            </div>

        </>
    )
}
