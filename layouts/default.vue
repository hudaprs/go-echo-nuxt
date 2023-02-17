<script setup lang="ts">
// Pinia
import { storeToRefs } from 'pinia'

// Store
const authStore = useAuthStore()
const commonStore = useCommonStore()
const { modalRefetchOptions } = storeToRefs(commonStore)

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
    to: '/todos',
    icon: 'ri-book-read-line'
  },
  {
    text: 'User Management',
    to: '/users',
    icon: 'ri-file-user-line'
  },
  {
    text: 'Role Management',
    to: '/roles',
    icon: 'ri-profile-line'
  }
])

/**
 * @description Logout an user
 *
 * @return {Promise<void>} Promise<void>
 */
const onLogout = async (): Promise<void> => {
  try {
    // Clear state
    await authStore.logout()

    // Redirect to login
    router.replace({ name: 'auth-login' })
  } catch (_) {}
}
</script>

<template>
  <div class="flex">
    <!-- Sidebar -->
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

    <!-- Content -->
    <div class="w-screen">
      <!-- Navbar -->
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

      <!-- Container / Body -->
      <div class="ml-3">
        <slot />
      </div>
    </div>

    <!-- Modal Confirmation - Refetch -->
    <app-modal-confirmation
      :title="modalRefetchOptions.title || 'Are you want to refetch?'"
      :message="modalRefetchOptions.message"
      :is-open="modalRefetchOptions.isOpen"
      @confirm="commonStore.CLEAR_MODAL_REFETCH(modalRefetchOptions.confirm)"
      @close="commonStore.CLEAR_MODAL_REFETCH(modalRefetchOptions.close)"
    />
  </div>
</template>
