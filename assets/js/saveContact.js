const ConvertToTitleCase = (str) => {
	return str.toLowerCase().split(" ").map(function(word) {
	  	return (word.charAt(0).toUpperCase() + word.slice(1));
	}).join(" ");
}

const saveNewContacts = (event) => {
	let contacts = JSON.parse(localStorage.getItem("CONTACTS"));
	const formData = new FormData(event.target);
	let contact = Object.fromEntries(formData);

	event.preventDefault();
	contact["full_name"] = ConvertToTitleCase(contact.full_name);
	contact = {
		id: new Date().getTime(),
		...contact
	}
	contacts = [
		...contacts,
		contact
	];
	localStorage.setItem("CONTACTS", JSON.stringify(contacts));
	location.href = "/";
}