<script setup lang="ts">
// Pinia
import { storeToRefs } from 'pinia'

// Interfaces
import { IPermissionActionString } from '~~/utils/interfaces/permission/permission'

// Translator
const { t } = useLocale()

// Composables
const { checkMenuPermissions } = useRoleChecker()

// Store
const authStore = useAuthStore()
const commonStore = useCommonStore()
const { modalRefetchOptions } = storeToRefs(commonStore)

// Router
const router = useRouter()

// State
const isSidebarOpen = ref(true)
const menus = ref([
  {
    text: t('menu.dashboard'),
    to: '/',
    icon: 'ri:home-2-line',
    permissions: []
  },
  {
    text: t('menu.todo'),
    to: '/todos',
    icon: 'ri-book-read-line',
    permissions: [{ code: 'TODO', actions: [IPermissionActionString.READ] }]
  },
  {
    text: t('menu.userManagement'),
    to: '/users',
    icon: 'ri-file-user-line',
    permissions: [
      { code: 'USER_MANAGEMENT', actions: [IPermissionActionString.READ] }
    ]
  },
  {
    text: t('menu.roleManagement'),
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
        <template
          v-for="menu in checkMenuPermissions({ menus })"
          :key="menu.to"
        >
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
              {{ t('general.config') }}
            </div>

            <div class="cursor-pointer text-blue-400" @click="onLogout">
              {{ t('general.logout') }}
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
      :title="modalRefetchOptions.title || t('general.areYouSureWantToRefetch')"
      :message="modalRefetchOptions.message"
      :is-open="modalRefetchOptions.isOpen"
      @confirm="commonStore.CLEAR_MODAL_REFETCH(modalRefetchOptions.confirm)"
      @close="commonStore.CLEAR_MODAL_REFETCH(modalRefetchOptions.close)"
    />

    <!-- Modal Option -->
    <app-modal-configuration
      :isOpen="defaultOptions.modal.isChangeRoleOpen"
      @close="handleModal('isChangeRoleOpen', false)"
    />
  </div>
</template>
