let contacts = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACTS"));
let contact_id = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACT_ID"));
let contact = contacts.find(contact => contact.id === parseInt(contact_id));

const ConvertToTitleCase = (str) => {
	return str.toLowerCase().split(" ").map(function(word) {
	  	return (word.charAt(0).toUpperCase() + word.slice(1));
	}).join(" ");
}

const UpdateContact = (event) => {
	contacts = contacts.filter(contact => contact.id !== parseInt(contact_id))
	event.preventDefault();
	const formData = new FormData(event.target);
	let contact_form_data = Object.fromEntries(formData);

	contact_form_data["full_name"] = ConvertToTitleCase(contact_form_data.full_name);

	contact = {
		...contact,
		...contact_form_data
	};

	contacts = [
		...contacts,
		contact
	];
	localStorage.setItem("PHONEBOOK_CONTACTS", JSON.stringify(contacts));
	location.href = "/";
}

const DeleteContact = () => {
	contacts = contacts.filter(contact => contact.id !== contact_id);
	localStorage.setItem("PHONEBOOK_CONTACTS", JSON.stringify(contacts));
	location.href = "/";
}

window.onload = () => {
	const { full_name, phone_number, email_address, image_url } = contact;

	let profile_image_src = document.getElementById("profile_image_src");
	let profile_image = document.getElementById("profile_image");
	let profile_image_caption = document.getElementById("profile_image_caption");

	profile_image_src.srcset = image_url || "https://cdn.imgbin.com/6/25/24/imgbin-user-profile-computer-icons-user-interface-mystique-aBhn3R8cmqmP4ECky4DA3V88y.jpg"
	profile_image.alt = `Profile Image Of ${full_name}`
	profile_image_caption.innerHTML = `${full_name}`

	let full_name_inputs = document.getElementById("full_name");
	let phone_number_inputs = document.getElementById("phone_number");
	let email_address_inputs = document.getElementById("email_address");
	let image_url_inputs = document.getElementById("image_url");

	full_name_inputs.value = full_name
	phone_number_inputs.value = phone_number
	email_address_inputs.value = email_address
	image_url_inputs.value = image_url
}