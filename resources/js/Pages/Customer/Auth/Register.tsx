import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/shared/InputError';
import InputLabel from '@/Components/shared/InputLabel';
import PrimaryButton from '@/Components/shared/PrimaryButton';
import TextInput from '@/Components/shared/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <AppLayout>
            <Head title="Register" />

            <section className="container-padded py-12 bg-gray-50">
                <div className="lg:w-2/3 mx-auto">
                    <h2 className="text-3xl uppercase font-serif font-semibold">Create your account</h2>
                    <p className="mt-3">Please provide the following information to continue</p>
                    <div className="mt-4">
                        <form onSubmit={submit}>
                            <div>
                                {/* <InputLabel htmlFor="name" value="Name" /> */}
                                <TextInput
                                    id="name"
                                    name="name"
                                    placeholder='Name'
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                {/* <InputLabel htmlFor="email" value="Email" /> */}
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder='Email'
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                {/* <InputLabel htmlFor="password" value="Password" /> */}
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder='Password'
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                {/* <InputLabel htmlFor="password_confirmation" value="Confirm Password" /> */}
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    placeholder='Confirm Password'
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />

                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-6">
                                <Link
                                    href={route('login')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Already registered?
                                </Link>

                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
