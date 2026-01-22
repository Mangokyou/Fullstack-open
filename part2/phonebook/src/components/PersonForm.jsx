const PersonForm = ({newEntry, onChange, addEntry}) => {
    return (
        <div>
        <form onSubmit={addEntry}>
            <div>
                name: <input name="name" value={newEntry.name} onChange={onChange} />
            </div>
            <div> 
                number: <input name="number" value={newEntry.number} onChange={onChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        </div>
    )
}


export default PersonForm