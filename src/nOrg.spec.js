describe('nOrg', function() {
  var node;

  beforeEach(function () {
    node = nOrg.root.newChild();
  });

  it('exports module contents', function () {
    expect(nOrg.Node).toBeTruthy();
    expect(nOrg.root).toBeTruthy();
  });

  describe('node inheritance:', function () {
    it('has a parent', function () {
      expect(node).toBeTruthy();
      expect(node.parent).toBe(nOrg.root);
    });
    it('inherits attrs and headers from parent', function () {
      var child = node.newChild();
      node.path = 'foo';
      node.headers['Subject'] = "Foo Subject";

      expect(child.path).toBe('foo');
      expect(child.headers['Subject']).toBe("Foo Subject");
    });
    it('child may override parent attrs and headers', function () {
      var child = node.newChild();
      node.path = 'foo';
      node.headers['Subject'] = "Foo Subject";
      child.path = 'bar';
      child.headers['Subject'] = 'Bar Subject';

      expect(child.path).toBe('bar');
      expect(child.headers['Subject']).toBe('Bar Subject');
    });
  });

  it('nodes may be created from objects', function () {
    var object = {"path": "bar",
                  "headers": {"Subject": "Bar Subject"}};
    var child = node.newChild();
    node.path = 'foo';
    node.headers['Subject'] = "Foo Subject";

    child.extend(object);
    expect(child.path).toBe('bar');
    expect(child.headers['Subject']).toBe("Bar Subject");

    object.path = 'qux';
    object.headers['Subject'] = "Qux Subject";
    child = node.newChild(object);
    expect(child.path).toBe('qux');
    expect(child.headers['Subject']).toBe("Qux Subject");
    });
});

