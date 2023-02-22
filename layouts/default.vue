<script setup lang="ts">
// Pinia
import { storeToRefs } from 'pinia'

// Interfaces
import { IPermissionActionString } from '~~/utils/interfaces/permission/permission'
import { IAuthFormChangeRole } from '~~/utils/interfaces/auth/auth'

// Vue Toastification
import { useToast } from 'vue-toastification'

// Composables
const { checkMenuPermissions } = useRoleChecker()

// Toast
const toast = useToast()

// Store
const authStore = useAuthStore()
const commonStore = useCommonStore()
const { modalRefetchOptions } = storeToRefs(commonStore)
const { loading, roleList, activeRole } = storeToRefs(authStore)

// Router
const router = useRouter()

// State
const isSidebarOpen = ref(true)
const menus = ref([
  {
    text: 'Dashboard',
    to: '/',
    icon: 'ri:home-2-line',
    permissions: []
  },
  {
    text: 'Todo',
    to: '/todos',
    icon: 'ri-book-read-line',
    permissions: [{ code: 'TODO', actions: [IPermissionActionString.READ] }]
  },
  {
    text: 'User Management',
    to: '/users',
    icon: 'ri-file-user-line',
    permissions: [
      { code: 'USER_MANAGEMENT', actions: [IPermissionActionString.READ] }
    ]
  },
  {
    text: 'Role Management',
    to: '/roles',
    icon: 'ri-profile-line',
    permissions: [
      { code: 'ROLE_MANAGEMENT', actions: [IPermissionActionString.READ] }
    ]
  }
])

const defaultOptions = reactive({
  modal: { isChangeRoleOpen: false }
})

onMounted(() => {
  menus.value = checkMenuPermissions({ menus: menus.value })
})

/**
 * @description Modal handler
 *
 * @param {string} type
 * @param {boolean} value
 *
 * @return {void} void
 */
const handleModal = (type: 'isChangeRoleOpen', value: boolean): void => {
  defaultOptions.modal[type] = value
}

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
  } catch (_) {
    //
  }
}

/**
 * @description Change role handler
 *
 * @return {Promise<void>} Promise<void>
 */
const onChangeRole = async (form: IAuthFormChangeRole): Promise<void> => {
  try {
    // Change current active role to new one
    const response = await authStore.activateRole({
      params: { roleId: form.role.value }
    })

    // Load current user
    await authStore.me()

    toast.success(response.message)

    handleModal('isChangeRoleOpen', false)

    menus.value = checkMenuPermissions({ menus: menus.value })

    console.log('### menus', menus.value)
    console.log('### menus func', checkMenuPermissions({ menus: menus.value }))
  } catch (_) {
    //
  }
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
          <!-- Left Side -->
          <div>
            <img src="~/assets/img/gits.webp" alt="GITS.id" width="90" />
          </div>

          <!-- Right Side -->
          <div class="flex gap-8">
            <div
              class="cursor-pointer text-blue-400"
              @click="handleModal('isChangeRoleOpen', true)"
            >
              Change Role
            </div>

            <div class="cursor-pointer text-blue-400" @click="onLogout">
              Logout
            </div>
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

    <!-- Modal Change Role -->
    <auth-form-modal-change-role
      :loading="loading"
      :isOpen="defaultOptions.modal.isChangeRoleOpen"
      :role-list="roleList"
      :previous-active-role="activeRole"
      @submit="onChangeRole"
      @close="handleModal('isChangeRoleOpen', false)"
    />
  </div>
</template>
