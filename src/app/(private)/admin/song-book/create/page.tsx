import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateSongBook from "../_components/CreateSongBook";

const pageHeader = {
  title: "Create Song Book",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.songBook.home,
      name: "Song Book"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Song Book")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateSongBook />
    </>
  );
}
