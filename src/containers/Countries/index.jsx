import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { store } from "../../index"
import localforage from "localforage"

import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Dialog } from "primereact/dialog"

import EditForm from "../../components/EditForm"
import { fetchData, editItem, loadFromDB } from "./actions"
import { makeSelectCountries, makeSelectCountriesLoading, makeSelectCountriesError } from "./selectors"

const Countries = () => {

  const [visible, setVisible] = useState(false)
  // при двойном клике на строку приходит объект event с полями index (порядковый номер во flatten-массиве) и data {name, id}
  const [toEditData, setToEditData] = useState({
    idx: null,
    data: null,
  })

  const dispatch = useDispatch()
  const countries = useSelector(makeSelectCountries())
  const loading = useSelector(makeSelectCountriesLoading())
  const error = useSelector(makeSelectCountriesError())

  useEffect(() => {
    localforage.length()
      .then(length => {
        if (length === 0) {
          dispatch(fetchData())
        } else {
          dispatch(loadFromDB())
        }
      })
      .catch(error => console.log(error))
  }, [])



  const handleDoubleClick = (event) => {
    setToEditData({
      idx: event.index,
      data: event.data,
    })
    setVisible(true)
  }

  const handleSubmit = (editedData) => {
    dispatch(editItem({ idx: toEditData.idx, data: editedData }))
  }

  store.subscribe(() => {
    localforage.setItem('areas', store.getState().countries.data)
  })

  return (
    <div>
      <DataTable value={countries} paginator rows={10} onRowDoubleClick={handleDoubleClick}>
        <Column field="name" header="Название" sortable filter filterPlaceholder="Поиск по названию" />
        <Column field="comment" header="Комментарий" sortable filter filterPlaceholder="Поиск по комментарию" />
        <Column field="square" header="Площадь" sortable filter filterPlaceholder="Поиск по площади" />
      </DataTable>
      <Dialog
        header="Редактировать"
        visible={visible}
        style={{ width: "400px" }}
        modal={true}
        onHide={() => setVisible(false)}
      >
        <EditForm
          initialData={toEditData}
          onSubmit={(editedData) => handleSubmit(editedData)}
          onCancel={() => setVisible(false)}
        />
      </Dialog>
    </div>
  );
};

export default Countries
