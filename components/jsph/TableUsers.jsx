import { useEffect, useState } from "react";
import styles from "../jsph/UserTable.module.css";

export default function TableUsers(){
    const [users, setUsers] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterText, setFilterText] = useState('');  
    
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

      const sorting = (column) => {
        if (sortColumn === column) {
          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
          setSortColumn(column);
          setSortDirection('asc');
        }
      };
      
      const sortedUsers = [...users];

      const getValue = (obj, path) => {
        const parts = path.split('.');
        let value = obj;
        for (const part of parts) {
          value = value[part];
        }
        return value;
      };

      if (sortColumn) {
        sortedUsers.sort((a, b) => {
          const aValue = getValue(a, sortColumn);
          const bValue = getValue(b, sortColumn);
          const compareResult = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });

          return sortDirection === 'asc' ? compareResult : -compareResult;
        });
      }

      const deleteUser = (userId) => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
      };

      const filterTextChange = (event) => {
        setFilterText(event.target.value);
      };

      const filteredUsers = filterText === '' ? sortedUsers : sortedUsers.filter(user =>
        user.name.toLowerCase().includes(filterText.toLowerCase()) ||
        user.email.toLowerCase().includes(filterText.toLowerCase()) ||
        user.address.city.toLowerCase().includes(filterText.toLowerCase()) ||
        user.phone.toLowerCase().includes(filterText.toLowerCase()) ||
        user.website.toLowerCase().includes(filterText.toLowerCase()) ||
        user.company.name.toLowerCase().includes(filterText.toLowerCase())
      );

      return (
        <div>
          <input type="text" value={filterText} onChange={filterTextChange} placeholder="Search..."/>
          <table className={styles.tableUser}>
            <thead className={styles.heading}>
              <tr>
                <th onClick={() => sorting('name')}>Name</th>
                <th onClick={() => sorting('email')}>Email</th>
                <th onClick={() => sorting('address.city')}>City</th>
                <th onClick={() => sorting('phone')}>Phone</th>
                <th onClick={() => sorting('website')}>Website</th>
                <th onClick={() => sorting('company.name')}>Company</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                  <td>{user.company.name}</td>
                  <td><button className={styles.btn} onClick={() => deleteUser(user.id)}>X</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};
    
