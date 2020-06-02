import { createSelector } from "reselect"
import { initialState } from "./reducer"

// селекторы нужны чтобы брать данные из store и прокидывать их внутрь контейнера как пропсы
// также селекторы улучшают быстродействие благодаря кэшированию данных в себе. 

// countries - редюсер из комбайн редюсера
const selectCountries = (state) => state.countries || initialState 

const makeSelectCountries = () =>
  createSelector(selectCountries, (countriesState) => countriesState.data)

const makeSelectCountriesLoading = () =>
  createSelector(selectCountries, (countriesState) => countriesState.loading)

const makeSelectCountriesError = () =>
  createSelector(selectCountries, (countriesState) => countriesState.error)

export {
  makeSelectCountriesLoading,
  makeSelectCountries,
  makeSelectCountriesError,
}
