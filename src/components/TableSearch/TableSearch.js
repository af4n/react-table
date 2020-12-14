import React, {useState} from 'react'

export default props => {

  const [value, setValue] = useState('')

  const valueChangeHandler = event => {
    setValue(event.target.value)
  }

  return (
    <div className="input-group mb-4 mt-4">
      <input type="text"
             className="form-control"
             value={value}
             onChange={valueChangeHandler}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary"
                onClick={() => props.onSearch(value)}
        >Поиск</button>
      </div>
    </div>
  )
}