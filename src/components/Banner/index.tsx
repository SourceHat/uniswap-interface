import styles from './banner.module.css';

export default function Banner(props: any) {

if (props.position === "top") {
    
    return (
        <>
        <div className={`${styles.banner} ${styles.top}`}>Brought to you by SourceHat. For smart contract audits, development, or other web3 security needs, reach out to us at <a href="https://sourcehat.com">sourcehat.com</a>.</div>
        </>
    );
}
return (
    <>
    <div className={`${styles.banner} ${styles.bottom}`}>This instance of the Uniswap Interface is not hosted by or affiliated with Uniswap Labs. This instance is provided "as is" and is a testing tool for use on test networks only.</div>
    </>
);
}
