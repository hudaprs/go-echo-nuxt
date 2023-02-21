// Composables
import { IPermissionMenuWithAction } from '~~/composables/useRoleChecker'

export default defineNuxtRouteMiddleware(to => {
  const auth = useAuthStore()
  const { checkPermission } = useRoleChecker()
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

  // Check if user already authenticated, but want to access private route
  if (auth.isAuthenticated) {
    const routePermission =
      (to.meta.permission as IPermissionMenuWithAction) || undefined

    if (routePermission) {
      const isPassed = checkPermission(routePermission)
      if (!isPassed) {
        return router.replace({ name: 'index' })
      }
    }
  }
})
