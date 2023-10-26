const users = [
    {id: 1, name: "test"},
    {id: 2, name: "toto"}
]

exports.addUser = (name) => {
    users.push({
        id: users.length + 1,
        name // or name: name
    })
}

exports.getAll = () => {
    return users;
}

// We assume that name should be unique here
exports.findByName = (name) => {
    return users.find(o => o.name === name)
}