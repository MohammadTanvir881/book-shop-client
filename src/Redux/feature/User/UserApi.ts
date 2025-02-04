import { baseApi } from "@/Redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        const params = new URLSearchParams();

        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
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
  }),
});

export const { useGetAllUsersQuery } = userApi;
