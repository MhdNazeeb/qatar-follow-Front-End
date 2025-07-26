"use client"

import {
  ChevronDown,
  LogOut,
} from "lucide-react"
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getLocalData, deleteLocalStorage } from "@/utils/locallStorage"
import { sideBar } from "@/common/types/sideBar"
import { restrictions } from "@/common/types/restrictions"
import { SidebarItem } from "@/common/types/types"

export function AppSidebar() {
  const router = useRouter()
  const [filteredSidebar, setFilteredSidebar] = useState<SidebarItem[]>([])

  useEffect(() => {
    // Get the current user and normalize the role
    const currentUser = getLocalData("user")
    const userRole = currentUser?.role?.toLowerCase() || ""

 


    const restrictedItems = restrictions[userRole] || []

    const accessibleSidebarItems = sideBar.filter(
      (item) => !restrictedItems.includes(item.name)
    )

    setFilteredSidebar(accessibleSidebarItems)
  }, [])

  const handleLogout = () => {
    deleteLocalStorage("user")
    router.replace("/login")
  }

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <div>
                {filteredSidebar.map((val: SidebarItem) => (
                  <Collapsible
                    key={val.index}
                    defaultOpen
                    className="group/collapsible"
                  >
                    <SidebarMenuItem onClick={() => router.push(val.router)}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {val.name}
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="mt-[100%]">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
