const human = Object.create({}, {
    firstName: {
        writable: true
    },
    lastName: {
        writable: true
    },
    dateOfBirth: {
        set: function (birthDate) {
            this.age = new Date().getYear() - new Date(birthDate).getYear()
        }
    },
    fullName: {
        get: function () {
            return (this.firstName + ' ' + this.lastName);
        },
        set: function (name) {
            [this.firstName, this.lastName] = name.split(' ')
        }
    },
});

human.firstName = 'Ivan';
human.lastName = 'Bom';
human.dateOfBirth = '1981.12.28';