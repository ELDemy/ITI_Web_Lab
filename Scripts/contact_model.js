// contact_model.js
export class Contact {
    constructor(name, phone, email, gender, image) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.image = image;
    }
}

export let contacts = [
    new Contact(
        "Mona Abdo",
        "0123456789",
        "mona@example.com",
        "Female",
        "Images/woman_avatar.png"
    ),
    new Contact(
        "Ahmed Ali",
        "0987654321",
        "ahmed@example.com",
        "Male",
        "Images/man_avatar.png"
    ),
];