import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contributionUrl'
})
export class ContributionUrlPipe implements PipeTransform {

  transform(value: string): string {

    const regex = /\/\/([^\/,\s]+\.[^\/,\s]+?)(?=\/|,|\s|$|\?|#)/g;

    value = value.replace('https:', '');
    value = value.replace('https:', '');
    let newString = regex.exec(value)[1];
    newString = newString.replace('www.', '');

    return newString;

  }

}
