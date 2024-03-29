// import { Container, Navbar } from "react-bootstrap";

// import styles from "./banner.module.css";
export default function Banner(props: any) {
//   return (
//     <>
//       <Navbar bg="light" expand="lg">
//         <Container fluid className={styles.contain_banner}>
//           <Navbar.Text className={`${styles.banner} justify-content-center`}>
//             {bannerTitle}
//             {
//               <a
//                 style={{ color: "#0c5460", textDecoration: "underline" }}
//                 href="/blog/rebrand-announcement/"
//                 target="_blank"
//               >
//                 here
//               </a>
//             }
//             {"."}
//           </Navbar.Text>
//         </Container>
//       </Navbar>
//     </>
//   );

if (props.position === "top") {
    
    return (
        <>
        <div style={{ backgroundColor: "#d1ecf1", width: "100%", color: "#0c5460", textAlign:"center", margin: "0", paddingTop: "10px", height:"40px" }}>

        Brought to you by SourceHat. For smart contract audits, development, or other web3 security needs, reach out to us at <a href="https://sourcehat.com">sourcehat.com</a>.

        </div>
        </>
    );
}
return (
    <>
    <div style={{ backgroundColor: "black", width: "100%", color: "white", textAlign:"center", margin: "0", paddingTop: "10px", height:"40px" , position: "fixed", bottom:"0px" }}>

    This instance of the Uniswap Interface is not hosted by or affiliated with Uniswap Labs. This instance is provided "as is" and is a testing tool for use on test networks only.

    </div>
    </>
);
}

// .contain_banner {
//     background-color: #d1ecf1;
//     /* width: 100%; */
//     color: #0c5460;
//     text-align: center;
//     margin: 0;
//     padding-top: 20px;
//     height: 40px;
//   }
