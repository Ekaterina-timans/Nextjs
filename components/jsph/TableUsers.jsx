import { useEffect, useState } from "react";
import styles from "../jsph/UserTable.module.css";

export default function TableUsers(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Ошибка при получении данных');
            }
            return response.json();
          })
          .then((data) => {
            setUsers(data);
          })
          .catch((error) => {
            console.error('Ошибка при получении данных:', error);
          });
      }, []);

      return (
        <table className={styles.tableUser}>
          <thead className={styles.heading}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
};
    
