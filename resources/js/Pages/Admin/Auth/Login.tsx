import Checkbox from '@/Components/shared/Checkbox';
import InputError from '@/Components/shared/InputError';
import PrimaryButton from '@/Components/shared/PrimaryButton';
import TextInput from '@/Components/shared/TextInput';
import AdminAuthLayout from '@/Layouts/AdminAuthLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React, { FormEventHandler } from 'react'

const Login = ({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.login'));
    }

    return (
        <AdminAuthLayout>
            <Head title='Admin Login' />
            <div className="">
                <h2 className="text-2xl font-serif font-semibold">Welcome back admin,</h2>
                <p className="mt-2 font-light">Enter your email and password to continue</p>
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}
                <div className="mt-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <TextInput
                                placeholder="Email Address"
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                isFocused={true}
                                floatingLabel
                                onChange={(e) => setData("email", e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                placeholder="Password"
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                floatingLabel
                                onChange={(e) => setData("password", e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>
                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>
                        <div className="flex items-center justify-end mt-6">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <PrimaryButton className="ms-4" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminAuthLayout>
    )
}

export default Login
