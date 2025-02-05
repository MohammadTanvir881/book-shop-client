import { baseApi } from "@/Redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    addOrder: builder.mutation({
      query: (checkOutData) => ({
        url: "/orders",
        method: "POST",
        body: checkOutData,
      }),
      invalidatesTags: ["order"],
    }),
    updateOrder: builder.mutation({
      query: (orderId) => ({
        url: `orders/updateOrder/${orderId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `orders/orderDelete/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetAllOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
