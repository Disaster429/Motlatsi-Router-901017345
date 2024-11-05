import React, { useEffect, useState } from 'react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);
    const [editUsername, setEditUsername] = useState('');

    useEffect(() => {
        const localUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(localUsers);
    }, []);

    const loadUsers = () => {
        const localUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(localUsers);
    }

    const editUser = (index) => {
        setSelectedUserIndex(index);
        setEditUsername(users[index].username);
    }

    const updateUser = () => {
        if (editUsername) {
            users[selectedUserIndex].username = editUsername;
            localStorage.setItem('users', JSON.stringify(users));
            loadUsers();
            setSelectedUserIndex(null);
        }
    }

    const deleteUser = (index) => {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    }

    return (
        <section>
            <h2>User Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>
                                <button onClick={() => editUser(index)}>Edit</button>
                                <button onClick={() => deleteUser(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedUserIndex !== null && (
                <div>
                    <h3>Edit User</h3>
                    <input
                        type="text"
                        value={editUsername}
                        onChange={e => setEditUsername(e.target.value)}
                    />
                    <button onClick={updateUser}>Update User</button>
                </div>
            )}
        </section>
    );
}

export default UserManagement;