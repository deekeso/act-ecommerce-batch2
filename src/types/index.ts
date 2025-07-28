interface User {
  id: string
  name: string
  email: string
  password: string
  firstname?: string
  lastname?: string
  contact?: string
  address?: string
}

interface Products {
  id: string
  price: number
  image: string
  description: string
  link: string
  value: string
  label: string
  category?: string
}

type Variant = "info" | "warning" | "success" | "error"

interface Carts extends Products {
  quantity: number
  selectedItem?: boolean
}

type CartStorage = {
  [userId: string]: Carts[]
};

type Status = "pending" | "shipped" | "delivered" | "cancelled"

interface Order {
  id: string
  userId: string
  userProfile: {
    firstname?: string
    lastname?: string
    contact?: string
    email?: string
  };
  address: BillingAddress;
  items: Carts[]
  createdAt: string
  status: "pending" | "shipped" | "delivered" | "cancelled"
  shippingFee: number
  totalPrice: number
}
interface AddressRuleForm {
  firstname?: string
  lastname?: string
  email?: string
  address?: string
  contact?: string
}

interface BillingAddress extends AddressRuleForm {
  id?: string
  userId?: string
}

interface FormProps {
  mode?: "add" | "edit"
}

export type {
  Status,
  Products,
  Carts,
  BillingAddress,
  FormProps,
  AddressRuleForm,
  Variant,
  User,
  CartStorage,
  Order,
};
