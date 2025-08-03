interface Category {
  id: number;
  name: string;
  slug: string;
  enabled: boolean;
  priority: number;
  mapped: boolean;
  parent: number | null;
  children?: Category[];
}

interface Merchant {
  id: number;
  name: string;
  enabled: boolean | null;
  description: string | null;
}

type FilterResponse<T> = {
  data: T[];
};
