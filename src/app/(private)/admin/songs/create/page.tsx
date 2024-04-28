import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateDailyManna from "../_components/CreateSong";

const pageHeader = {
  title: "Create A Song",
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
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Song")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateDailyManna />
    </>
  );
}
