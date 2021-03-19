// Used for importing images using webpack for bundling dynamic images.
export function getImgUrl(image) {
  return require(`../images/${image}`)
}
