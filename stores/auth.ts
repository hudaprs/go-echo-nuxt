// Pinia
import { defineStore } from 'pinia'
import { $api } from '~~/api/base'

// Constants
import { COMMON_LOADING } from '~~/utils/constants/common/common'
import { commonLoadingMap } from '~~/utils/helpers/common/common'

// Interfaces
import {
  IAuthLoginForm,
  IAuthRegisterForm
} from '~~/utils/interfaces/auth/auth'
import { IAuthStoreState } from '~~/utils/interfaces/auth/authStore'

export const useAuthStore = defineStore('auth', {
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
     * @return {Promise<any>} Promise<any>
     */
    register: async function (form: IAuthRegisterForm): Promise<any> {
      this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', true)

      try {
        const response = await $api('/v1/auth/register', {
          method: 'post',
          body: form
        })

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
     * @return {Promise<any>} Promise<any>
     */
    login: async function (form: IAuthLoginForm): Promise<any> {
      this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', true)

      try {
        const response = await $api('/v1/auth/login', {
          method: 'post',
          body: form
        })

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', false)
      }
    }
  }
})
