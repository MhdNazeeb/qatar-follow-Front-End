import { Calendar, ChevronDown, Home, Inbox, LogOut, Search, Settings } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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

// Menu items.


export function AppSidebar() {
  const route = useRouter()
  
  const handleLogout = () => {
    // deleteLocalStorage("user")
    route.replace('/login')
  }

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Collapsible Sidebar Items */}
              <div>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem onClick={() => route.push("/")}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        JOBPOST
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                </Collapsible>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton onClick={() => route.push("/jobListing")}>
                        JOBLISTIN
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                </Collapsible>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Logout Button */}
        <div className="mt-[100%]">
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-red-500 hover:text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}