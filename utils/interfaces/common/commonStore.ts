export interface ICommonStoreState {
  modalRefetchOptions: {
    isOpen: boolean
    message: string
    title?: string
    loading?: boolean
    confirm?: (payload?: { type: string; value: any }) => void
    close?: (payload?: { type: string; value: any }) => void
  }
}
