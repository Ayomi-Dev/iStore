// Mock data for user profile page
export const mockStore = {
  user: {
    _id: "user123",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    isAdmin: false,
    phone: "5551234567",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    },
    avatar: "https://i.pravatar.cc/150?img=5",
    memberSince: "2023-01-15T10:30:00Z",
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
      language: "en" as const,
      currency: "USD" as const,
      timezone: "America/New_York" as const
    },
    stats: {
      totalOrders: 24,
      totalSpent: 1847.50
    }
  }
};

export const mockQuery = {
  orders: [
    {
      _id: "order001",
      orderItems: [
        {
          product: "prod001",
          name: "Wireless Headphones",
          price: 129.99,
          quantity: 1,
          total: 129.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
        }
      ],
      totalAmount: 129.99,
      totalQuantity: 1,
      paidAt: "2024-01-15T14:30:00Z",
      paymentIntentId: "pi_123456",
      status: "delivered" as const
    },
    {
      _id: "order002",
      orderItems: [
        {
          product: "prod002",
          name: "Smart Watch",
          price: 299.99,
          quantity: 1,
          total: 299.99,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
        }
      ],
      totalAmount: 299.99,
      totalQuantity: 1,
      paidAt: "2024-01-10T09:15:00Z",
      paymentIntentId: "pi_789012",
      status: "shipped" as const
    }
  ]
};

export const mockRootProps = {
  initialTab: "personal" as const
};