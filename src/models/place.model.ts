import { Location } from "./location.model";

export class Place{
    constructor(
        public title: string, 
        public description: string, 
        private imageURL: string,
        private location: Location){

        }
}