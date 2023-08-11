import { useEffect, useState } from "react";
import productList from "../mock-database/product-list.json";
import { ProductType } from "../components/productListing/types";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array: ProductType[]): ProductType[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function useProducts(): ProductType[] {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const minProducts = 5;
    const maxProducts = 15;

    const importedProducts: ProductType[] = productList;
    const shuffledProductList = shuffleArray(importedProducts);
    const randomCount = getRandomNumber(minProducts, maxProducts);

    const randomProducts = shuffledProductList.slice(0, randomCount);
    setProducts(randomProducts);

    setProducts(randomProducts);
  }, []);

  return products;
}
