export interface Role {
  id: number;
  name_role: string;
}

export interface User {
  id: number;
  email: string;
  roleId: number | null;
  role?: Role | null;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyProfile {
  id: number;
  userId: number | null;
  company_name: string;
  slug: string;
  npwp: string;
  address: string;
  province: string;
  country: string;
  phone: string;
  logo_url: string | null;
  business_description: string;
  verificationStatus: "Pending" | "Verified" | "Rejected";
  createdAt: string;
  updatedAt: string;
  user?: User | null;
  products?: Product[];
}

export interface BuyerProfile {
  id: number;
  userId: number | null;
  full_name: string;
  address: string;
  province: string;
  country: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  user?: User | null;
}

export interface Category {
  id: number;
  name_categories: string;
  slug: string | null;
  image_url: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: number;
  productId: number | null;
  image_url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  supplierId: number | null;
  categoryId: number | null;
  nama: string;
  description: string | null;
  spectification: string | null;
  min_order: number;
  price_min: number;
  price_max: number;
  unit: string | null;
  hs_code: string | null;
  views: number;
  status?: string;
  slug: string | null;
  createdAt: string;
  updatedAt: string;
  supplier?: CompanyProfile | null;
  category?: Category | null;
  images?: ProductImage[];
}

export type OrderStatus = "Pending" | "Confirmed" | "Processing" | "Shipped" | "Completed" | "Cancelled";

export interface OrderItem {
  id: number;
  orderId: number | null;
  productId: number | null;
  quantity: number;
  product?: Product | null;
}

export interface Order {
  id: number;
  buyerId: number | null;
  supplierId: number | null;
  order_number: string;
  status: OrderStatus;
  total_amount: number;
  shipping_address: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  buyer?: BuyerProfile | null;
  supplier?: CompanyProfile | null;
  orderItems?: OrderItem[];
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page?: number;
    limit?: number;
  };
}

export interface DashboardStats {
  suppliers: {
    total: number;
    verified: number;
    pending: number;
    rejected: number;
  };
  products: {
    total: number;
  };
  categories: {
    total: number;
    categories: { nama: string; jumlah: number }[];
  };
}
