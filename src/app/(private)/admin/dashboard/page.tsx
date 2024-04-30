import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";

const pageHeader = {
  title: "Dashboard",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
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
    </>
  );
}
