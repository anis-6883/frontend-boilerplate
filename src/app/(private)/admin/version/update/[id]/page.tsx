import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateVersion from "../../_components/CreateVersion";

const pageHeader = {
  title: "Update Version",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.version.home,
      name: "Version"
    },
    {
      name: "Update"
    }
  ]
};

export const metadata = {
  ...metaObject("Manage Version")
};

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateVersion edit id={id} />
    </>
  );
}
