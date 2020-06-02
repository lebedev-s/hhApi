import React, { useState } from "react"
import { InputText } from "primereact/inputtext"
import { InputNumber } from "primereact/inputnumber"
import { Button } from "primereact/button"
import "./styles.css"

const EditForm = ({ onCancel, onSubmit, initialData }) => {

  const [name, setName] = useState(initialData.data.name || "")
  const [comment, setComment] = useState(initialData.data.comment || "")
  const [square, setSquare] = useState(initialData.data.square || null)

  // собирает данные из инпутов и прокидывает их наверх
  const handleSubmit = (event) => {
    // не отображались изменения
    event.preventDefault()
    onSubmit({
      name: name,
      comment: comment,
      square: square,
    })
    onCancel()
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-box">
        <label>Название</label>
        <InputText 
        type="text" 
        value={name} 
        onChange={(event) => setName(event.target.value)} 
        />
      </div>
      <div className="input-box">
        <label>Комментарий</label>
        <InputText 
        type="text"
        value={comment} 
        onChange={(event) => setComment(event.target.value)} 
        />
      </div>
      <div className="input-box">
        <label>Площадь</label>
        <InputNumber 
        type="text" 
        value={square} 
        onChange={(event) => setSquare(event.target.value)} />
      </div>
      <div className="button-group">
        <Button label="Сохранить" className="p-button-success" type="submit" />
        <Button label="Отменить" className="p-button-warning" 
        // перезагружалась страница
        onClick={(event) => {
            event.preventDefault()
            onCancel()
          }} />
      </div>
    </form>
  );
};

export default EditForm
