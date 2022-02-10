import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformName',
})
export class TransformNamePipe implements PipeTransform {
  transform(value: object, ...args: any[]) {
    let name = Object.keys(value).toString().split('_').join(' ');
    
    return name;
  }
}
