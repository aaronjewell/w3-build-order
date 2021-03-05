import Building from "./Building"

import buildingData from "../data/orc/buildings"

describe("Building", () => {
  describe("constructor", () => {
    it("should increment the id of the building for each new building", () => {
      const buildingOne = new Building(buildingData[0])
      const buildingTwo = new Building(buildingData[0])

      expect(buildingOne._id).toEqual(1)
      expect(buildingTwo._id).toEqual(2)
    })
  })
})
