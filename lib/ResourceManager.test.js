import items from "../data/neutral/items"
import ResourceManager from "./ResourceManager"

describe("ResourceManager", () => {
  describe("constructor", () => {
    it("should start with an empty resource collection and indices", () => {
      const manager = new ResourceManager()

      expect(manager.resourcesIndices.length).toEqual(0)
      expect(manager.resources).toEqual({})
    })
  })

  describe("reset", () => {
    it("should empty out the resource collection and indicies", () => {
      const manager = new ResourceManager()

      manager.resources[1] = {}
      manager.resourcesIndices.push(1)

      manager.reset()

      expect(manager.resourcesIndices.length).toEqual(0)
      expect(manager.resources).toEqual({})
    })
  })
})
