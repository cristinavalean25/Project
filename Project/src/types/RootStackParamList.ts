export type RootStackParamList = {
  Home: undefined;
  Navbar: undefined;
  ProductPage: undefined;
  Menu: undefined;
  Login: undefined;
  Register: undefined;
  UserProfile: {user: User};
};

export type User = {
  id: number;
  email: string;
  name: string;
  avatar: string;
  role: string;
  password: string;
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
};
