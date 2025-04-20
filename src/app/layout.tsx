import { Nunito, Poppins} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import clsx from "clsx";

export const nunito = Nunito({ subsets: ["latin"] });
export const poppins = Poppins({ subsets: ["latin"], weight: ["500", "700"] });
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          nunito.className,
          "antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}
