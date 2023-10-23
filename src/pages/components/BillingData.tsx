import React from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';

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

interface Props {
    onFormSubmit: (data: any) => void; // Define the prop for the form submission function
}

const BillingData: React.FC<Props> = ({onFormSubmit}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        onFormSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3 mb-7">
                <div className="relative">
                    <input
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        {...register('firstName', {required: 'First Name is required'})}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    {errors.firstName && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.firstName.message}</p>}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        {...register('lastName', {required: 'Last Name is required'})}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    {errors.lastName && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.lastName.message}</p>}
                </div>
            </div>

            <div className="relative mb-7">
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Invalid email format',
                        },
                    })}
                    className="border border-gray-300 rounded p-2 w-full"
                />
                {errors.email && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.email.message}</p>}
            </div>

            <div className="relative mb-7">
                <input
                    type="text"
                    id="street"
                    placeholder="Street"
                    {...register('street', {required: 'Street is required'})}
                    className="border border-gray-300 rounded p-2 w-full"
                />
                {errors.street && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.street.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-7">
                <div className="relative">
                    <input
                        type="text"
                        id="country"
                        placeholder="Country"
                        {...register('country', {required: 'Country is required'})}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    {errors.country && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.country.message}</p>}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        id="city"
                        placeholder="City"
                        {...register('city', {required: 'City is required'})}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    {errors.city && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.city.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-7">

                <div className="relative">
                    <input
                        type="text"
                        id="postalCode"
                        placeholder="Postal Code"
                        {...register('postalCode', {required: 'Postal Code is required'})}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    {errors.postalCode && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.postalCode.message}</p>}
                </div>

                <div className="relative">
                    <input
                        type="tel"
                        id="phone"
                        placeholder="Phone (e.g., 07xx-xxx-xxx)"
                        {...register('phone', {
                            required: 'Phone is required',
                            pattern: {
                                value: /^(0[2347][0-9]{2}[-. ]?[0-9]{3}[-. ]?[0-9]{3}|0[56][0-9]{8})$/,
                                message: 'Invalid format (e.g., XXXX XXX XXX)',
                            },
                        })}
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                    {errors.phone && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.phone.message}</p>}
                </div>
            </div>

            <div className="relative">
                <label>Shipping Option</label>
                <div className="relative text-secondary">
                    <label>
                        <input
                            type="radio"
                            checked={true}
                            name="shippingOption"
                            value="Sepsi"
                            {...register('shippingOption', {required: 'Shipping Option is required'})}
                        />
                        Sepsi
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="shippingOption"
                            value="Another"
                            {...register('shippingOption', {required: 'Shipping Option is required'})}
                        />
                        Another
                    </label>
                </div>
                {errors.shippingOption && <p className="text-error text-xs absolute -bottom-5 left-2">{errors.shippingOption.message}</p>}
            </div>

            <button type="submit" className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700">
                Salveaza
            </button>
        </form>);
};

export default BillingData;
