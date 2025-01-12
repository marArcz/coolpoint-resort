import InputError from '@/Components/shared/InputError';
import InputLabel from '@/Components/shared/InputLabel';
import PrimaryButton from '@/Components/shared/PrimaryButton';
import TextInput from '@/Components/shared/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const { user } = usePage().props.auth;
    if (!user) {
        return;
    }
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        firstname: user.firstname,
        lastname: user.lastname,
        birthdate: user.birthdate,
        phone: user.phone,
        email: user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>
            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <p className="text-sm w-full bg-green-600 rounded-md p-3 mt-4 text-white">Successfully updated profile.</p>
            </Transition>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="firstname" value="Firstname" />

                    <TextInput
                        id="firstname"
                        className="mt-1 block w-full"
                        value={data.firstname}
                        onChange={(e) => setData('firstname', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.firstname} />
                </div>
                <div>
                    <InputLabel htmlFor="lastname" value="Lastname" />

                    <TextInput
                        id="lastname"
                        className="mt-1 block w-full"
                        value={data.lastname}
                        onChange={(e) => setData('lastname', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.lastname} />
                </div>
                <div>
                    <InputLabel htmlFor="birthdate" value="Birthdate" />
                    <TextInput
                        type='date'
                        id="birthdate"
                        className="mt-1 block w-full"
                        value={data.birthdate}
                        onChange={(e) => setData('birthdate', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.birthdate} />
                </div>
                <div>
                    <InputLabel htmlFor="phone" value="Phone" />
                    <TextInput
                        type='number'
                        id="phone"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
