import { getProviders, signIn } from 'next-auth/react';
import MyHead from '../components/layout/MyHead';


function Login({providers}) {
    return (
        <div>
            <MyHead title="Login" />
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            

            <div className="rounded-full flex space-x-3 p-5 ">
                <div className="firstCircleLoading w-7 h-8 bg-gray-600 rounded-full animate-bounce animate-pulse"></div>
                <div className="secondCircleLoading w-7 h-8 bg-gray-600 rounded-full animate-bounce animate-pulse"></div>
                <div className="thirdCircleLoading w-7 h-8 bg-gray-600 rounded-full animate-bounce animate-pulse"></div>
            </div>

            {Object.values(providers).map(provider => (
                <div key="l" className="text-black/80">
                    <button 
                        className="bg-[antiquewhite] hover:scale-105 transition duration-200 ease-out hover:text-black/100 font-bold pt-3 pl-3 rounded-lg text-left font-mono w-[250px] h-[50px] flex" 
                        onClick={() => signIn(provider.id, {callbackUrl:"/"})
                        }>
                            Login using {provider.name}
                            <img className="rounded-full w-6 h-6 ml-[1.2rem]" src="data:image/png;base64,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"/>

                    </button>
                </div>
            ))}
        </div>
        </div>
    )
}
export async function getServerSideProps(context){
    const providers = await getProviders();
    return{
        props: {
            providers
        },
    };
}

export default Login

