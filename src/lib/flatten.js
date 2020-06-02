/*
Функция для перебора элементов со всех уровней вложенности и добавления их в линейный массив.
При этом новые элементы массива создаются с необходимой для вывода в таблицу структурой "name-id-comment-square"
*/ 


const flatten = (data) => {
  const dataSet = [];

  const innerFlatten = (value) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        innerFlatten(item);
      });
    } else {
      if (value.areas.length === 0) {
        dataSet.push({
          name: value.name,
          id: value.id,
          comment: "",
          square: null,
        });
      } else {
        dataSet.push({
          name: value.name,
          id: value.id,
          comment: "",
          square: null,
        });
        innerFlatten(value.areas);
      }
    }
  };

  innerFlatten(data);

  return dataSet;
};

export default flatten;
