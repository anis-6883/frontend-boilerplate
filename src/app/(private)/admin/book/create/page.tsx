import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateBook from "../_components/CreateBook";

const pageHeader = {
  title: "Create Book",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.book.home,
      name: "Book"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Book")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateBook />
    </>
  );
}
