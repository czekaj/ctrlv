
export default (previousState = {}, action) => {
  switch (action.type) {
    case 'CREATE_CLIP':
      return {
        ...action.clip
      }
    case 'UPDATE_CLIP':
      return {
        ...previousState,
        text: action.text
      }
    case 'DELETE_CLIP':
      return {
        key: action.key
      }
    default:
      return previousState
  }
}
