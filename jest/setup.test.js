let animals=["elephant","zebra","bear","tiger"]

beforeEach(()=>{
    console.log("before each")
    animals=["elephant","zebra","bear","tiger"]
})

describe("animals array",()=>{

it("should add animal to the end",()=>{
    animals.push("alligator")

    expect(animals[animals.length-1]).toEqual("alligator")

})

it("should add animal to the start",()=>{
    animals.unshift("lion")

    expect(animals[0]).toEqual("lion")

})

it("should have initial length of 4",()=>{
   
    expect(animals.length).toEqual(4)

})



})

describe("testing something else",()=>{

    it.only("true should be truthy",()=>{
        expect(true).toBeTruthy()
    })


})