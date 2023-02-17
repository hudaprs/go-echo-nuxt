// Pinia
import { defineStore } from 'pinia'

// Api
import * as api from '~~/api/user'

// Constants
import {
  COMMON_LOADING,
  COMMON_PAGINATION
} from '~~/utils/constants/common/common'
import { commonLoadingMap } from '~~/utils/helpers/common/common'

// Interfaces
import {
  IUserAttrsStore,
  IUserAttrsUpdate,
  IUserAttrsDestroy,
  IUserAttrsShow,
  IUserAttrsIndex
} from '~~/utils/interfaces/user/userAttrs'
import {
  IUserResponseList,
  IUserResponseDetailWithRole
} from '~~/utils/interfaces/user/userResponse'
import { IRoleResponseDropdown } from '~~/utils/interfaces/role/roleResponse'
import { IUserStoreState } from '~~/utils/interfaces/user/userStore'

export const useUserStore = defineStore('user', {
  state: (): IUserStoreState => ({
    loading: COMMON_LOADING,
    list: { ...COMMON_PAGINATION, rows: [] },
    dropdown: {
      role: {
        loading: COMMON_LOADING,
        list: []
      }
    },
    detail: null
  }),
  getters: {
    roleList: state =>
      state.dropdown.role.list.map(list => ({
        text: list.name,
        value: list.id
      }))
  },
  actions: {
    /**
     * @description Reset state
     *
     * @param {string} stateKey
     *
     * @return {void} void
     */
    reset: function (stateKey: 'list' | 'detail'): void {
      switch (stateKey) {
        case 'list':
          this.list = { ...COMMON_PAGINATION, rows: [] }
          break
        case 'detail':
          this.detail = null
          break
        default:
          return
      }
    },

    /**
     * @description Get list of user
     *
     * @param {IUserAttrsIndex} payload
     *
     * @return {Promise<IUserResponseList>} Promise<IUserResponseList>
     */
    index: async function (
      payload: IUserAttrsIndex
    ): Promise<IUserResponseList> {
      this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', true)

      try {
        const response = await api.index(payload)
        this.list = response.result

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', false)
      }
    },

    /**
     * @description Create user
     *
     * @param {IUserAttrsStore} payload
     *
     * @return {Promise<IUserResponseDetailWithRole>} Promise<IUserResponseDetailWithRole>
     */
    store: async function (
      payload: IUserAttrsStore
    ): Promise<IUserResponseDetailWithRole> {
      this.loading = commonLoadingMap(this.loading, 'isCreateEditLoading', true)

      try {
        const response = await api.store(payload)

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(
          this.loading,
          'isCreateEditLoading',
          false
        )
      }
    },

    /**
     * @description Get detail of user
     *
     * @param {IUserAttrsShow} payload
     *
     * @return {Promise<IUserResponseDetailWithRole>} Promise<IUserResponseDetailWithRole>
     */
    show: async function (
      payload: IUserAttrsShow
    ): Promise<IUserResponseDetailWithRole> {
      this.loading = commonLoadingMap(this.loading, 'isDetailLoading', true)

      try {
        const response = await api.show(payload)

        this.detail = response.result

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(this.loading, 'isDetailLoading', false)
      }
    },

    /**
     * @description Update user
     *
     * @param {IUserAttrsUpdate} payload
     *
     * @return {Promise<IUserResponseDetailWithRole>} Promise<IUserResponseDetailWithRole>
     */
    update: async function (
      payload: IUserAttrsUpdate
    ): Promise<IUserResponseDetailWithRole> {
      this.loading = commonLoadingMap(this.loading, 'isCreateEditLoading', true)

      try {
        const response = await api.update(payload)

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(
          this.loading,
          'isCreateEditLoading',
          false
        )
      }
    },

    /**
     * @description Delete role
     *
     * @param {IUserAttrsDestroy} payload
     *
     * @return {Promise<IUserResponseDetailWithRole>} Promise<IUserResponseDetailWithRole>
     */
    destroy: async function (
      payload: IUserAttrsDestroy
    ): Promise<IUserResponseDetailWithRole> {
      this.loading = commonLoadingMap(this.loading, 'isDeleteLoading', true)

      try {
        const response = await api.destroy(payload)

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(this.loading, 'isDeleteLoading', false)
      }
    },

    /**
     * @description Get list of roles
     *
     * @return {Promise<IRoleResponseDropdown>} Promise<IRoleResponseDropdown>
     */
    roleIndex: async function (): Promise<IRoleResponseDropdown> {
      this.dropdown.role.loading = commonLoadingMap(
        this.dropdown.role.loading,
        'isDefaultLoading',
        true
      )

      try {
        const response = await api.role.index()
        this.dropdown.role.list = response.result

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.dropdown.role.loading = commonLoadingMap(
          this.dropdown.role.loading,
          'isDefaultLoading',
          false
        )
      }
    }
  }
})
