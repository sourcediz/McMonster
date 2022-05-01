export type Tlocation = {
    lat : number,
    lng : number
} 

export type Tmonster = {
    id : string
    name : string,
    type : string,
    rating : number
    hp : number,
    attack : number,
    defense : number
    speed : string,
    location : location
    address : string
}