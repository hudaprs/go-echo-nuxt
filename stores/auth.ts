// Pinia
import { defineStore } from 'pinia'

// Api
import { $api } from '~~/api/base'

// Constants
import { COMMON_LOADING } from '~~/utils/constants/common/common'
import { commonLoadingMap } from '~~/utils/helpers/common/common'

// Interfaces
import {
  IAuthLoginForm,
  IAuthRegisterForm
} from '~~/utils/interfaces/auth/auth'
import {
  IAuthRegisterResponse,
  IAuthLoginResponse
} from '~~/utils/interfaces/auth/authResponse'
import { IAuthStoreState } from '~~/utils/interfaces/auth/authStore'

export const useAuthStore = defineStore('auth', {
  persist: {
    paths: ['token']
  },
  state: (): IAuthStoreState => ({
    loading: COMMON_LOADING,
    token: ''
  }),
  getters: {
    isAuthenticated: (state): boolean => {
      return state.token !== ''
    }
  },
  actions: {
    /**
     * @description Register user
     *
     * @param {IAuthRegisterForm} form
     *
     * @return {Promise<IAuthRegisterResponse>} Promise<IAuthRegisterResponse>
     */
    register: async function (
      form: IAuthRegisterForm
    ): Promise<IAuthRegisterResponse> {
      this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', true)

      try {
        const response = await $api<IAuthRegisterResponse>(
          '/v1/auth/register',
          {
            method: 'post',
            body: form
          }
        )

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', false)
      }
    },

    /**
     * @description Login user
     *
     * @param {IAuthLoginForm} form
     *
     * @return {Promise<IAuthLoginResponse>} Promise<IAuthLoginResponse>
     */
    login: async function (form: IAuthLoginForm): Promise<IAuthLoginResponse> {
      this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', true)

      try {
        const response = await $api<IAuthLoginResponse>('/v1/auth/login', {
          method: 'post',
          body: form
        })

        this.token = response.result.token

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', false)
      }
    },

    /**
     * @description Logout user
     *
     * @return {void} void
     */
    logout: function (): void {
      this.token = ''
    }
  }
})
