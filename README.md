# Project Documentation

## About the Project

The "MyProductListing" project is an interface for managing a list of products. It's developed using React with TypeScript and includes the following main components:

- **ProductListing**: A component that displays a list of products with the ability to add, edit, and remove items.
- **Product**: A component to display an individual product with name and quantity fields.
- **NoProductsFound**: A component that is displayed when the product list is empty.
- **AddNewProduct**: A component for adding a new product to the list.

The core of the Product Listing feature is the **`<ProductListing />`** component. It offers the following key components and functionalities:
Structure:
- `useProducts` - fetch product data from the API.
- Manages the application's state for the list of products.
- Displays products using the `<Product />` component.
- `<AddNewProduct />` section to add new products with the component.

## Product component
Utilized for product listing and addition of new items.

use with `onEditFn` and `onRemoveFn` in lisitng 
```tsx
   <Product
        key={product.id}
        id={product.id}
        name={product.name}
        amount={product.amount}
        onEditFn={handleEdit}
        onRemoveFn={removeHandle}
    />
```


use with `onAddFn` to add new items
```tsx
   <Product
        onAddFn={handleAdd}
    />
```

use with `onClickFn` if you want need your own click handler
```tsx
   <Product
        onClickFn={onClickFn}
    />
```

## Testing

Use `npm test` to run tests. We have One page application, so all test are in `App.test.tsx`
```bash
  npm test 
 ```


## Important
- `useProducts` is not described, because it's a fake api and it's not important for the task.
- `ui` is not described, because it's created for whole app should be described in another documentation.
- In the design, there was no `edit` button, so you can modify the products by clicking on them.
- 


## Installation

To install and run the project, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/my-product-listing.git
    ```

Navigate to the project directory:

   ```bash
   cd my-product-listing
   ```

2. Install the dependencies:

   ```bash
    npm install
    ```
   
3. Run the project:

   ```bash
    npm start
    ```
   Open your browser and go to http://localhost:3000 to see your application in action.
   
## Dependencies

The project relies on the following main dependencies:

- React: A library for building user interfaces.
- TypeScript: A static type-checking tool for JavaScript.
- Jest: A testing library for testing code.
- React Testing Library: A tool for testing React components.