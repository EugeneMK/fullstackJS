const parseTemplate = (htmlElement, obj) => {
    htmlElement.children.forEach(elem => {
        const dataField = elem.dataset.field;
        if (dataField) {
            if (obj[dataField]) {
                elem.textContent = obj[dataField];
            } else {
                throw new Error(`No text for ${dataField}.`);
            }
        }
        if (elem.children.length > 0) {
            parseTemplate(elem, obj);
        }
    });
};