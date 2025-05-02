import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: { [key: string]: { official: string; common: string } };
  };
  flags: {
    png: string;
    svg?: string;
  };
  region: string;
  population: number;
  capital?: string[];
  cca3: string;
  languages?: { [key: string]: string };
}

export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw error;
  }
};

export const fetchCountryByName = async (name: string): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>(`${BASE_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country ${name}:`, error);
    throw error;
  }
};
