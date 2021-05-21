import bcrypt from 'bcryptjs'
const data = {
    users: [
        {

            name: 'Ashutosh',
            email: "admin@example.com",
            password: bcrypt.hashSync('1234', 8),
        },
        {
            name: 'Akash',
            email: "user@example.com",
            password: bcrypt.hashSync('1234', 8),
        },
    ],
    task: [
        {
            user: "60a5f40e86f34121a81a7666",
            taskName: "Task 1"
        },
        {
            user: "60a5f40e86f34121a81a7666",
            taskName: "Task 1"
        },
        {
            user: "60a5f40e86f34121a81a7666",
            taskName: "Task 1"
        },
        {
            user: "60a5f40e86f34121a81a7667",
            taskName: "Task 4"
        },
        {
            user: "60a5f40e86f34121a81a7667",
            taskName: "Task 5"
        },
        {
            user: "60a5f40e86f34121a81a7667",
            taskName: "Task 6"
        },
        
]
}
export default data;