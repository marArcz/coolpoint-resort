import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/shared/InputError';
import InputLabel from '@/Components/shared/InputLabel';
import PrimaryButton from '@/Components/shared/PrimaryButton';
import TextInput from '@/Components/shared/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/CustomerLayout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        lastname: '',
        birthdate: '',
        phone: '',
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    {/* <InputLabel htmlFor="name" value="Name" /> */}
                                    <TextInput
                                        id="firstname"
                                        name="firstname"
                                        placeholder='Firstname'
                                        value={data.firstname}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('firstname', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.firstname} className="mt-2" />
                                </div>
                                <div className=''>
                                    {/* <InputLabel htmlFor="name" value="Name" /> */}
                                    <TextInput
                                        id="lastname"
                                        name="lastname"
                                        placeholder='Lastname'
                                        value={data.lastname}
                                        className="mt-1 block w-full"
                                        autoComplete="lastname"
                                        onChange={(e) => setData('lastname', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.lastname} className="mt-2" />
                                </div>
                            </div>
                            <div className='mt-4'>
                                {/* <InputLabel htmlFor="name" value="Name" /> */}
                                <TextInput
                                    id="phone"
                                    name="phone"
                                    placeholder='Phone'
                                    value={data.phone}
                                    className="mt-1 block w-full"
                                    autoComplete="phone"
                                    onChange={(e) => setData('phone', e.target.value)}
                                    required
                                />
                                <InputError message={errors.phone} className="mt-2" />
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
