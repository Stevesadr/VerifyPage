import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import BoxFilds from "@/components/BoxFilds";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>
      <div className={`${styles.index_main_div}`}>
        <BoxFilds />
      </div>
    </>
  );
}
