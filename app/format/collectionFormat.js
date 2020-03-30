'use strict';

function standardFormatCollection (collection) {
    let childs = [];

    for (let child of collection.childs) {
        childs.push({
            id: child.id,
            title: child.title,
            handle: child.handle,
        });
    }

    return {
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
        childs: childs
    }
}

module.exports = {
    standardFormatCollection
}
