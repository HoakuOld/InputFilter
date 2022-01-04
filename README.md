# Hoaku Filter
Checks if a variable meets certain requirements, like length or if it matches regex, all in one handy function.

# Example usage
```js
const Filter = require("@hoaku/filter");
const filter = new Filter({
    filters: {
        username: {
            prefix: "USERNAME",
            allowedTypes: ["string"],
            minStringLength: 4,
            maxStringLength: 30,
            matchRegex: /^[a-zA-Z0-9_]*$/
        }
    }
});

const username = "realmy!";

const filterResult = filter("username", username);
console.log(filterResult);
```

This would print out `{ passed: false, error: 'USERNAME_FORMAT_INCORRECT' }`, because the string didn't match the regex pattern.

# `new Filter(globalSettings)`

The class that `require("@hoaku/filter")` returns.

## globalSettings (Object)
- `filters` (Object): The object where the filters are stored, which are reusable
    - [Filter name] (Object): The filter object, which has settings that apply to the filter.

### [Filter name] (Object)
- `prefix`: The prefix in front of the error messages. For example, if it's "USERNAME", error messages could look like "USERNAME_UNDEFINED". The default value is `"INPUT"`.
- `required`: Whether or not the variable to check can be undefined. If it is undefined and `required` is set to `false`, it would return `{ passed: true }`. If this is incorrect, it returns an error message like `PREFIX_UNDEFINED`. The default value is `true`.
- `allowedTypes`: The types that the variable is allowed to be. If this is incorrect, it returns an error message like `PREFIX_WRONG_TYPE`. Note: **This isn't the same list of types as what `typeof` can return.** These are the types that are allowed:
    - `string`
    - `boolean`
    - `number` (This is both `number` and `bigint`)
    - `null`
    - `array`
    - `object` (This only counts as a key-value object, like `{ hello: "world" }`)
- `minStringLength`: The minimum length a string can be. If this is incorrect, it returns an error message like `PREFIX_TOO_SHORT`.
- `maxStringLength`: The maximum length a string can be. If this is incorrect, it returns an error message like `PREFIX_TOO_LONG`.
- `matchRegex`: The regex pattern a string must match. If this is incorrect, it returns an error message like `PREFIX_FORMAT_INCORRECT`.
