const Filter = ({onChange, newFilter}) => {
    return (
        <div>
            filter shown with: <input value={newFilter} onChange={onChange} />
        </div>
    )

}

export default Filter