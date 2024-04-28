import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateDailyManna from "../../_components/CreateSong";

const pageHeader = {
  title: "Update Song",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.contentManagement.home,
      name: "Song"
    },
    {
      name: "Update"
    }
  ]
};

export const metadata = {
  ...metaObject("Manage Song")
};

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>

      <CreateDailyManna edit id={id} />
    </>
  );
}
