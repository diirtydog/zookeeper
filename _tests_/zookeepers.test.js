const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers.json");

jest.mock('fs');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: 'dick', id: '69' },
        zookeepers
    );

    expect(zookeeper.name).toBe('dick');
    expect(zookeeper.id).toBe('69');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: '69',
            name: 'dick',
            age: '28',
            favoriteAnimal: 'trex'
        },
        {
            id: '88',
            name: 'irin',
            age: '99',
            favoriteAnimal: 'goat'
        }
    ];

    const updatedZookeepers = filterByQuery({age: '99' }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(0)
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: '69',
            name: 'dick',
            age: '28',
            favoriteAnimal: 'trex'
        },
        {
            id: '88',
            name: 'irin',
            age: '99',
            favoriteAnimal: 'goat'
        }
    ];

    const result = findById('69', startingZookeepers);

    expect(result.name).toBe('dick');
});

test("validates age", () => {
    const zookeeper = {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    };
  
    const invalidZookeeper = {
      id: "3",
      name: "Isabella",
      age: "67",
      favoriteAnimal: "bear",
    };
  
    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);
  
    expect(result).toBe(true);
    expect(result2).toBe(false);
  });