export const createClip = (
  clip
) => ({
  type: 'CREATE_CLIP',
  clip
})

export const updateClip = (text) => ({
  type: 'UPDATE_CLIP',
  text
})

export const deleteClip = (key) => ({
  type: 'DELETE_CLIP',
  key
})
