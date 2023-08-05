import { Rule } from "sanity"

export const Product = {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "image",
            title: "Image",
            type: "array",
            of: [{type: "image"}],
            options: {
                hotspot: true,
            }
        },
        {
          name: 'title',
          title: 'Product Title', 
          type: 'string'
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 90,
            }
        },
        {
            name: "details",
            title: "Product Details",
            type: "string",
        },
        {
            name: "price",
            title: "Product Price",
            type: "number"
          },
          {
            title: "Currency",
            name: "currency",
            type: "string",
            initialValue: "USD",
            hidden: true
          },
          {
            title: "Sale Price",
            name: "sale_price",
            type: "number",
            hidden: ({ document }: { document: any }) => !document.on_sale

          },
          {
            title: "On Sale?",
            name: "on_sale",
            type: "boolean"
          },

          {
            name: "category",
            title: "Product Category",
            type: "reference",
            to: [
              {
               type: "category" // Specify the "category" type for reference
              },
                ] 
              }
            ]
          }
