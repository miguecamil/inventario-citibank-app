function SearchBar({ value, onChange, placeholder }) {

  return (

    <div className="input-group mb-3" >

      <span className="input-group-text">
        <i className="bi bi-search"></i>
      </span>

      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

    </div>

  );

}

export default SearchBar;