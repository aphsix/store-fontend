export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
