import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/shared/InputError';
import PrimaryButton from '@/Components/shared/PrimaryButton';
import TextInput from '@/Components/shared/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout>
            <Head title="Forgot Password" />
            <div className="mb-4">
                <h2 className="text-3xl uppercase font-serif font-semibold">Reset Password</h2>
            </div>
            <div className="mb-4 text-gray-600">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </AuthLayout>
    );
}
