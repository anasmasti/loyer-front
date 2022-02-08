import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "entite_org"
})
export class getNameOfObject implements PipeTransform{
    transform(value: object, ...args: any[]) {
        let name = Object.keys(value).toString()
        return name
    }
}
