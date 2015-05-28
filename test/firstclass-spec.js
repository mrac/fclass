describe('property()', function() {
  it('should build function for accessing property value', function() {
    var obj = {id: 10, a: 5};
    expect(property('id', 10)(obj)).toEqual(10);
  });
});
