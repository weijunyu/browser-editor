import Vue from 'vue';

export {
    EventBus,
    sortObject
}

const EventBus = new Vue();

function sortObject(obj) {
    let sortedObj = {};
    let sortedKeys = Object.keys(obj).sort();
    for (let key of sortedKeys) {
        sortedObj[key] = obj[key];
    }
    return sortedObj;
}