import { getProviders } from 'next-auth/react';

function Login({providers}) {
    return (
        <div>
            <img className="w-52" src="https://links.papareact.com/9xl" alt="" />

            {Object.values(providers).map(provider => (
                <div>
                    <button>{provider.name}</button>
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

