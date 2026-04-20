export type Relationship = {
  country: string;
  reason: string;
};

export type CountryData = {
  basic: {
    name: string;
    capital: string;
    region: string;
    government: string;
    languages: string[];
    currency: string;
  };
  snapshot: {
    population: string;
    gdp: string;
    gdp_per_capita: string;
    economy_type: string;
  };
  identity: string;
  strengths: string[];
  weaknesses: string[];
  current_position: string;
  history_brief: string;
  relationships: {
    allies: Relationship[];
    working: Relationship[];
    tensions: Relationship[];
  };
};

export type CountriesData = Record<string, CountryData>;
