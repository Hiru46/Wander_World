export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  cca3: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  borders?: string[];
  area?: number;
  latlng?: number[];
  timezones?: string[];
  continents?: string[];
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
}

export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    return response.json();
  } catch (error) {
    console.error('Error in fetchAllCountries:', error);
    throw error;
  }
};

export const fetchCountryByName = async (name: string): Promise<Country[]> => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error('Failed to fetch country by name');
    }
    return response.json();
  } catch (error) {
    console.error('Error in fetchCountryByName:', error);
    throw error;
  }
};

export const fetchCountriesByRegion = async (region: string): Promise<Country[]> => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries by region');
    }
    return response.json();
  } catch (error) {
    console.error('Error in fetchCountriesByRegion:', error);
    throw error;
  }
};

export const fetchCountryByCode = async (code: string): Promise<Country[]> => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    if (!response.ok) {
      throw new Error('Failed to fetch country by code');
    }
    return response.json();
  } catch (error) {
    console.error('Error in fetchCountryByCode:', error);
    throw error;
  }
};
