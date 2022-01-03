module.exports = class {
    constructor(globalSettings = {
        filters: {}
    }) {
        return (filter, toCheck) => {
            let settings = null;

            if (globalSettings.filters[filter]) settings = globalSettings.filters[filter];
            else throw new Error("The filter you tried to use doesn't exist");

            if (!settings.prefix) settings.prefix = "INPUT";
            if (!settings.required) settings.required = true;
        
            //////////
            //Checks//
            //////////
        
            //Check if it's undefined
            if (settings.required && toCheck == undefined) return { passed: false, error: `${settings.prefix.toUpperCase()}_UNDEFINED` };
            else if (!settings.required && toCheck == undefined) return { passed: true };
        
            //Check if it matches a type
            if (settings.allowedTypes && settings.allowedTypes.length > 0) {
                let inputType = "";
        
                if (typeof toCheck == "string") inputType = "string";
                if (typeof toCheck == "boolean") inputType = "boolean";
                if (typeof toCheck == "number") inputType = "number";
                if (typeof toCheck == "bigint") inputType = "number";
                if (toCheck == null) inputType = "null";
                if (Array.isArray(toCheck)) inputType = "array";
                if (toCheck.toString() == "[object Object]") inputType = "object";
        
                if (!settings.allowedTypes.includes(inputType)) return { passed: false, error: `${settings.prefix.toUpperCase()}_WRONG_TYPE` };
            }
        
            //Length checks
            if (typeof toCheck == "string") {
                if (settings.minStringLength && toCheck.length < settings.minStringLength) return { passed: false, error: `${settings.prefix.toUpperCase()}_TOO_SHORT` };
                if (settings.maxStringLength && toCheck.length > settings.maxStringLength) return { passed: false, error: `${settings.prefix.toUpperCase()}_TOO_LONG` };
            }
        
            if (typeof toCheck == "string" && !toCheck.match(settings.matchRegex)) return { passed: false, error: `${settings.prefix.toUpperCase()}_FORMAT_INCORRECT` };
        
            return { passed: true };
        }
    }
}