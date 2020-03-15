'use strict';

let getData = function (data, key) {
    try {
        return key.split('.').reduce((data ,i) => data[i], data);
    } catch (error) {
        return null;
    }
}

module.exports = async function (data, ruleData) {
    let errors = {};

    for (let field in ruleData) {
        let dataOfThisField = getData(data, field) || '';
        let rulesOfThisField = ruleData[field];
        let rules = [], messages = {};

        if (typeof rulesOfThisField == 'object' && rulesOfThisField.hasOwnProperty('rules')) {
            rules = rulesOfThisField.rules || [];
            messages = rulesOfThisField.messages || {};
        } else {
            rules = rulesOfThisField;
        }

        if (typeof rules == 'string') {
            rules = rules.split('|').map(rule => rule.trim());
        } else if (typeof rules == 'function') {
            rules = [rules];
        }

        for (let ruleIndex in rules) {
            let rule = rules[ruleIndex];
            let ruleName = 'custom';
            let ruleParams = [field, dataOfThisField];

            if (typeof rule == 'string') {
                if (!rule.includes(':')) {
                    ruleName = rule;
                } else {
                    let ruleSegments = rule.split(':').map(segment => segment.trim());
                    ruleName = ruleSegments[0];
                    ruleParams = ruleParams.concat(ruleSegments[1].split(',').map(param => param.trim()));
                }

                rules[ruleIndex] = require(`./rules/${ruleName}`);
            }

            let ruleHandle = rules[ruleIndex];
            let ruleHandleResult = ruleHandle.apply(this, ruleParams);
            if ((await ruleHandleResult.isPass()) == false) {
                if (ruleHandleResult.hasOwnProperty('getRuleName') && typeof ruleHandleResult.getRuleName == 'function') {
                    ruleName = ruleHandleResult.getRuleName();
                }
                let message = messages[ruleName] || '';

                if (!message) {
                    message = ruleHandleResult.getErrorMessage();
                }

                if (errors[field] === undefined) {
                    errors[field] = {};
                }

                if (errors[field][ruleName] === undefined) {
                    errors[field][ruleName] = message;
                }
            }
        }
    }

    return {
        isPass () {
            return Object.keys(errors).length == 0;
        },

        getFirstErrorMessage () {
            for (let field in errors) {
                for (let ruleError in errors[field]) {
                    return errors[field][ruleError];
                }
            }
        },

        getErrors () {
            return errors;
        },
    }
}
