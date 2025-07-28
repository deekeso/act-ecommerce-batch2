import { useAuth } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export function useAuthGuard() {
  const router = useRouter()
  const auth = useAuth()

  auth.loadAuthFromStorage()

  function requireAuth() {
    if (!auth.token || !auth.user) {
      ElMessage.info('You must log in first')
      router.push('/login')
      return false
    }
    return true
  }

  function redirectIfLoggedIn() {
    if (auth.token && auth.user) {
      router.push('/')
      return true
    }
    return false
  }

  function requireGuest() {
    if (auth.token && auth.user) {
      ElMessage.info('You are already logged in')
      router.push('/')
      return false
    }
    return true
  }

  return {
    requireAuth,
    redirectIfLoggedIn,
    requireGuest,
  }
}
