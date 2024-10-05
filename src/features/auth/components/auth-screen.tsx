"use client"

import { useState } from "react"
import { AuthFlow } from "../types"
import { SignInCard } from "./sign-in-card"
import { SignUpCard } from "./sign-up-card"
import Image from "next/image"

export const AuthScreen = () => {
    const [state, setState] = useState<AuthFlow>("signIn")

    return (
        <div className="h-screen w-full lg:flex lg:flex-row">
            <div
                className="hidden lg:w-[50%] bg-primary/90 lg:flex lg:flex-col lg:justify-center lg:items-center text-white px-[76px]"
            >
                {/* <div className="relative"> */}
                {/* <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-12 top-5"
                    onClick={() => router.push("/")}
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span className="sr-only">Go back</span>
                </Button> */}
                {/* </div> */}

                {/* 

                <p>
                    Follow these steps to secure your account:
                </p>

                {authSteps.map((step, i) => (
                    <div key={i} className='flex items-center gap-1 font-semibold'>
                        <Image
                            height={50}
                            width={50}
                            alt='check icon'
                            src="/check.svg"
                        />
                        {step.text}
                    </div>
                ))}

                <p className="text-sm text-gray-300">
                    Ensuring your account is properly secured helps protect your personal information and helps prevent unauthorized access.
                </p> */}
                <Image
                    src="/images/black-logo.svg"
                    alt="Logo of Tanjay National High School"
                    width={500}
                    height={500}
                    className="invert"
                />

                <h1 className="text-2xl font-semibold my-10 uppercase">
                    Welcome to Tanjay National High School
                </h1>
            </div>

            <div className="h-full w-full lg:w-[50%] flex flex-col flex-1 items-center justify-center">

                <div className="h-full flex items-center justify-center ">
                    <div className="md:h-auto md:w-[420px]">
                        {state === "signIn" ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
                    </div>
                </div>
            </div>
        </div>
    )
}