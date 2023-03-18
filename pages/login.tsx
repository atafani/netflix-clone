import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
type SignInForm = {
    emailPhone: string;
    password: string;
}
const Login: NextPage = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const { control, handleSubmit } = useForm<SignInForm>();
    const router = useRouter()
    const handleShowPassword = () => {
        setIsPasswordShown(!isPasswordShown)
        if (ref.current) {
            ref.current.focus();
        }
        setIsPasswordShown(!isPasswordShown)
    }

    const handleSignIn = (data: SignInForm) => {
        console.log(data)
        router.push('/browse');
    }

    return (
        <div className="flex min-h-screen flex-row items-center justify-center bg-black sm:bg-[url('/images/login-bg.png')] bg-no-repeat bg-cover  relative md:py-20">
            <div className='absolute z-10 top-0 left-0 w-full h-full bg-black opacity-40'></div>
            <form action='#' className='w-full sm:w-[32rem] z-20 relative py-20 px-5 sm:px-16 pb-32'>
                <div className='absolute hidden sm:block z-30 top-0 left-0 w-full h-full bg-black opacity-80  rounded-sm'></div>
                <div className='relative z-40'>
                    <h3 className='text-white text-3xl sm:text-4xl mb-8 font-bold'>Sign In</h3>
                    <div className='-space-y-px rounded-md shadow-sm'>
                        <Controller control={control} name="emailPhone"
                            rules={{ required: { value: true, message: 'Please enter a valid email or phone number.' }, minLength: { value: 10, message: 'Please enter a valid email or phone number.' } }}
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error },
                                formState,
                            }) => (
                                <div className='relative my-4 '>
                                    <input
                                        type='text'
                                        id='emailPhone'
                                        value={value}
                                        onChange={onChange}
                                        className={`block px-5 pb-3 pt-5 w-full text-sm text-gray-100 sm:text-lg rounded-md border border-[#333333] appearance-none focus:outline-none focus:ring-0 peer bg-[#333333] ${error ? " border-b-orange-400" : ""}`}
                                        placeholder=' ' autoComplete="off"
                                    />
                                    <label
                                        htmlFor='email'
                                        className='absolute text-lg text-gray-400 duration-300 transform -translate-y-4 scale-[0.7] top-4 z-10 origin-[0] left-5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.7] peer-focus:-translate-y-4'
                                    >
                                        Email or phone number
                                    </label>

                                    {error && <p className="text-orange-500">{error.message}</p>}
                                </div>
                            )} />
                        <Controller control={control}
                            name="password"
                            rules={{ required: { value: true, message: 'Your password must contain between 4 and 60 characters.' }, minLength: { value: 10, message: 'Your password must contain between 4 and 60 characters.' } }}
                            render={({
                                field: { onChange, onBlur, value, name, ref },
                                fieldState: { invalid, isTouched, isDirty, error },
                                formState,

                            }) => (<div className='relative my-4 '>
                                <input
                                    type={isPasswordShown ? 'text' : 'password'}
                                    id='password' value={value}
                                    onChange={onChange}
                                    className={`block px-5 pb-3 pt-5 w-full text-sm text-gray-100 sm:text-lg rounded-sm border border-[#333333]  appearance-none focus:outline-none focus:ring-0 peer bg-[#333333] ${error ? " border-b-orange-400" : ""}`}
                                    placeholder=' ' autoComplete="off" ref={ref}
                                />
                                {error && <p className="text-orange-500">{error.message}</p>}
                                <label
                                    htmlFor='password'
                                    className='absolute text-lg text-gray-400 duration-300 transform -translate-y-4 scale-[0.7] top-4 z-10 origin-[0] left-5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.7] peer-focus:-translate-y-4'
                                >
                                    Password
                                </label>
                                <p className="absolute invisible text-md text-gray-400 uppercase duration-200  transform top-4 z-10  right-5 peer-placeholder-shown:invisible peer-focus:visible hover:cursor-pointer focus:peer-focus" onClick={handleShowPassword}>{isPasswordShown ? 'hide' : 'show'}</p>
                            </div>)} />

                    </div>

                    <button
                        type='submit'
                        className='group relative flex w-full mt-10 justify-center rounded-md border border-transparent bg-netflix py-4 px-4 sm:text-lg font-medium text-white hover:bg-red-650 focus:outline-none '
                        onClick={(e: any) => {
                            e.preventDefault();
                            handleSubmit(handleSignIn)()
                        }}
                    >
                        Sign in
                    </button>
                    <div className='flex items-center justify-between gap-5 mt-3'>
                        <div className='flex items-center'>
                            <input
                                type='checkbox'
                                id='remember-me'
                                className='accent-white mr-1'
                            />
                            <label htmlFor='remember-me' className='text-gray-400'>
                                Remember me
                            </label>
                        </div>

                        <div className='text-sm'>
                            <a href='#' className=' text-gray-400 hover:underline'>
                                Need help
                            </a>
                        </div>
                    </div>
                    <p className="text-gray-500 my-5 text-lg">New to Netflix? <Link href='register'><span className="text-white">Sign up now</span></Link>.</p>
                    <p className="text-gray-500 my-3 text-md">This page is protected by Google reCAPTCHA to ensure you're not a bot. <Link href='#'><span className="text-blue-500">Learn more.</span></Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
