import { SanitizeMarkdownPipe } from './sanitize-markdown.pipe';

describe('SanitizeMarkdownPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeMarkdownPipe();
    expect(pipe).toBeTruthy();
  });
});
