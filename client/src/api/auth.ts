import { supabase } from '@/lib/supabase'
import api from './api'

// Description: Log in a user
// Endpoint: POST /api/auth/login
// Request: { email: string, password: string }
// Response: { user: { id: string, email: string }, session: { access_token: string } }
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)

  return {
    accessToken: data.session?.access_token,
    refreshToken: data.session?.refresh_token,
  }
}

// Description: Register a new user
// Endpoint: POST /api/auth/register
// Request: { email: string, password: string }
// Response: { user: { id: string, email: string }, session: { access_token: string } }
export const register = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw new Error(error.message)

  return {
    accessToken: data.session?.access_token,
    refreshToken: data.session?.refresh_token,
  }
}

// Description: Log out the current user
// Endpoint: POST /api/auth/logout
// Request: {}
// Response: { success: true }
export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
  return { success: true }
}

// Description: Refresh access token using refresh token
// Endpoint: POST /api/auth/refresh
// Request: { refreshToken: string }
// Response: { accessToken: string, refreshToken: string }
export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await api.post('/api/auth/refresh', { refreshToken });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};