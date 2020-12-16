const listToHtml = (list) => {
	const ul = document.createElement('ul');
	
	list.forEach(element => {
		if (typeof element === 'string' || element instanceof String) {
			const li = document.createElement('li');
			li.textContent = element;
			ul.append(li);
		}
		if (Array.isArray(element)) {
			ul.append(listToHtml(element));
		}
	});
	
	return ul;
};

const nestedList = ["Item", ["Item2", ["Item3"]]];
listToHtml(nestedList);