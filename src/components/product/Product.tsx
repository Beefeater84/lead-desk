import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import styles from "./products.module.scss";
import {
  AddProductFunction,
  CallbackFunction,
  EditProductFunction,
  ProductAmountType,
  ProductIdType,
  ProductNameType,
  RemoveProductFunction,
} from "../productListing/types";
import { validateAmount, validateName } from "./utilitis/validation";

type ProductPropsBase = {
  id?: ProductIdType;
  name?: ProductNameType;
  amount?: ProductAmountType;
};

type ProductPropsWithCallback = ProductPropsBase & {
  onClickFn?: CallbackFunction;
  onAddFn?: never;
  onRemoveFn?: never;
  onEditFn?: never;
};

type ProductPropsWithRemoveAndEdit = ProductPropsBase & {
  onRemoveFn: RemoveProductFunction;
  onEditFn: EditProductFunction;
  onAddFn?: never;
  onClickFn?: never;
};

type ProductPropsWithAdd = ProductPropsBase & {
  onAddFn: AddProductFunction;
  onRemoveFn?: never;
  onEditFn?: never;
  onClickFn?: never;
};

type ProductProps =
  | ProductPropsWithRemoveAndEdit
  | ProductPropsWithAdd
  | ProductPropsWithCallback;

export default function Product(props: ProductProps) {
  const {
    name = "",
    amount = 0,
    id = "0",
    onRemoveFn,
    onEditFn,
    onAddFn,
    onClickFn,
  } = props;
  const [inputNameValue, setInputNameValue] = useState<ProductNameType>(name);
  const [inputNameError, setInputNameError] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [inputAmountValue, setInputAmountValue] =
    useState<ProductAmountType>(amount);
  const [inputAmountError, setAmountError] = useState<boolean>(false);

  const onInputNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChanged(true);
    setInputNameValue(event.target.value);

    const isNameValid = validateName(event.target.value);

    if (!isNameValid) {
      setInputNameError(true);
      toast.error("Product name must be between 1 and 100 characters long.");
    } else {
      setInputNameError(false);
    }
  };

  const onInputAmountChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChanged(true);
    setInputAmountValue(Number(event.target.value));

    const isAmountValid = validateAmount(Number(event.target.value));
    if (!isAmountValid) {
      setAmountError(true);
      toast.error("Product amount must be between 1 and 10000.");
    } else {
      setAmountError(false);
    }
  };

  const onClickHandler = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (onClickFn) {
      // Callback function, in case we need to rewrite the onClickHandler
      onClickFn({
        event,
        id,
        name: inputNameValue,
        amount: Number(inputAmountValue),
      });
      return;
    }

    if (onRemoveFn && !isChanged) {
      onRemoveFn(id);
      return;
    }

    if (onEditFn && isChanged) {
      if (inputNameError) {
        toast.error("Product name must be between 1 and 100 characters long.");
        return;
      }
      if (inputAmountError) {
        toast.error("Product amount must be between 1 and 10000.");
        return;
      }
      setIsChanged(false);
      onEditFn({
        id,
        name: inputNameValue,
        amount: Number(inputAmountValue),
      });
      return;
    }

    if (onAddFn) {
      const isNameValid = validateName(inputNameValue);
      const isAmountValid = validateAmount(Number(inputAmountValue));

      if (!isNameValid || !isAmountValid) {
        toast.error("Enter product name and amount.");
        return;
      }

      setInputNameValue("");
      setInputAmountValue(0);

      onAddFn({
        name: inputNameValue,
        amount: Number(inputAmountValue),
      });
    }
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickHandler(event);
    }
  };

  let actionButtonName = "Implement";
  switch (true) {
    case onRemoveFn && !isChanged:
      actionButtonName = "Remove";
      break;
    case onEditFn && isChanged:
      actionButtonName = "Save changes";
      break;
    case !!onAddFn:
      actionButtonName = "Add";
      break;
    default:
      actionButtonName = "Implement";
      break;
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        name="inputNameValue"
        value={inputNameValue}
        maxLength={100}
        minLength={0}
        onChange={onInputNameChangeHandler}
        onKeyDown={onKeyDownHandler}
        placeholder="Type the name of the product"
      />
      <input
        className={styles.amount}
        name="inputAmountValue"
        type="number"
        value={inputAmountValue}
        onChange={onInputAmountChangeHandler}
        onKeyDown={onKeyDownHandler}
        data-testid="inputAmountValue"
        min="0"
        max="10000"
      />
      <button
        className={styles["action-button"]}
        type="submit"
        onClick={onClickHandler}
      >
        {actionButtonName}
      </button>
    </div>
  );
}

Product.defaultProps = {
  name: "",
  amount: 0,
  id: "0",
};
