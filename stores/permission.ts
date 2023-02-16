// Pinia
import { defineStore } from 'pinia'

// Api
import * as api from '~~/api/permission'

// Constants
import { COMMON_LOADING } from '~~/utils/constants/common/common'
import { commonLoadingMap } from '~~/utils/helpers/common/common'

// Interfaces
import {
  IPermissionAttrsActionsChange,
  IPermissionAttrsAssign
} from '~~/utils/interfaces/permission/permissionAttrs'
import { IPermissionResponseList } from '~~/utils/interfaces/permission/permissionResponse'
import { IPermissionStoreState } from '~~/utils/interfaces/permission/permissionStore'
import { IRoleWithPermission } from '~~/utils/interfaces/role/role'

export const usePermissionStore = defineStore('permission', {
  state: (): IPermissionStoreState => ({
    loading: COMMON_LOADING,
    list: []
  }),
  actions: {
    /**
     * @description Reset state
     *
     * @param {string} stateKey
     *
     * @return {void} void
     */
    reset: function (stateKey: 'list'): void {
      switch (stateKey) {
        case 'list':
          this.list = []
          break
        default:
          return
      }
    },

    /**
     * @description Get list of permissions
     *
     * @return {Promise<IPermissionResponseList>} Promise<IPermissionResponseList>
     */
    index: async function (): Promise<IPermissionResponseList> {
      this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', true)

      try {
        const response = await api.index()
        this.list = response.result.map(result => ({
          ...result,
          actions: {
            create: false,
            read: false,
            update: false,
            delete: false
          }
        }))

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', false)
      }
    },

    /**
     * @description Assign permissions
     *
     * @param {IPermissionAttrsAssign} payload
     *
     * @return {Promise<IPermissionResponseList>} Promise<IPermissionResponseList>
     */
    store: async function (
      payload: IPermissionAttrsAssign
    ): Promise<IPermissionResponseList> {
      this.loading = commonLoadingMap(this.loading, 'isCreateEditLoading', true)

      try {
        const response = await api.assign(payload)

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
     * @description Set action of permissions
     *
     * @param {IRoleWithPermission['permissions']} payload
     *
     * @return {void} void
     */
    SET_PERMISSION_ACTIONS: function (
      payload: IRoleWithPermission['permissions']
    ): void {
      this.list = this.list.map(permission => {
        return {
          ...permission,
          actions: payload.find(
            rolePermission => rolePermission.id === permission.id
          )?.actions || {
            create: false,
            read: false,
            update: false,
            delete: false
          }
        }
      })
    },

    /**
     * @description Set value of permission actions
     *
     * @param {IPermissionAttrsActionsChange} payload
     *
     * @return {void} void
     */
    SET_PERMISSION_ACTIONS_VALUE: function (
      payload: IPermissionAttrsActionsChange
    ): void {
      this.list = this.list.map(permission => {
        if (permission.id === payload.permission.id) {
          return {
            ...permission,
            actions: {
              ...permission.actions,
              [payload.actionKey]: payload.value
            }
          }
        } else {
          return permission
        }
      })
    }
  }
})
