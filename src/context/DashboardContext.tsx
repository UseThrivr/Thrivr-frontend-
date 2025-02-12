import type React from "react"
import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import authAxios from "../api/authAxios"
import { getUserDetails } from "../api/tokenService"

interface DashboardContextType {
  fetchDashboardData: () => Promise<void>
  fetchInventory: () => Promise<void>
  fetchOrders: () => Promise<void>
  fetchSales: () => Promise<void>
  addProduct: (productData: any) => Promise<void>
  updateOrder: (orderId: string, status: string) => Promise<void>
  dashboardData: any
  inventoryData: any[]
  ordersData: any[]
  salesData: any[]
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [inventoryData, setInventoryData] = useState<any[]>([])
  const [ordersData, setOrdersData] = useState<any[]>([])
  const [salesData, setSalesData] = useState<any[]>([])

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await authAxios.get("/api/v1/dashboard")
      setDashboardData(response.data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }, [])

  const fetchInventory = useCallback(async () => {
    try {
      const response = await authAxios.get("/api/v1/products")
      setInventoryData(response.data.data)
    } catch (error) {
      console.error("Error fetching inventory data:", error)
    }
  }, [])

  const fetchOrders = useCallback(async () => {
    try {
      const response = await authAxios.get("/api/v1/order")
      setOrdersData(response.data.data)
    } catch (error) {
      console.error("Error fetching orders data:", error)
    }
  }, [])

  const fetchSales = useCallback(async () => {
    try {
      const response = await authAxios.get("/api/v1/sales")
      setSalesData(response.data.data)
    } catch (error) {
      console.error("Error fetching sales data:", error)
    }
  }, [])

  const addProduct = useCallback(
    async (productData: any) => {
      try {
        await authAxios.post("/api/v1/products", productData)
        await fetchInventory()
      } catch (error) {
        console.error("Error adding product:", error)
        throw error
      }
    },
    [fetchInventory],
  )

  const updateOrder = useCallback(
    async (orderId: string, status: string) => {
      try {
        await authAxios.patch(`/api/v1/order/${orderId}`, { payment_status: status })
        await fetchOrders()
      } catch (error) {
        console.error("Error updating order:", error)
        throw error
      }
    },
    [fetchOrders],
  )

  return (
    <DashboardContext.Provider
      value={{
        fetchDashboardData,
        fetchInventory,
        fetchOrders,
        fetchSales,
        addProduct,
        updateOrder,
        dashboardData,
        inventoryData,
        ordersData,
        salesData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = () => {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

export default DashboardContext

