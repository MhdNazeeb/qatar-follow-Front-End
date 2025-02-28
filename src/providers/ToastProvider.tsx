"use client"; // Required for Next.js 13+ App Router

import React, { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast, ToastOptions, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastContextType {
    (message: string, type?: TypeOptions, options?: ToastOptions): void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const showToast: ToastContextType = (message, type = "info", options) => {
        if (type in toast) {
            (toast as any)[type](message, options);
        } else {
            toast.info(message, options);
        }
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                
                />
        </ToastContext.Provider>
    );
};
<ToastContainer

/>