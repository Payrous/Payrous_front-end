'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { waitBG } from '@/assets/images'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, Check, X } from 'lucide-react'
import emailjs from '@emailjs/browser'


const Waitlist = () => {
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const clientTemplateID = process.env.NEXT_PUBLIC_CLIENT_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const replyToEmail = process.env.NEXT_PUBLIC_REPLY_TO_EMAIL;
    const adminTemplateID = process.env.NEXT_PUBLIC_ADMIN_EMAILJS_TEMPLATE_ID;
    const [email, setEmail] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [alertState, setAlertState] = useState<{
        show: boolean;
        type: 'success' | 'error';
        message: string;
    }>({
        show: false,
        type: 'success',
        message: ''
    });

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setAlertState({ ...alertState, show: false });
    };

    function isValidEmailAddress(address: string): boolean {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEmail.test(address);
    }

    const handleSubmission = async () => {
        if (!isValidEmailAddress(email)) {
            setAlertState({
                show: true,
                type: 'error',
                message: 'Please enter a valid email address to join the waitlist.'
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Send email to help.payrous@gmail.com
            await emailjs.send(
                serviceID ?? "",  
                adminTemplateID ?? "", 
                {
                    to_email: 'help.payrous@gmail.com',
                    from_email: email,
                    message: `New waitlist signup from ${replyToEmail}`,
                    time: new Date().toLocaleString(),
                },
                publicKey 
            );

            // Send confirmation email to user
            await emailjs.send(
              serviceID ?? "", 
              clientTemplateID ?? "", 
                {
                    to_email: replyToEmail,
                    reply_to: 'help.payrous@gmail.com',
                },
                publicKey 
            );

            setAlertState({
                show: true,
                type: 'success',
                message: `We've added ${email} to our waitlist. We'll let you know when Payrous is ready.`
            });
        } catch (error) {
            setAlertState({
                show: true,
                type: 'error',
                message: 'Something went wrong. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    console.log('serviceID', serviceID);
    console.log('clientTemplateID', clientTemplateID);
    console.log('publicKey', publicKey);
    console.log('replyToEmail', replyToEmail);
    console.log('adminTemplateID', adminTemplateID);


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
                        <div className="absolute left-5 top-[18px] z-10">
                            <Mail 
                                size={20}
                                stroke={isFocused || email ? "#6B7280" : "#FFFFFF"}
                                strokeWidth={1.5}
                            />
                        </div>
                        <Input
                            type="email"
                            className={`placeholder-white-400 relative px-12 w-[350px] h-14 rounded-xl transition-colors duration-200
                                ${isFocused || email ? 'bg-white text-black placeholder-gray-400' : 'bg-transparent text-white placeholder-white'}
                            `}
                            placeholder="Your email address"
                            value={email}
                            onChange={handleEmailChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />

                        <Button
                            onClick={handleSubmission}
                            type="submit"
                            disabled={isSubmitting}
                            className='text-white bg-[#F3993E80] hover:bg-[#D98837] shadow-white shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.3)] w-40 h-14 rounded-xl text-base font-semibold text-opacity-50'
                        >
                            {isSubmitting ? 'Submitting...' : 'Join Waitlist!'}
                        </Button>
                    </div>
                </div>

                {alertState.show && alertState.type === 'success' && (
                    <div className="bg-[#1C2730]/90 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 max-w-lg mx-auto mt-6">
                        <div className="bg-[#D98837] rounded-full p-1">
                            <Check size={16} stroke="#FFFFFF" strokeWidth={2} />
                        </div>
                        <div className="flex-1 text-gray-300">
                            {alertState.message}
                        </div>
                        <button 
                            onClick={() => setAlertState({ ...alertState, show: false })}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                )}

                {alertState.show && alertState.type === 'error' && (
                    <div className="bg-red-950/90 backdrop-blur-sm text-red-200 rounded-lg p-4 flex items-center gap-3 max-w-lg mx-auto mt-6">
                        <div className="text-red-200">{alertState.message}</div>
                        <button 
                            onClick={() => setAlertState({ ...alertState, show: false })}
                            className="text-red-400 hover:text-red-200 transition-colors ml-auto"
                        >
                            <X size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Waitlist;