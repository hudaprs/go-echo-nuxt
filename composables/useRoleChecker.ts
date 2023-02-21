// Pinia
import { storeToRefs } from 'pinia'

// Interfaces
import {
  IPermissionAction,
  IPermissionActionString
} from '~~/utils/interfaces/permission/permission'

export interface IPermissionMenuWithAction {
  code: string
  actions: IPermissionActionString[]
}

interface ICheckMenuPermissionAttrs {
  menus: {
    text: string
    to: string
    icon: string
    permissions: IPermissionMenuWithAction[]
  }[]
}

export const useRoleChecker = () => {
  const authStore = useAuthStore()
  const { activeRole } = storeToRefs(authStore)
  const activeRolePermissions = activeRole?.value?.permissions || []

  // Computed

  /**
   * @description Check active role permission
   *
   * @param {string} selectedPermissionCode
   * @param {IPermissionActionString[]} actions
   *
   * @return {boolean} boolean
   */
  const checkActiveRolePermission = (
    selectedPermissionCode: string,
    actions: IPermissionActionString[]
  ): boolean => {
    return activeRolePermissions.some(
      // Compare code of permissions from the menu and the activate permission
      // Compare "actions" from active role permissions and with menu keys
      activeRolePermission =>
        selectedPermissionCode === activeRolePermission.code &&
        actions.some(
          action =>
            activeRolePermission.actions[action as keyof IPermissionAction] ===
            true
        )
    )
  }

  /**
   * @description Check menu permissions
   *
   * @param {ICheckMenuPermissionAttrs} payload
   *
   * @return {ICheckMenuPermissionAttrs['menus']} ICheckMenuPermissionAttrs['menus']
   */
  const checkMenuPermissions = (
    payload: ICheckMenuPermissionAttrs
  ): ICheckMenuPermissionAttrs['menus'] => {
    return payload.menus.filter(menu => {
      // Always expose if menu don't have permissions
      if (menu.permissions.length === 0) {
        return menu
      } else {
        return menu.permissions.some(menuPermission => {
          return checkActiveRolePermission(
            menuPermission.code,
            menuPermission.actions
          )
        })
      }
    })
  }

  /**
   * @description Check menu permission by route
   *
   * @param {IPermissionMenuWithAction} routePermission
   *
   * @return {boolean} boolean
   */
  const checkPermission = (
    routePermission: IPermissionMenuWithAction
  ): boolean => {
    return checkActiveRolePermission(
      routePermission.code,
      routePermission.actions
    )
  }

  /**
   * @description Check actions
   *
   * @param {string} code
   *
   * @return {IPermissionAction} IPermissionAction
   */
  const checkPermissionActions = (code: string): IPermissionAction => {
    return {
      create: checkPermission({
        code,
        actions: [IPermissionActionString.CREATE]
      }),
      read: checkPermission({
        code,
        actions: [IPermissionActionString.READ]
      }),
      update: checkPermission({
        code,
        actions: [IPermissionActionString.UPDATE]
      }),
      delete: checkPermission({
        code,
        actions: [IPermissionActionString.DELETE]
      })
    }
  }

  return {
    checkActiveRolePermission,
    checkMenuPermissions,
    checkPermission,
    checkPermissionActions
  }
}
