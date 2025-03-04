import { SubmitHandler, useForm } from 'react-hook-form';
import Footer from '../components/footer';
import Header from '../components/header';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebase-config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ILoginFormInput {
    email: string;
    password: string;
}

export default function LoginPage() {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<ILoginFormInput>();

    const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((user) => {
                if (user) {
                    setError(null);
                    navigate('/admin');
                }
            })
            .catch((error) => {
                if (error.code == 'auth/invalid-credential') {
                    setError('Email hoặc mật khẩu không đúng.');
                } else {
                    setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
                }
            })
            .finally(() => setLoading(false));
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="flex h-screen flex-col space-y-6 px-6 py-6 sm:px-0">
            <Header />
            <div className="grow">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-center text-2xl font-bold text-[#0F172A] after:mx-auto after:mt-4 after:block after:h-2 after:w-60 after:rounded-full after:bg-blue-900 sm:text-3xl md:text-5xl">
                        Đăng Nhập
                    </h1>
                    <form
                        className="w-full max-w-96 space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {error && (
                            <div
                                className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800"
                                role="alert"
                            >
                                <span className="font-medium">Thông báo!</span>{' '}
                                {error}
                            </div>
                        )}
                        <div>
                            <label
                                htmlFor="email"
                                className={`text-md block font-medium ${
                                    errors.email
                                        ? 'text-red-800'
                                        : 'text-gray-900'
                                }`}
                            >
                                Email
                            </label>
                            <input
                                {...register('email', {
                                    required: 'Vui lòng nhập Email.',
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: 'Email không hợp lệ.',
                                    },
                                })}
                                id="email"
                                className={`block w-full rounded-full border ${
                                    errors.email
                                        ? 'border-red-800 outline-red-800'
                                        : 'border-[#E2E8F0]'
                                } mb-1 bg-white px-4 py-2 text-gray-900 shadow-lg`}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-800">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className={`text-md block font-medium ${
                                    errors.email
                                        ? 'text-red-800'
                                        : 'text-gray-900'
                                }`}
                            >
                                Mật khẩu
                            </label>
                            <input
                                {...register('password', {
                                    required: 'Vui lòng nhập mật khẩu.',
                                })}
                                id="password"
                                type="password"
                                className={`block w-full rounded-full border ${
                                    errors.email
                                        ? 'border-red-800 outline-red-800'
                                        : 'border-[#E2E8F0]'
                                } mb-1 bg-white px-4 py-2 text-gray-900 shadow-lg`}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-800">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-full bg-blue-900 px-6 py-2 text-sm text-white hover:bg-blue-950"
                            disabled={!!loading}
                        >
                            {loading ? 'Loading...' : 'Xác nhận'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
