export default defineNuxtRouteMiddleware(to => {
  const auth = useAuthStore()
  const router = useRouter()
  const authRoutes: string[] = ['auth-register', 'auth-login']

  // Check if user is not authenticated
  // Force back to login
  if (
    !auth.isAuthenticated &&
    to.name &&
    !authRoutes.includes(to.name as string)
  ) {
    return router.replace({ name: 'auth-login' })
  }

  // Check if user already authenticated, but want to access auth page again
  // Force back to dashboard
  if (
    auth.isAuthenticated &&
    to.name &&
    authRoutes.includes(to.name as string)
  ) {
    return router.replace({ name: 'index' })
  }
})
