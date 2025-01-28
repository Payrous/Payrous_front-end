'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { waitBG } from '@/assets/images'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { emailIC } from '@/assets/icons'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

const Waitlist = () => {

    const [email, setEmail] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);

    // handle email
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    // Handle button click
    const handleClick = () => {
        if (email) {
            setShowAlert(true);
        } else {
            alert('Please enter a valid email');
        }
    };

    return (
        <div className='bg-[#1C2730] h-screen'>
            <Image
                alt="waitbg"
                src={waitBG}
                placeholder="blur"
                quality={100}
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                }}
            />
            <div className='flex flex-col w-screen items-center justify-center h-screen text-white'>
                <div className="w-56 h-0.5 bg-gradient-to-r from-transparent via-[#D98837] to-transparent"></div>

                <h1 className='font-normal text-base pt-2'>Payrous | Bulk transaction at your fingertips</h1>
                <div className='py-5 flex flex-col items-center'>
                    <h2 className='font-bold text-8xl text-source-sans'>Join the waitlist for</h2>
                    <h2 className='font-bold text-8xl text-[#D98837] italic text-source-sans'>Payrous</h2>
                </div>

                <p className='font-normal text-xl w-[750px] text-center px-5'>
                    Discover the seamless solution for making bulk transactions and being charged a single gas fee
                </p>

                <div className="flex flex-col py-10">
                    <div className='relative flex gap-2'>
                        <Image alt='icon' src={emailIC} className='absolute left-5 top-[18px]' />
                        <Input
                            type="email"
                            className='placeholder-white-400 relative px-12 w-[350px] h-14 rounded-xl'
                            placeholder="Your email address"
                            value={email}
                            onChange={handleEmailChange}
                        />

                        <Button
                            onClick={handleClick}
                            type="submit"
                            className='text-white bg-[#F3993E80] hover:bg-[#D98837]  shadow-white shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.3)] w-40 h-14 rounded-xl text-base font-semibold text-opacity-50'
                        >
                            Join Waitlist!
                        </Button>
                    </div>
                </div>

                {/* Conditionally render the alert */}
                {showAlert && (
                    <Alert variant="default" className="w-full max-w-lg mx-auto mt-6">
                        <AlertTitle className="text-lg font-bold">Success!</AlertTitle>
                        <AlertDescription className="text-sm">
                            You have successfully joined the waitlist. We will notify you once you're ready to start using Payrous!
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
}

export default Waitlist;
