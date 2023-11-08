import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import {useRouter} from "next/router";
import LogoImage from "../../../assets/img/logo.png"
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "@/userManagement/userSlice";
import {AdminFormData} from "@/pages/components/PhotoOrder";
import toast, {Toaster} from "react-hot-toast";



// const { t } = useTranslation('common');

export default function Login() {
    const user = useSelector((state: any) => state.user);
    const {token} = user;
    const router = useRouter();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<AdminFormData>();

    useEffect(() => {
        if (token) {router.push('/admin')}
    }, [token, router]);
    const onSubmit = async (data:any) => {
        try {
            const response = await axios.post('https://www.ajandekok.fereze.com/api/login', data);
            if (response.status === 201) {
                dispatch(setUser(response.data));
                router.push('/admin');
            } else {
                toast.error("Something went bad.")
            }

        } catch (error) {
            // Handle any errors, e.g., display an error message
            toast.error("Server error: Bad Credentials")
        }
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div className="min-h-screen flex items-center justify-center bg-surface">
            <Toaster/>
            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
                <div className="flex items-center pb-5 border-b">
                    <Image src={LogoImage} alt="Ajandekok.ro | Logo"/>
                </div>
                <h2 className="text-2xl pt-5 font-semibold text-center text-secondary mb-10">Admin Login</h2>

                {/*<h1>{t('welcome')}</h1>*/}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="relative mb-10">
                            <label htmlFor="email" className="absolute left-0 ml-1 -translate-y-3 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm text-secondary">E-mail</label>
                            <input
                                type="email"
                                placeholder="E-mail"
                                id="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Invalid email format',
                                    },
                                })}
                                className="border text-secondary border-gray-300 rounded p-2 w-full"
                            />
                            {errors.email && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.email.message}</p>}
                        </div>
                        <div className="relative my-7">
                            <label htmlFor="email" className="absolute left-0 ml-1 -translate-y-3 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm text-secondary">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                id="password"
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                                className="border text-secondary border-gray-300 rounded p-2 w-full"
                            />
                            {errors.password && <p className="text-error text-xs absolute -bottom-5 left-2">
                                {errors.password.message}
                            </p>}
                        </div>
                        <div className="pt-10">
                            <button type="submit" className="w-full bg-primary text-surface rounded-full py-4 px-2">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
