var register = (Handlebars) => {
    var helpers = {
        ifCondi : (v1, operator, v2, options) => {
            switch(operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        }
    }

    if (Handlebars && typeof Handlebars.registerHelper === 'function') {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }
}

module.exports.register = register;
module.exports.helpers = register(null);