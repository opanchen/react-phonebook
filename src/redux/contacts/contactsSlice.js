import { createApi } from "@reduxjs/toolkit/query/react";
import { phonebookAPI } from "redux/auth/operations";

// Use an already existing instance of axios as baseQuery to be able to support auth-token from auth-slice/auth-operations
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: phonebookAPI.defaults.baseURL }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await phonebookAPI({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError) {
      console.log(
        "Cought error inside axiosBaseQuery (contactsAPI): ",
        axiosError
      );
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const contactsAPI = createApi({
  reducerPath: "contacts",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: "contacts/",
        method: "GET",
      }),
      providesTags: ["Contact"],
    }),

    getContactById: builder.query({
      query: (id) => ({
        url: `contacts/${id}`,
        method: "GET",
      }),
      providesTags: ["Contact"],
    }),

    addContact: builder.mutation({
      query: ({ name, number, email }) => ({
        url: "contacts/",
        method: "POST",
        data: { name, email, phone: number },
      }),
      invalidatesTags: ["Contact"],
    }),

    updateContact: builder.mutation({
      query: ({ id, name, email, number }) => ({
        url: `contacts/${id}`,
        method: "PUT",
        data: { name, email, phone: number },
      }),
      invalidatesTags: ["Contact"],
    }),

    updateStatusContact: builder.mutation({
      query: ({ id, favorite }) => ({
        url: `contacts/${id}`,
        method: "PATCH",
        data: { favorite },
      }),
      invalidatesTags: ["Contact"],
    }),

    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useUpdateStatusContactMutation,
  useDeleteContactMutation,
} = contactsAPI;
