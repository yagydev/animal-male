export interface IAvatar {
  url: string;
}
export interface IUser {
  name: string;
  phone: string;
  avatar: IAvatar;
}
export interface ICattle {
  type: string;
  pregnancy?: string;
  price: string;
  milk?: string;
  photos?: any[];
  id?: String;
  createdAt?: number;
  updatedAt?: number;
  address: IAddress;
  breed?:string;
  bargain?: boolean;
  milkCapacity?: number;
  baby?: boolean;
  user: IUser;
}

export interface IAddress {
  display: string;
  location: {
    type: "Point";
    coordinates: number[];
  };
  address: {
    city: string;
    state_district: string;
    state: string;
    country: string;
    postcode: string;
  };
}
