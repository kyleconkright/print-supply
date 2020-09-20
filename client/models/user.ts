export interface UserState {
  email: string;
  uid?: string;
  displayName?: string;
  lastLoginAt?: string
  createdAt?: string,
  isLoading?: boolean,
  emailVerified?: boolean,
  emailSent?: boolean,
  address?: Address,
}

interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
}

export function formatUserFromApi([user, more]) {
  return {
    email: user.email,
    uid: user.uid,
    displayName: user.displayName,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    emailVerified: user.emailVerified,
    address: more.address,
  }
}