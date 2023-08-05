import { defineType, defineField } from "sanity";
export const Category = defineType(
    {
        name:'category',
        type:'document',
        title:'Category',
        fields: [
            defineField ({          /// forv single category
                name:'name',
                title:'Category Name',
                type:'string'
            }),

            // {
            //     name:'Title',        //// For adding multiple category
            //         title:'Category Name',
            //         type:'array',
            //         of:[{
            //             name:'name',
            //             title:'Category Name',
            //             type:'string',
            //         }]
            //     },
            
        ]
    }
)