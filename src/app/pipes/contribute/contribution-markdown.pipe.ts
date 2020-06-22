import { Pipe, PipeTransform } from '@angular/core';
import snarkdown from 'snarkdown';


@Pipe({
  name: 'contributionMarkdown'
})
export class ContributionMarkdownPipe implements PipeTransform {

  transform(mdText: string): string {

    const html = snarkdown(mdText);

    return html;
  }

}
