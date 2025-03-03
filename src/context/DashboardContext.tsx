import type React from "react"
import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import authAxios from "../api/authAxios"
// import { getUserDetails } from "../api/tokenService"

interface InventoryData {
  id: number
  name: string
  price: number
  category: string
  description: string
  purchaseDate: string
  supplier: string
  amount_left: number
}

interface OrderData {
  order_id: string;
  name: string;
  list_of_products: string[];
  amount: string;
  channel: string;
  date: string;
  status: "paid" | "part-paid" | "unpaid";
}

interface DashboardContextType {
  fetchDashboardData: () => Promise<void>
  fetchInventory: () => Promise<void>
  fetchOrders: () => Promise<void>
  fetchSales: () => Promise<void>
  addProduct: (productData: unknown) => Promise<void>
  updateOrder: (orderId: string, status: string) => Promise<void>
  dashboardData: {
    storeUrl: string
    totalSales: number
    overview: {name: string; amount: number; percentage: number}[]
    orderTrends: { data: number[]; labels: string[] }
    todos: string[]
    topSalesChannels: { name: string; percentage: number}[]
  } | null
  inventoryData: InventoryData[]
  ordersData: OrderData[]
  salesData: unknown[]
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<{
    storeUrl: string
    totalSales: number
    overview: {name: string; amount: number; percentage: number}[]
    orderTrends: { data: number[]; labels: string[] }
    todos: string[]
    topSalesChannels: { name: string; percentage: number}[]
  } | null>(null)
  const [inventoryData, setInventoryData] = useState<InventoryData[]>([])
  const [ordersData, setOrdersData] = useState<OrderData[]>([])
  const [salesData, setSalesData] = useState<unknown[]>([])

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await authAxios.get("/api/v1/dashboard")
      setDashboardData(response.data)
      return response.data
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }, [])

  const fetchInventory = useCallback(async () => {
    try {
      const response = await authAxios.get("/api/v1/products")
      setInventoryData(response.data.data)
      return response.data
    } catch (error) {
      console.error("Error fetching inventory data:", error)
    }
  }, [])

  const fetchOrders = useCallback(async () => {
    try {
      const response = await authAxios.get("/api/v1/order")
      setOrdersData(response.data.data)
      return response.data
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
    async (productData: unknown) => {
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

