import { Country } from "../../types/country";
import { api } from "../axios";

export const countriesApi = {
    // api/services/countries.ts
getAllCountries: async (): Promise<Country[]> => {
  const response = await api.get(
    "https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region,subregion,cca3,currencies"
  ) as Country[]; // 👈 explicitly cast it

  return response;
},

    // its first a promise and then we say we will return eventually an array, thats how you pass the type through here
}