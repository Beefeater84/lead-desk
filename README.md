# Project Documentation

## About the Project

The "lead-desk" project is an interface for managing a list of products. It's developed using React with TypeScript and includes the following main components:

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

## What approaches I used

### Structure

This is a small project, so I didn't create a complex preparatory structure for it. I would just highlight a couple of unusual folders in it:

- `app` - holds global application files. In our project, it contains global styles.
- `shared` - contains universal functions that can be easily moved between projects. In our project, it's related to UI elements.

### Design system:
`Scss modules` are commonly used for styling today, and there are two prevalent design systems: Scss and Tailwind. In the context of an undefined design, I chose to use Scss because it offers more flexibility and doesn't require predefined color schemes, media queries, etc. As you can see from the variable names for colors, my design has evolved significantly during development.

### Toastify JS
https://apvarun.github.io/toastify-js/ for Notifications.

I should have displayed user feedback for their actions and categorized them as errors, successes, and warnings. Toastify JS offers this functionality out of the box, and it doesn't require any design changes. When appearing, it doesn't affect the layout by moving or resizing elements.

However, I would still consider it a temporary solution. Ideally, errors and warnings should be shown in the context where they occurred. Unfortunately, I didn't have enough time to design and implement such a solution.

### Modifying list items

Currently, all product names are implemented as `input`. While this doesn't pose security issues and allows for easy styling, there might be an accessibility concern. People using screen readers or other assistive devices could face challenges.

Therefore, in the future, it might be beneficial to consider alternatives like using `contenteditable="true"` or changing the component upon click to enhance accessibility.

### What else I would improve.
I would change the table. To be honest, I originally viewed it as a List, not a Table
So I made a UI for Title. It was a generic element that set the location of the text, html tag of the title and stuff like that. It wasn't until the last hour that I realized that the table titles should be on top, so the way it's done is "last munute decsision". Not perfect, but like in real life.

And the css styles are not made universally for the table, but as for the list item. So I would also emphasize the table in the UI.

### Over all


For a one-day project, this is a good achievement. The project is being tested, easily improved, and expanded. It generates multiple products, allows modifications, performs validations, and displays warnings.

What I particularly like is how the Product component functions as a versatile element. It performs its own validation to ensure that only appropriate data can be added, and it also offers a callback function for custom actions.

I appreciate the simplicity of adding and modifying products, and the added support for using the Enter key enhances the user experience.

## Installation

To install and run the project, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/Beefeater84/lead-desk.git
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