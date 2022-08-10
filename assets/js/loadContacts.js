const LoadContactsIntoIndex = async(contact_list_data) => {
	const contact_list_container_html = document.getElementById("contact-list-container")

	while (contact_list_container_html.firstChild) {
        contact_list_container_html.removeChild(contact_list_container_html.firstChild);
    }

	// Loop through data from JSON file and render to HTML
	for (const contact in contact_list_data) {
		const user_contact = contact_list_data[contact]
		// ===================== Create LHS and RHS of the contact card =====================
		// LHS
		// Image
		const image = document.createElement("img")
		image.classList.add("img-fluid", "rounded-circle")
		image.style.cssText = `
			max-width: 50px; 
			max-height: 50px;
		`
		image.src = `${user_contact.profile_image}` || "https://cdn.imgbin.com/6/25/24/imgbin-user-profile-computer-icons-user-interface-mystique-aBhn3R8cmqmP4ECky4DA3V88y.jpg"
		image.alt = "Profile Image"

		const image_container = document.createElement("div")
		image_container.classList.add("flex-shrink-0")
		image_container.appendChild(image)

		// Name and Phone Number
		const name = document.createElement("small")
		name.classList.add("fs-6", "fw-semibold", "lh-1")
		name.textContent = `${user_contact.first_name} ${user_contact.last_name}`

		const break_line = document.createElement("br")

		const phone_number = document.createElement("small")
		phone_number.classList.add("fs-6", "fw-lighter", "lh-1")
		phone_number.textContent = `${user_contact.phone_number}`

		const name_phone_number_container = document.createElement("div")
		name_phone_number_container.classList.add("flex-grow-1", "ms-3", "text-truncate", "text-white")
		name_phone_number_container.style.cssText = `
			max-width: 150px;
		`
		name_phone_number_container.appendChild(name)
		name_phone_number_container.appendChild(break_line)
		name_phone_number_container.appendChild(phone_number)

		const image_name_phone_number_container = document.createElement("div")
		image_name_phone_number_container.classList.add("d-flex", "align-items-center")
		image_name_phone_number_container.style.cursor = "pointer"
		image_name_phone_number_container.appendChild(image_container)
		image_name_phone_number_container.appendChild(name_phone_number_container)

		const contact_card_link = document.createElement("a")
		contact_card_link.classList.add("py-2", "flex-grow-1", "text-decoration-none")
		contact_card_link.appendChild(image_name_phone_number_container)
		contact_card_link.addEventListener("click", function(){
			localStorage.setItem("PHONEBOOK_CONTACT_USER", JSON.stringify(user_contact))
			location.href = "/contact.html"
		})

		// RHS
		const delete_contact_button_icon = document.createElement("i")
		delete_contact_button_icon.classList.add("bi", "bi-trash3")

		const delete_contact_button = document.createElement("button")
		delete_contact_button.classList.add("btn", "btn-outline-danger", "btn-sm", "shadow-none")
		delete_contact_button.appendChild(delete_contact_button_icon)
		delete_contact_button.addEventListener("click", function(){
			localStorage.setItem("PHONEBOOK_CONTACT_USER", JSON.stringify(user_contact))
			DeleteContact()
		})

		const save_contact_link_icon = document.createElement("i")
		save_contact_link_icon.classList.add("bi", "bi-pencil-square")

		const save_contact_link = document.createElement("button")
		save_contact_link.classList.add("btn", "btn-outline-warning", "btn-sm", "shadow-none")
		save_contact_link.addEventListener("click", function(){
			localStorage.setItem("PHONEBOOK_CONTACT_USER", JSON.stringify(user_contact))
			location.href = "/save-contact.html"
		})
		save_contact_link.appendChild(save_contact_link_icon)

		const contact_card_button_container = document.createElement("div")
		contact_card_button_container.classList.add("py-2", "d-flex", "align-items-center", "gap-2")
		contact_card_button_container.appendChild(save_contact_link)
		contact_card_button_container.appendChild(delete_contact_button)

		// Create a column for the row
		const column = document.createElement("div")
		column.classList.add("col-12", "d-flex", "align-items-center", "gap-2")
		column.appendChild(contact_card_link)
		column.appendChild(contact_card_button_container)

		// Create a row div
		const row_div = document.createElement("div")
		row_div.classList.add("row", "border-bottom", "rounded", "contact-card", "mx-auto")
		row_div.style.maxWidth = "800px"
		row_div.appendChild(column)

		contact_list_container_html.appendChild(row_div)
		localStorage.removeItem("PHONEBOOK_CONTACT_USER")
	}
}