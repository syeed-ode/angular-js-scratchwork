/* chapter2/blog-spec.js */
describe('MEAN Blog', function() {
        it('test the MEAN Blog', function() {
                browser.get('http://localhost:8383/AngularJsProject/');

                element(by.model('blogList'))
                        .sendKeys('this is a blog post');

                element(by.css('[value="add"]')).click();

                var blogList = element.all(by.repeater('blog in blogs'));

                expect(blogList.count()).toEqual(3);

                expect(blogList.get(2)
                        .getText())
                        .toEqual('this is a blog post');
        });
});
