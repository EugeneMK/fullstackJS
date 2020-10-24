const human = Object.create({}, {
    firstName: {
        writable: true
    },
    lastName: {
        writable: true
    },
    dateOfBirth: {
        set: function (value) {
            this.age = new Date().getYear() - new Date(value).getYear()
        }
    },
    fullName: {
        get: function () {
            return (this.firstName + ' ' + this.lastName);
        }
    },
});

human.firstName = 'Ivan';
human.lastName = 'Bom';
human.dateOfBirth = '1981.12.28';