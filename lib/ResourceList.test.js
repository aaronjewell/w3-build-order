import ResourceList from "./ResourceList";

describe("ResourceList", () => {
    it("should add values together", () => {
        const list = new ResourceList();

        list.addValues(new ResourceList({ gold: 10 }));
        list.addValues(new ResourceList({ gold: 10 }));

        list.addValues(new ResourceList({ buildings: [{ _id: 1 }] }));
        list.addValues(new ResourceList({ buildings: [{ _id: 2 }] }));

        expect(list.value.gold).toEqual(20);
        expect(list.value.buildings.length).toEqual(2);
    });

    it("should subtract values correctly", () => {
      const list = new ResourceList();

      list.addValues(new ResourceList({ gold: 10 }));
      list.addValues(new ResourceList({ gold: 10 }));
      list.removeValues(new ResourceList({ gold: 5 }));

      list.addValues(new ResourceList({ buildings: [{ _id: 1 }] }));
      list.addValues(new ResourceList({ buildings: [{ _id: 2 }] }));
      list.addValues(new ResourceList({ buildings: [{ _id: 3 }] }));
      list.removeValues(new ResourceList({ buildings: [{ _id: 1 }] }));

      expect(list.value.buildings.length).toEqual(2);
      expect(list.value.buildings[0]._id).toEqual(2);
      expect(list.value.gold).toEqual(15);
    });
})