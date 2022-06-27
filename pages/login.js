import React from 'react'
import {getProviders,signIn } from 'next-auth/react';

const Login = ({providers}) => {
    return (
        <div className='bg-black h-screen flex flex-col items-center justify-center'>
            <img className='w-96 mb-5 bg-black' src='https://binaryblogger.com/wp-content/uploads/2018/10/spotify-logo.jpg'/>
        
            {Object.values(providers).map((provider) => (
            <div key={provider.name}>
                <button
                className="bg-[#18D860] text-black p-5 rounded-full text-2xl hover:opacity-80"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                Login with {provider.name}
                </button>
            </div>
            ))}
        </div>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}

export default Login

