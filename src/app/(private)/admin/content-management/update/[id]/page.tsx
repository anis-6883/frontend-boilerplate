import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateContent from "../../_components/CreateContent";

const pageHeader = {
  title: "Update Content",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.contentManagement.home,
      name: "Content Management"
    },
    {
      name: "Update"
    }
  ]
};

export const metadata = {
  ...metaObject("Manage Content")
};

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateContent edit id={id} />
    </>
  );
}
