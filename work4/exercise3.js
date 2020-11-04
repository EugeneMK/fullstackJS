// const john = {
//     name: "John",
//     lastName: "Smith",
//     position: "Senior engineer",
//     startDate: "10.10.1990",
//     endDate: "10.10.2000",
//     baseSalary: "10000",
//     salaryCurrency: "$",
//     location: "Russia",
//     department: "IT",
//     phoneNumber: "+1234567890",
//     eat: function () {},
//     sleep: function () {},
//     callFriend: function () {},
//     writeReport: function () {},
//     organizeMeeting: function () {},
//     retire: function () {},
//     startVacation: function () {}
// };

const human = {
    name: "John",
    lastName: "Smith",
    location: "Russia",
    phoneNumber: "+1234567890",
    eat: function () {},
    sleep: function () {},
    callFriend: function () {}
};

const employee = {
    position: "Senior engineer",
    baseSalary: "10000",
    salaryCurrency: "$",
    department: "IT",
    writeReport: function () {},
    organizeMeeting: function () {}
};

Object.setPrototypeOf(employee, human);

const currentEmployee = {
    startDate: "10.10.1990",
    startVacation: function () {},
    retire: function () {}
};

Object.setPrototypeOf(currentEmployee, employee);

const formerEmployee = {
    endDate: "10.10.2000"
};

Object.setPrototypeOf(formerEmployee, employee);
