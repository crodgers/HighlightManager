import { HighlightManagerPage } from './app.po';

describe('highlight-manager App', function() {
  let page: HighlightManagerPage;

  beforeEach(() => {
    page = new HighlightManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
