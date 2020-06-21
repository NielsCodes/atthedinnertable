import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeMarkdown'
})
export class SanitizeMarkdownPipe implements PipeTransform {

  transform(raw: string): string {

    const clean = raw.replace(/<\/?[^>]+(>|$)/g, '');

    return clean;
  }

}
