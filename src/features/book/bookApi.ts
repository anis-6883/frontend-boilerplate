import { apiSlice } from "@/features/api/apiSlice";
import { IBook } from "@/types";
import hotToast from "@/utils/hotToast";
import { addBook, deleteBook, setValue, updateBook } from "./bookReducer";

const bookApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/book/all?${new URLSearchParams(queries)}`;
        return "/book/all";
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          if (data.docs) {
            const { docs, ...rest } = data;
            dispatch(setValue({ target: "books", value: docs }));
            dispatch(setValue({ target: "pagination", value: rest }));
            return;
          }
          dispatch(setValue({ target: "books", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    getSingleBook: builder.query({
      query: (id) => `/book/${id}`
    }),
    createBook: builder.mutation<{ data: { newBook: IBook; status: boolean; message: string } }, IBook>({
      query: (data) => {
        return {
          url: "/book/create",
          method: "POST",
          body: data
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(addBook(data.newBook));
          hotToast("success", "Added");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error adding");
        }
      }
    }),
    updateBook: builder.mutation<{ data: { updatedBook: IBook; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: IBook }) => {
        return {
          url: `/book/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(updateBook(data.updatedBook));
          hotToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error updating");
        }
      }
    }),
    deleteBook: builder.mutation<{ data: { deleteBook: IBook; status: boolean; message: string } }, IBook>({
      query: (id) => {
        return {
          url: `/book/delete/${id}`,
          method: "DELETE"
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deleteBook({ id: data.deleteBook.id! }));
          hotToast("success", "Deleted");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error Deleting");
        }
      }
    })
  })
});

export const { useGetBooksQuery, useCreateBookMutation, useGetSingleBookQuery, useUpdateBookMutation, useDeleteBookMutation } = bookApi;
