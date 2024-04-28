import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateVerse from "../../_components/CreateVerse";

const pageHeader = {
  title: "Update Verse",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.verse.home,
      name: "Verse"
    },
    {
      name: "Update"
    }
  ]
};

export const metadata = {
  ...metaObject("Manage Verse")
};

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateVerse edit id={id} />
    </>
  );
}
