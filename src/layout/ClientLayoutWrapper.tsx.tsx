"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocalData } from "@/utils/locallStorage";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ToastProvider } from "@/providers/ToastProvider";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser: any = getLocalData("user");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUser(storedUser);
    }
  }, [router]);

  if (!user) return null; // or loading spinner

  return (
    <ReactQueryProvider>
      <ToastProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          {children}
        </SidebarProvider>
      </ToastProvider>
    </ReactQueryProvider>
  );
}
