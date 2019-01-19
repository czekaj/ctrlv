export const throwError = (message) => ({
  type: 'THROW_ERROR',
  message
})

export const clearError = () => ({
  type: 'CLEAR_ERROR'
})
