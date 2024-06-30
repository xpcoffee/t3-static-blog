import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Emerick Bosch",
  description: "Some of my thoughts, for sharing.",
  icons: [{ rel: "icon", url: "/xpcoffee-icon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      {children}
    </html>
  );
}
