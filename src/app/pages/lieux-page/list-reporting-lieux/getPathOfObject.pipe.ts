import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name:"test"
})
    
export class getPathOfObject implements PipeTransform{
    transform(value: any, ...args: any[]) {
        return value
    }
}