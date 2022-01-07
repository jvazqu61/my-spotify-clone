import { getProviders, signIn } from 'next-auth/react';

function Login({providers}) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />

            {Object.values(providers).map(provider => (
                <div key="l">
                    <button 
                        className="bg-[#18D860] text-white p-2 rounded-full" 
                        onClick={() => signIn(provider.id, {callbackUrl:"/"})
                        }>
                            Login using {provider.name}
                    </button>
                </div>
            ))}
            {/* {console.log("providers: "+ providers)} */}
        </div>
    )
}
export async function getServerSideProps(context){
    const providers = await getProviders();
    console.log("providers: "+ providers)
    return{
        props: {
            providers
        },
    };
}

export default Login

