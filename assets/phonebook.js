// Load JSON File Function
const GetContactsData = async(file) => {
	const contacts = await fetch(file).then(res => res.json())
	return localStorage.setItem("PHONEBOOK_CONTACT_LIST", JSON.stringify(contacts.contacts))
}

// Load JSON File Function
let contact_list = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACT_LIST"))

const BackHome = async() => {
	localStorage.removeItem("PHONEBOOK_CONTACT_USER")
	location.href = "index.html"
}

const LoadSingleContact = async() => {
	const user_contact = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACT_USER"))

	const firstNameText = document.getElementById("firstNameText")
	const lastNameText = document.getElementById("lastNameText")
	const phoneNumberText = document.getElementById("phoneNumberText")
	const emailText = document.getElementById("emailText")
	const profileImageView = document.getElementById("profileImageView")
	const fullNameCaption = document.getElementById("fullNameCaption")

	firstNameText.value = user_contact.first_name
	lastNameText.value = user_contact.last_name
	phoneNumberText.value = user_contact.phone_number
	emailText.value = user_contact.email
	profileImageView.src = user_contact.profile_image

	fullNameCaption.innerHTML = `${user_contact.first_name} ${user_contact.last_name}`
}

const DeleteContact = async() => {
	const contact = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACT_USER"))
	const contact_list = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACT_LIST"))
	let new_list = contact_list.filter(user => user.id !== contact.id);
	localStorage.setItem("PHONEBOOK_CONTACT_LIST", JSON.stringify(new_list))
	if (location.pathname === "/index.html") {
		location.reload()
	}else{
		location.href = "/index.html"
	}
}

const SearchContact = () => {
	const search_input = document.getElementById("searchText")
	if (search_input.value.trim() === "") return LoadContactsIntoIndex(contact_list)
	let new_list = contact_list.filter((contact) => (
		contact.first_name.toLowerCase().includes(search_input.value.toLowerCase().trim()) || contact.last_name.toLowerCase().includes(search_input.value.toLowerCase().trim())
	))
	LoadContactsIntoIndex(new_list)
}

window.onload = () => {
	GetContactsData("assets/data.json")

	if (location.pathname === "/index.html") {
		LoadContactsIntoIndex(contact_list)
	}
	if (location.pathname === "/contact.html") {
		LoadSingleContact()
	}
	if (location.pathname === "/save-contact.html"){
		const user_contact = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACT_USER"))
		UpdateContact(user_contact)
	}
};