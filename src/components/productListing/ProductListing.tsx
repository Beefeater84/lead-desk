import { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from "react-toastify";
import Title from "../../shared/ui/titles/Title";
import NoProductsFound from "../noProductsFound/NoProductsFound";
import {
  AddProductFunction,
  EditProductFunction,
  ProductType,
  RemoveProductFunction,
} from "./types";
import useProducts from "../../hooks/useProducts";
import AddNewProduct from "../addNewProduct/addNewProduct";
import Product from "../product/Product";

export default function ProductListing() {
  const productsFromDatabase = useProducts();
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (productsFromDatabase?.length === 0) return;
    setProducts(productsFromDatabase);
  }, [productsFromDatabase]);

  const onRemoveHandler: RemoveProductFunction = (id: string) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    toast.warning(`Product removed from your list.`);
  };
  const onEditHandler: EditProductFunction = (changedProduct: ProductType) => {
    const candidateIndex = products.findIndex(
      (product) => product.id === changedProduct.id,
    );
    if (candidateIndex === -1) return;
    const newProducts = Array.from(products);
    newProducts[candidateIndex] = changedProduct;
    setProducts(newProducts);
    toast.success(
      `Product ${newProducts[candidateIndex].name} successfully updated!`,
    );
  };
  const onAddHandler: AddProductFunction = (product) => {
    const neeProduct: ProductType = {
      id: window.self.crypto.randomUUID(),
      name: product.name,
      amount: product.amount,
    };
    setProducts([neeProduct, ...products]);
    toast.success(`Product ${product.name} added to your list!`);
  };

  if (!products) return null;

  return (
    <>
      <section>
        <div className="container">
          <Title textPosition="center" titleStyle="underlined">
            Products
          </Title>
          <div>
            {products?.length === 0 ? (
              <NoProductsFound />
            ) : (
              products.map((product) => {
                return (
                  <Product
                    key={product?.id}
                    id={product?.id}
                    name={product?.name}
                    amount={product?.amount}
                    onRemoveFn={onRemoveHandler}
                    onEditFn={onEditHandler}
                  />
                );
              })
            )}
          </div>
        </div>
      </section>
      <AddNewProduct onAddHandler={onAddHandler} />
    </>
  );
}
