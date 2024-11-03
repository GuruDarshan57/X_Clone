"use client";
import type { Metadata } from "next";
import "@styles/globals.css";
import Sidebar from "@components/Leftbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import RightBar from "@components/RightBar";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/assets/x_logo.jpg" type="image/x-icon" />
      <title>X - Clone</title>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div>
          <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId="720949350429-a2bsge3dno32g7a6n3nnem30ao3m2t1k.apps.googleusercontent.com">
              <div className="w-full h-full px-28 grid grid-cols-10">
                <Toaster position="top-center" reverseOrder={false} />
                <div className="h-full col-span-2">
                  <Sidebar />
                </div>
                {children}
                <div className="h-full col-span-3">
                  <RightBar />
                </div>
              </div>
              <ReactQueryDevtools />
            </GoogleOAuthProvider>
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
