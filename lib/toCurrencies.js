'use strict';

const rounding = require('./rounding');

/**
 * Converts scrap into a currencies object
 * @since 1.0.0
 * @param {number} value Value in scrap
 * @param {number} conversion The refined value of keys
 * @return {Object} Returns a new instance of Currencies
 * @throws Will throw an error if missing key conversion rate
 */
module.exports = function (value, conversion) {
    if (conversion === undefined) {
        // If the conversion rate is missing, convert the value into refined
        const metal = this.toRefined(value);

        const currencies = new this({ metal });
        return currencies;
    }

    // Convert conversion rate into scrap
    conversion = this.toScrap(conversion);

    // Get the highest amount of keys from the given value
    const keys = rounding(value / conversion);
    // Find the value that is remaining
    const left = value - keys * conversion;
    // Convert the missing value to refined
    const metal = this.toRefined(left);

    // Create new instance of Currencies
    const currencies = new this({ keys, metal });
    return currencies;
};
