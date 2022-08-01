const user_contact = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACT_USER"))
const contact_list = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACT_LIST"))

// Inputs
const firstNameInput = document.getElementById("firstName")
const lastNameInput = document.getElementById("lastName")
const phoneNumberInput = document.getElementById("phoneNumber")
const emailInput = document.getElementById("email")
const profileImageInput = document.getElementById("profileImage")

const SaveContact = (event) => {
	event.preventDefault();

	if (user_contact === null){
		new_contact = {
			id: new Date().getTime(),
			first_name: firstNameInput.value,
			last_name: lastNameInput.value,
			phone_number: phoneNumberInput.value,
			email: emailInput.value,
			profile_image: profileImageInput.value,
		}

		contact_list.push(new_contact)
		localStorage.setItem("PHONEBOOK_CONTACT_LIST", JSON.stringify(contact_list))
		return location.href = "/index.html"
	}else{
		let existing_user = contact_list.find(contact => contact.id === user_contact.id);

		existing_user["first_name"] = firstNameInput.value,
		existing_user["last_name"] = lastNameInput.value,
		existing_user["phone_number"] = phoneNumberInput.value,
		existing_user["email"] = emailInput.value,
		existing_user["profile_image"] = profileImageInput.value,

		localStorage.setItem("PHONEBOOK_CONTACT_LIST", JSON.stringify(contact_list))
		return location.href = "/index.html"
	}
}

const UpdateContact = (user_contact) => {
	if (user_contact === null) return
	id = user_contact.id
	firstNameInput.value = user_contact.first_name
	lastNameInput.value = user_contact.last_name
	phoneNumberInput.value = user_contact.phone_number
	emailInput.value = user_contact.email
	profileImageInput.value = user_contact.profile_image
}