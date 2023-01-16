<script setup lang="ts">
// GITS UI
import { Menu } from '@gits-id/menu'

// Store
const { logout } = useAuthStore()

// Router
const router = useRouter()

// State
const isSidebarOpen = ref(true)

const menus = reactive([
  {
    text: 'Dashboard',
    to: '/',
    icon: 'ri:home-2-line'
  },
  {
    text: 'Todo',
    to: '/todo',
    icon: 'ri-book-read-line'
  }
])

/**
 * @description Logout an user
 *
 * @return {void} void
 */
const onLogout = (): void => {
  // Clear state
  logout()

  // Redirect to login
  router.replace({ name: 'auth-login' })
}
</script>

<template>
  <div class="flex">
    <v-nav-drawer
      v-model="isSidebarOpen"
      color="default"
      class="top-0 inset-x-0"
      bordered
      shadow
    >
      <div
        class="flex items-center flex-col justify-center text-center"
        style="height: 70px"
      >
        <p class="font-semibold text-xl">GITS EXAMPLE</p>
      </div>

      <hr />

      <div class="ml-3">
        <template v-for="menu in menus" :key="menu.to">
          <v-menu
            :menu="menu"
            dark-bg-color=""
            bg-color=""
            color=""
            dark-color=""
            class-menu-parent=""
          />
        </template>
      </div>
    </v-nav-drawer>

    <div class="w-screen">
      <v-app-bar shadow style="height: 70px" class="mb-4">
        <div class="flex justify-between items-center w-full">
          <div>
            <img src="~/assets/img/gits.webp" alt="GITS.id" width="90" />
          </div>
          <div class="cursor-pointer text-blue-400" @click="onLogout">
            Logout
          </div>
        </div>
      </v-app-bar>

      <div class="ml-3">
        <slot />
      </div>
    </div>
  </div>
</template>
