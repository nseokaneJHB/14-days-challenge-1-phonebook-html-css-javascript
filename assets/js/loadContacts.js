let contacts = JSON.parse(localStorage.getItem("PHONEBOOK_CONTACTS")) || localStorage.setItem("PHONEBOOK_CONTACTS", JSON.stringify([]))

const SearchContact = (event) => {
	let search_input = event.target.value
	if (search_input.trim() === "") return LoadContacts(contacts)
	let new_list = contacts.filter(contact => contact.full_name.toLowerCase().includes(search_input.toLowerCase().trim()));
	LoadContacts(new_list);
}

const ViewContact = (id) => {
	localStorage.setItem("PHONEBOOK_CONTACT_ID", JSON.stringify(id));
	location.href = "/view.html";
}

const DeleteContact = (id) => {
	contacts = contacts.filter(contact => contact.id !== id);
	localStorage.setItem("PHONEBOOK_CONTACTS", JSON.stringify(contacts));
	location.reload();
}

const LoadContacts = (contacts_list) => {
	const contactContainer = document.getElementById("contacts_list_container");
	contactContainer.innerHTML ="";

    contacts_list.forEach(contact => {
		const { id, full_name, phone_number, image_url } = contact;
		image = image_url || "https://cdn.imgbin.com/6/25/24/imgbin-user-profile-computer-icons-user-interface-mystique-aBhn3R8cmqmP4ECky4DA3V88y.jpg";

        contactContainer.innerHTML += `
			<div class="card mb-3">
				<div class="card-body row">
					<div class="col-8 text-decoration-none" onclick="return ViewContact(${id})">
						<div class="d-flex align-items-center">
							<div class="flex-shrink-0">
								<img class="img-fluid rounded-circle" src="${image}" alt="Profile Image Of ${full_name}" style="max-width: 50px; max-height: 50px">
							</div>
							<div class="flex-grow-1 ms-3">
								<small>${full_name}</small>
								<br>
								<small>${phone_number}</small>
							</div>
						</div>
					</div>
					<div class="col-4 d-flex justify-content-between align-items-center">
						<button class="btn btn-sm btn-outline-warning" onclick="return ViewContact(${id})">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
								<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
								<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
							</svg>
						</button>
						<button class="btn btn-sm btn-outline-danger" onclick="return DeleteContact(${id})">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
								<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
								<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		`;
	})
}

window.onload = () => {
	localStorage.removeItem("PHONEBOOK_CONTACT_ID");
	LoadContacts(contacts);
};