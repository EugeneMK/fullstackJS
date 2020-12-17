const parseTemplate = (htmlElement, obj) => {
    [...htmlElement.children].forEach(elem => {
        const dataField = elem.dataset.field;
        if (dataField) {
            if (obj[dataField]) {
                elem.textContent = obj[dataField];
            } else {
                throw new Error(`No content for "${dataField}" field.`);
            }
        }
        if (elem.children.length > 0) {
            parseTemplate(elem, obj);
        }
    });
};

const div = document.createElement('div');
const h1 = document.createElement('h1');
const p = document.createElement('p');
h1.dataset.field = 'header';
p.dataset.field = 'text';
div.append(h1);
div.append(p);
document.append(div);

const dataObj = {
    header: 'Some header',
    text: 'Some text'
};

parseTemplate(div, dataObj);
