
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "../globals.css";
import { ToastProvider } from "@/providers/ToastProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
            >
                <ToastProvider>
                    <ReactQueryProvider>
                        {children}
                    </ReactQueryProvider>
                </ToastProvider>
            </body>
        </html>
    );
}
