import ResourceList from "./ResourceList"

describe("ResourceList", () => {
  describe("addValues", () => {
    it("should add values together", () => {
      const list = new ResourceList()

      list.addValues(new ResourceList({ gold: 10 }))
      list.addValues(new ResourceList({ gold: 10 }))

      list.addValues(new ResourceList({ buildings: [{ _id: 1 }] }))
      list.addValues(new ResourceList({ buildings: [{ _id: 2 }] }))

      expect(list.value.gold).toEqual(20)
      expect(list.value.buildings.length).toEqual(2)
    })

    it("should add a single value into an array of values", () => {
      const list = new ResourceList()

      list.addValues(new ResourceList({ buildings: [{ _id: 1 }] }))
      list.addValues(new ResourceList({ buildings: { id: 2 } }))

      expect(list.value.buildings.length).toEqual(2)
    })
  })

  describe("removeValues", () => {
    it("should subtract values correctly", () => {
      const list = new ResourceList()

      list.addValues(new ResourceList({ gold: 10 }))
      list.addValues(new ResourceList({ gold: 10 }))
      list.removeValues(new ResourceList({ gold: 5 }))

      list.addValues(new ResourceList({ buildings: [{ _id: 1 }] }))
      list.addValues(new ResourceList({ buildings: [{ _id: 2 }] }))
      list.addValues(new ResourceList({ buildings: [{ _id: 3 }] }))
      list.removeValues(new ResourceList({ buildings: [{ _id: 1 }] }))

      expect(list.value.buildings.length).toEqual(2)
      expect(list.value.buildings[0]._id).toEqual(2)
      expect(list.value.gold).toEqual(15)
    })

    it("should throw an error if losing a resource that doesn't exist", () => {
      const list = new ResourceList()

      try {
        list.removeValues(new ResourceList({ buildings: [{ _id: 1 }] }))
        // Should never make it here...
        expect(false).toEqual(true)
      } catch (err) {
        expect(err.message).toEqual(
          "Unable to lose resource, none accumulated.",
        )
      }
    })

    it("should remove a single value into an array of values", () => {
      const list = new ResourceList()

      list.addValues(new ResourceList({ buildings: [{ _id: 1 }] }))
      list.addValues(new ResourceList({ buildings: { _id: 2 } }))

      list.removeValues(new ResourceList({ buildings: { _id: 1 } }))

      expect(list.value.buildings.length).toEqual(1)
      expect(list.value.buildings[0]._id).toEqual(2)
    })
  })
})
