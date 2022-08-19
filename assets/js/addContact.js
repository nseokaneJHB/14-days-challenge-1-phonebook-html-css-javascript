const ConvertToTitleCase = (str) => {
	return str.toLowerCase().split(" ").map(function(word) {
	  	return (word.charAt(0).toUpperCase() + word.slice(1));
	}).join(" ");
}

const AddContact = (event) => {
	event.preventDefault();

	let contacts = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACTS"));

	const formData = new FormData(event.target);
	let contact = Object.fromEntries(formData);

	contact["full_name"] = ConvertToTitleCase(contact.full_name);

	contact = {
		id: new Date().getTime(),
		...contact
	};
	contacts = [
		...contacts,
		contact
	];
	localStorage.setItem("PHONEBOOK_CONTACTS", JSON.stringify(contacts));
	location.href = "/";
}