# In order to run

npm start

# In order to run unit tests

npm test

# Test with jasmine

1. Create a test suite with describe function which will grouped tests.

   # describe()

   function which takes two parameters:

   - description of suite (basically component or function name)
   - function with suite definition

```
    describe('Suite description', () => {
        /**/
    });
```

2. Create it() function which will asserts the behavior of the code under test

# it()

```
describe('Suite description', () => {
    it('Spec description', () => {

    });
});
```

3. Write expect() function

```
    expect(actualValue).toBe(expectedValue);
```
