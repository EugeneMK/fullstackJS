const employees = [
    {
     firstName: 'Alex',
     lastName: 'Smith',
     age: 54,
     salary: 10000,
     position: 'Architect'
    },
    {
     firstName: 'Gustav',
     lastName: 'Andersen',
     age: 31,
     salary: 5000,
     position: 'Software engineer'
    },
    {
     firstName: 'Liz',
     lastName: 'Taylor',
     age: 20,
     salary: 7000,
     position: 'Manager'
    }
];

const averageSalary = (employees) => {
    const sumSalary = employees.reduce((sum, person) => sum + person.salary, 0);
    return sumSalary/employees.length;
};

const sortBySalary = (employees) => employees.sort((person1, person2) => person1.salary - person2.salary);

const filterBySalaryAndAge = (employees, minSalary, minAge) => employees.filter(
    person => person.salary > minSalary & person.age > minAge
);

averageSalary(employees);
sortBySalary(employees);
filterBySalaryAndAge(employees, 4500, 25);