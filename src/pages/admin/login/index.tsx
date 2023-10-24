import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from "axios";
import {useRouter} from "next/router";
import LogoImage from "../../../assets/img/logo.png"
import Image from "next/image";
import {useDispatch} from "react-redux";
import {setUser} from "@/userManagement/userSlice";
import { useTranslation } from 'next-i18next';

const schema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string().required('Password is required'),
});

// const { t } = useTranslation('common');

export default function Login() {
    const dispatch = useDispatch();

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const router = useRouter(); // Initialize the useRouter hook

    const onSubmit = async (data:any) => {
        console.log(data);
        // // You can handle form submission here
        try {
            // Make an Axios POST request to the login API
            const response = await axios.post('https://www.ajandekok.fereze.com/api/login', data);
            // Handle the API response, e.g., store user data or display a success message
            console.log('API Response:', response.data);
            if (response.status === 201) {

                dispatch(setUser(response.data));
                router.push('/admin/dashboard');
            } else {
                // Handle other responses or errors
                console.error('Login failed:', response);
            }

        } catch (error) {
            // Handle any errors, e.g., display an error message
            console.error('API Error:', error);
        }
    };

    const data = [
        {
            dimension: '6x4 cm',
            price: 0.4,
        },
        {
            dimension: '6x4 cm',
            price: 0.4,
        },
        {
            dimension: '6x4 cm',
            price: 0.4,
        },
        {
            dimension: '6x4 cm',
            price: 0.4,
        },
    ]



    return (
        <div className="min-h-screen flex items-center justify-center bg-surface">
            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
                <div className="flex items-center pb-5 border-b">
                    <Image src={LogoImage} alt="Ajandekok.ro | Logo"/>
                </div>
                <h2 className="text-2xl pt-5 font-semibold text-center text-secondary">Admin Login</h2>

                {/*<h1>{t('welcome')}</h1>*/}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        id="email"
                                        type="text"
                                        className="w-full rounded-md text-secondary px-2 py-3 border placeholder-lightGrey"
                                        placeholder="Email"
                                    />
                                )}
                            />
                            <p className="text-error px-2 text-sm py-1">{errors.email?.message}</p>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        id="password"
                                        type="password"
                                        className="w-full rounded-md text-secondary px-2 py-3 border placeholder-lightGrey"
                                        placeholder="Password"
                                    />
                                )}
                            />
                            <p className="text-error px-2 text-sm py-1">{errors.password?.message}</p>
                        </div>
                        <div>
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
