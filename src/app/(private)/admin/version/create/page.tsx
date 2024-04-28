import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateVersion from "../_components/CreateVersion";

const pageHeader = {
  title: "Create Version",
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
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Version")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateVersion />
    </>
  );
}
