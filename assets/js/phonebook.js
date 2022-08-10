const base_path_regex = /^\/$/i

window.onload = () => {
	if (location.pathname.match(base_path_regex) || location.pathname === "/index.html") {
		LoadContactsIntoIndex(contact_list)
	}
	if (location.pathname === "/contact.html") {
		LoadSingleContact()
	}
	if (location.pathname === "/save-contact.html"){
		LoadSingleContact()
	}
}

// Load JSON File Function
let contact_list = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACT_LIST")) || []

const BackHome = async() => {
	localStorage.removeItem("PHONEBOOK_CONTACT_USER")
	location.href = "/"
}

const LoadSingleContact = async() => {
	const user_contact = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACT_USER"))

	if (user_contact === null) return

	let fullNameCaption = document.getElementById("fullNameCaption")
	let firstName = document.getElementById("firstName")
	let lastName = document.getElementById("lastName")
	let phoneNumber = document.getElementById("phoneNumber")
	let email = document.getElementById("email")
	let profileImageSource = document.getElementById("profileImageSource")
	let profileImage = document.getElementById("profileImage")

	firstName.value = user_contact.first_name
	lastName.value = user_contact.last_name
	phoneNumber.value = user_contact.phone_number
	email.value = user_contact.email

	if (profileImage instanceof HTMLInputElement) {
		profileImage.value = user_contact.profile_image
	}

	if (profileImage instanceof HTMLImageElement) {
		profileImageSource.srcset = user_contact.profile_image || "https://cdn.imgbin.com/6/25/24/imgbin-user-profile-computer-icons-user-interface-mystique-aBhn3R8cmqmP4ECky4DA3V88y.jpg"
		profileImage.alt = `Picture of ${user_contact.first_name} ${user_contact.last_name}`
	}

	if (fullNameCaption !== null){
		fullNameCaption.innerHTML = `${user_contact.first_name} ${user_contact.last_name}`
	}
}

const DeleteContact = async() => {
	const contact = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACT_USER"))
	const contact_list = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACT_LIST"))
	let new_list = contact_list.filter(user => user.id !== contact.id);
	localStorage.setItem("PHONEBOOK_CONTACT_LIST", JSON.stringify(new_list))
	if (location.pathname.match(base_path_regex) || location.pathname === "/index.html") {
		location.reload()
	}else{
		location.href = "/"
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