

const PersonList = ({persons, onClick}) => {
    return (
        <div>
            {persons.map((person) => (
            <div key={person.id}>
                 {person.name} - {person.number}
                <button value={person.id} name={person.name} onClick={onClick}>delete</button>
            </div>
            ))}
        </div>
    )

}

export default PersonList