const listToHtml = (list) => {
	const ul = document.createElement('ul');
	
	list.forEach(element => {
		if (typeof element === 'string' || element instanceof String) {
			const li = document.createElement('li');
			li.textContent = element;
			ul.append(li);
		}
		if (Array.isArray(element)) {
			const nestedUl = listToHtml(element);
			if (ul.children.length > 0) {
				ul.lastElementChild.append(nestedUl);
			} else {
				const li = document.createElement('li');
				ul.append(li);
				li.append(nestedUl);
			}
		}
	});
	document.body.append(ul);
	return ul;
};

const nestedList = ["Item", ["Item2", ["Item3"]]];
listToHtml(nestedList);
