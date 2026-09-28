var http = require("http");

//TODO - Use Employee Module here
const employees = require("./Employee");

console.log("Lab 03 -  NodeJs");

//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(405, {
            'Content-Type': 'application/json',
            'Allow': 'GET'
        });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    } else {
        if (req.url === '/') {
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.setHeader("Content-Type", "text/html");
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
            return;
        }

        if (req.url === '/employee') {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(employees));
            return;
        }

        if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array

            const names = employees
                .map(employee => `${employee.firstName} ${employee.lastName}`)
                .sort();

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(names));
            return;
        }

        if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format
            //e.g. { "total_salary" : 100 }

            const totalSalary = employees.reduce(
                (total, employee) => total + employee.Salary,
                0
            );

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ total_salary: totalSalary }));
            return;
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})