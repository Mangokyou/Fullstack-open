const searchForm = ({country, onChange}) => {
    return (
        <div>
            find countries: <input name="name" onChange={onChange} />
        </div>
    )
}

export default searchForm