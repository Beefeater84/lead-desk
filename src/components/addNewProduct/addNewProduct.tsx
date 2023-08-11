import React from "react";
import Title from "../../shared/ui/titles/Title";
import Product from "../product/Product";
import { AddProductFunction } from "../productListing/types";

type AddNewProductProps = {
  onAddHandler: AddProductFunction;
};

export default function AddNewProduct({ onAddHandler }: AddNewProductProps) {
  return (
    <section>
      <div className="container">
        <Title titleStyle="underlined">Add new products</Title>
        <Product onAddFn={onAddHandler} />
      </div>
    </section>
  );
}
