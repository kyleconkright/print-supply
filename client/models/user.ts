export interface UserState {
  email: string;
  uid?: string;
  displayName?: string;
  lastLoginAt?: string
  createdAt?: string,
  isLoading?: boolean,
  emailVerified?: boolean,
  emailSent?: boolean,
}

export function formatUserFromApi(user) {
  return {
    email: user.email,
    uid: user.uid,
    displayName: user.displayName,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    emailVerified: user.emailVerified,
  }
}