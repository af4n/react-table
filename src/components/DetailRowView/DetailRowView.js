import React from 'react'

export default ({person}) => (
  <div>
    <button
      type="button"
      className="close"
    ><span aria-hidden="true">&times;</span></button>
    <p>Выбран пользователь: <b>{person.firstName + ' ' + person.lastName}</b></p>
    <p>
      Описание: <br/>
      <textarea defaultValue={person.description} cols="40" rows="6" />
    </p>
    <p>Индекс: <b>{person.address.zip}</b></p>
    <p>Провинция/штат: <b>{person.address.state}</b></p>
    <p>Город: <b>{person.address.city}</b></p>
    <p>Адрес проживания: <b>{person.address.streetAddress}</b></p>
  </div>
)