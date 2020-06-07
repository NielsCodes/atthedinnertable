import { Pipe, PipeTransform } from '@angular/core';
import snarkdown from 'snarkdown';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(mdText: string): string {

    const html = snarkdown(mdText);

    return html;
  }

}
