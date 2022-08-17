let contact_id = JSON.parse(localStorage.getItem("CONTACT_ID"));
let contacts = JSON.parse(localStorage.getItem("CONTACTS"));
let contact = contacts.find(contact => contact.id === parseInt(contact_id));

const ConvertToTitleCase = (str) => {
	return str.toLowerCase().split(" ").map(function(word) {
	  	return (word.charAt(0).toUpperCase() + word.slice(1));
	}).join(" ");
}

const updateContact = (event) => {
	const formData = new FormData(event.target);
	let contact_form_data = Object.fromEntries(formData);

	event.preventDefault();
	
	contact_form_data["full_name"] = ConvertToTitleCase(contact_form_data.full_name);

	contact = {
		...contact,
		...contact_form_data
	};

	contacts = contacts.filter(contact => contact.id !== parseInt(contact_id));
	contacts = [
		...contacts,
		contact
	];

	localStorage.setItem("CONTACTS", JSON.stringify(contacts));
	location.href = "/";
}

window.addEventListener("load", () => {
	let full_name_input = document.getElementById("full_name");
	let phone_number_input = document.getElementById("phone_number");
	let email_address_input = document.getElementById("email_address");
	let image_url_input = document.getElementById("image_url");

	let profile_image_src = document.getElementById("profile_image_src");
	let profile_image = document.getElementById("profile_image");
	let profile_image_caption = document.getElementById("profile_image_caption");

	full_name_input.value = contact.full_name;
	phone_number_input.value = contact.phone_number;
	email_address_input.value = contact.email_address;
	image_url_input.value = contact.image_url;

	if (profile_image instanceof HTMLImageElement) {
		profile_image_src.srcset = contact.image_url || "https://cdn.imgbin.com/6/25/24/imgbin-user-profile-computer-icons-user-interface-mystique-aBhn3R8cmqmP4ECky4DA3V88y.jpg"
		profile_image.alt = `Picture of ${contact.full_name}`
	}

	if (contact.full_name.trim() !== ""){
		profile_image_caption.innerHTML = `${contact.full_name}`
	}
});