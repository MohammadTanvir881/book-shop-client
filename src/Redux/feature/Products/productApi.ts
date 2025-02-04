import { baseApi } from "@/Redux/api/baseApi";
import React from "react";

export type TQueryParams = {
  name: string;
  value: boolean | React.Key | string | number;
};

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, String(item.value));
          });
        }
        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["books"],
    }),
    getSingleProduct: builder.query({
      query: (id) => {
        const params = new URLSearchParams();

        return {
          url: `/products/${id}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: (result, error, id) => [{ type: "books", id }],
      //   transformResponse: (response: TResponseRedux<TBooks[]>) => {
      //     console.log(response.data)
      //     return {
      //       data: response.data,
      //       meta: response.meta,
      //     };
      //   },
    }),
    AddProduct: builder.mutation({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["books"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, updatedData }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "books", id: productId }, // ✅ Lowercase tag
        "books", // ✅ Invalidate the books list
      ],
    }),
    deleteProduct: builder.mutation({
      query: ({ productId }) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "books", id: productId }, // ✅ Lowercase tag
        "books", // ✅ Invalidate the books list
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
