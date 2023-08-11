import { Crypto } from "@peculiar/webcrypto";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { toast } from "react-toastify";
import userEvent from "@testing-library/user-event";
import ProductListing from "./components/productListing/ProductListing";
import useProducts from "./hooks/useProducts";
import Product from "./components/product/Product";

jest.mock("./hooks/useProducts", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// jest.mock("./hooks/useProducts");

Object.assign(window, {
  crypto: new Crypto(),
});

jest.mock("react-toastify", () => ({
  toast: {
    warning: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("./hooks/useProducts");

jest.mock("./mocks/uuidMock", () => ({
  generateUUIDMock: jest.fn(),
}));

describe("ProductListing Component", () => {
  it("renders correctly with no products", () => {
    (useProducts as jest.Mock).mockReturnValue([]);

    render(<ProductListing />);
    const noProductsFound = screen.getByText(
      "There is no products in the shopping list.",
    );
    expect(noProductsFound).toBeInTheDocument();
  });

  it("renders products correctly", () => {
    const products = [
      { id: "1", name: "Product 1", amount: 10 },
      { id: "2", name: "Product 2", amount: 5 },
    ];

    (useProducts as jest.Mock).mockReturnValue(products);

    render(<ProductListing />);

    products.forEach((product) => {
      const inputElement = screen.getByDisplayValue(product.name);
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute("name", "inputNameValue");
      expect(inputElement).toHaveAttribute("type", "text");
      expect(inputElement).toHaveValue(product.name);
    });
  });

  it("handles removing a product correctly", () => {
    const products = [
      { id: "1", name: "Product 1", amount: 10 },
      { id: "2", name: "Product 2", amount: 5 },
    ];
    (useProducts as jest.Mock).mockReturnValue(products);

    render(<ProductListing />);

    products.forEach((product) => {
      const deleteButton = screen.getAllByText("Remove")[0];
      fireEvent.click(deleteButton);

      expect(toast.warning).toHaveBeenCalledWith(
        "Product removed from your list.",
      );

      const deletedProduct = screen.queryByDisplayValue(product.name);
      expect(deletedProduct).not.toBeInTheDocument();
    });
  });

  it("handles add product  correctly", () => {
    // It works because we don't have any products in the list
    // So only the add product button is rendered

    (useProducts as jest.Mock).mockReturnValue([]);
    // global.crypto = crypto;

    render(<ProductListing />);

    const productName = "New Product";
    const productAmount = 15;

    const nameInput = screen.getByPlaceholderText(
      // eslint-disable-next-line sonarjs/no-duplicate-string
      "Type the name of the product",
    );

    const amountInput = screen.getByTestId("inputAmountValue");

    const addButton = screen.getByText("Add");

    fireEvent.change(nameInput, { target: { value: productName } });
    fireEvent.change(amountInput, { target: { value: productAmount } });

    fireEvent.click(addButton);

    expect(toast.success).toHaveBeenCalledWith(
      `Product ${productName} added to your list!`,
    );

    const addedProduct = screen.getByDisplayValue(productName);
    expect(addedProduct).toBeInTheDocument();
  });

  it("handles edit product correctly", () => {
    const products = [
      { id: "1", name: "Product 1", amount: 10 },
      { id: "2", name: "Product 2", amount: 5 },
    ];
    (useProducts as jest.Mock).mockReturnValue(products);

    render(<ProductListing />);

    const nameInput = screen.getAllByPlaceholderText(
      "Type the name of the product",
    )[0];
    userEvent.clear(nameInput);
    userEvent.type(nameInput, "Product 1 Edited");

    const amountInput = screen.getAllByTestId("inputAmountValue")[0];
    userEvent.clear(amountInput);
    userEvent.type(amountInput, "15");

    // eslint-disable-next-line sonarjs/no-duplicate-string
    const saveChangesButton = screen.getAllByText("Save changes")[0];
    userEvent.click(saveChangesButton);

    expect(toast.success).toHaveBeenCalledWith(
      `Product Product 1 Edited successfully updated!`,
    );
  });
});

describe("ProductListing Component border values", () => {
  it("Try to save Element without Name", async () => {
    render(
      <Product
        id="1"
        name="Product 1"
        amount={10}
        onEditFn={jest.fn()}
        onRemoveFn={jest.fn()}
      />,
    );

    const nameInput = screen.getByPlaceholderText(
      "Type the name of the product",
    );
    userEvent.clear(nameInput);
    const saveChangesButton = screen.getByText("Save changes");
    userEvent.click(saveChangesButton);
    expect(toast.error).toHaveBeenCalledWith(
      "Product name must be between 1 and 100 characters long.",
    );
  });

  it("displays an error message when trying to save changes with invalid amount", async () => {
    render(
      <Product
        id="1"
        name="Product 1"
        amount={10}
        onEditFn={jest.fn()}
        onRemoveFn={jest.fn()}
      />,
    );

    const amountInput = screen.getByTestId("inputAmountValue");

    userEvent.clear(amountInput);
    userEvent.type(amountInput, "10001");
    const saveChangesButton = screen.getByText("Save changes");
    userEvent.click(saveChangesButton);

    expect(toast.error).toHaveBeenCalledWith(
      "Product amount must be between 1 and 10000.",
    );

    userEvent.clear(amountInput);
    userEvent.type(amountInput, "-1");
    userEvent.click(saveChangesButton);

    expect(toast.error).toHaveBeenCalledWith(
      "Product amount must be between 1 and 10000.",
    );
  });

  it("displays an error message when trying to add empty product", async () => {
    const products = [
      { id: "1", name: "Product 1", amount: 10 },
      { id: "2", name: "Product 2", amount: 5 },
    ];
    (useProducts as jest.Mock).mockReturnValue(products);
    render(<ProductListing />);
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    expect(toast.error).toHaveBeenCalledWith("Enter product name and amount.");

    const productsLength = screen.getAllByPlaceholderText(
      "Type the name of the product",
    );
    // 2 + 1 in add section
    expect(productsLength).toHaveLength(3);
  });
});
