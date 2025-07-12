// lib/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  profilePhoto?: string;
  location?: string;
  isPublic?: boolean;
  skillsOffered?: Array<{ name: string; proficiency?: string; _id?: string }>;
  skillsWanted?: Array<{ name: string; proficiency?: string; _id?: string }>;
  availability?: Array<{ day: string; time: string; _id?: string }>;
}

export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  return localStorage.getItem('accessToken');
};

export const isAuthenticated = (): boolean => {
  const token = getStoredToken();
  const user = getStoredUser();
  
  return !!(token && user);
};

export const logout = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  
  // Redirect to login page
  window.location.href = '/login';
};

export const makeAuthenticatedRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getStoredToken();
  
  if (!token) {
    throw new Error('No access token found');
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // Handle token expiration
  if (response.status === 401) {
    logout();
    throw new Error('Session expired. Please login again.');
  }
  
  return response;
};