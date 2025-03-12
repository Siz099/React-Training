const UserRow = ({row}) => {
    return (
        <tr row={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.age}</td>
        </tr>
    );
};

export default UserRow;