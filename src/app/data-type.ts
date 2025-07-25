export interface signUp {
  name: string;
  email: string;
  password: string;
}

export interface login {
  email: string;
  password: string;
}

export interface product {
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  id: string;
  quantity: undefined | number;
  productId: undefined | string;
}

export interface cart {
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  id: string | undefined;
  quantity: undefined | number;
  productId: string;
  userId: number;
}

export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface order {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: string;
  id: number | undefined;
}
