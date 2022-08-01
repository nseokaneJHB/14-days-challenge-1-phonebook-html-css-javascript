// Convert To Title Case
const ConvertToTitleCase = (str) => {
	return str.toLowerCase().split(' ').map(function(word) {
	  	return (word.charAt(0).toUpperCase() + word.slice(1));
	}).join(' ');
}

const SaveContact = (event) => {
	event.preventDefault();

	const user_contact = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACT_USER"))

	// Inputs
	const firstNameInput = document.getElementById("firstName")
	const lastNameInput = document.getElementById("lastName")
	const phoneNumberInput = document.getElementById("phoneNumber")
	const emailInput = document.getElementById("email")
	const profileImageInput = document.getElementById("profileImage")

	if (user_contact === null){
		new_contact = {
			id: new Date().getTime(),
			first_name: ConvertToTitleCase(firstNameInput.value),
			last_name: ConvertToTitleCase(lastNameInput.value),
			phone_number: phoneNumberInput.value,
			email: emailInput.value,
			profile_image: profileImageInput.value,
		}

		contact_list.push(new_contact)
		localStorage.setItem("PHONEBOOK_CONTACT_LIST", JSON.stringify(contact_list))
		return location.href = "/"
	}else{
		let existing_user = contact_list.find(contact => contact.id === user_contact.id)

		existing_user["first_name"] = firstNameInput.value,
		existing_user["last_name"] = lastNameInput.value,
		existing_user["phone_number"] = phoneNumberInput.value,
		existing_user["email"] = emailInput.value,
		existing_user["profile_image"] = profileImageInput.value,

		localStorage.setItem("PHONEBOOK_CONTACT_LIST", JSON.stringify(contact_list))
		return location.href = "/"
	}
}