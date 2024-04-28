import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import BookTable from "./_components/BookTable";

const pageHeader = {
  title: "Book",
  breadcrumb: [
    {
      href: routes.admin.book.home,
      name: "Dashboard"
    },
    {
      name: "Book"
    }
  ]
};

export const metadata = {
  ...metaObject("Book")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.admin.book.create}
          className='bg-primary hover:bg-primary-dark duration-300 transition-all py-2 px-3 rounded-md flex space-x-2 items-center text-white'
        >
          <HiPlus className='text-lg' /> Add Book
        </Link>
      </PageHeader>
      <BookTable />
    </>
  );
}
