import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateDailyManna from "../../_components/CreateVideo";

const pageHeader = {
  title: "Update Language",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.language.home,
      name: "Language"
    },
    {
      name: "Update"
    }
  ]
};

export const metadata = {
  ...metaObject("Manage Language")
};

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateDailyManna edit id={id} />
    </>
  );
}
