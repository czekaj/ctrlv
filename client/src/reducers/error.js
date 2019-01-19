export default (previousState = {}, action) => {
  switch (action.type) {
    case 'THROW_ERROR':
      return {
        message: action.message
      }
    case 'CLEAR_ERROR':
      return {}
    default:
      return previousState
  }
}
