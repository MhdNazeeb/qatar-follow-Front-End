import { useEffect, useState } from "react"
import { restrictions } from "@/common/types/restrictions"
import { getLocalData } from "@/utils/locallStorage"

export const useRestrictions = () => {
    const [userRole, setUserRole] = useState<string>("")

    useEffect(() => {
        const currentUser = getLocalData("user")
        const role = currentUser?.role?.toLowerCase() || ""
        setUserRole(role)
    }, [])

    const isRestricted = (itemName: string): boolean => {
        const restrictedItems = restrictions[userRole] || []
        return restrictedItems.includes(itemName)
    }

    return {
        isRestricted,
        userRole,
        
    }
}
