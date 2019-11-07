class UserProfile {
    constructor(transaction, name, phoneNumber, email, property, price, duration, morgageChoice, location) {
        this.transaction = transaction;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.property = property;
        this.price = price;
        this.location = location;
        this.duration = duration;
        this.morgageChoice = morgageChoice;
    }
}

module.exports.UserProfile = UserProfile;
