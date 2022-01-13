import Head from "next/head"

function MyHead({title}) {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default MyHead
