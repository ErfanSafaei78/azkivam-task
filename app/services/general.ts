
export const servicesGeneral = {
  categories: '/categories',
  merchants: '/merchants',
  products: (categoryId?: number) => `/products/${categoryId || ""}`,
};
