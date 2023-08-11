export type ProductIdType = string;
export type ProductNameType = string;
export type ProductAmountType = number;

export type ProductType = {
  id: ProductIdType;
  name: ProductNameType;
  amount: ProductAmountType;
};

export type AddProductFunction = ({
  name,
  amount,
}: Omit<ProductType, "id">) => void;

export type RemoveProductFunction = (id: ProductIdType) => void;

export type EditProductFunction = ({ id, name, amount }: ProductType) => void;

export type CallbackFunction = (params: any) => void;
