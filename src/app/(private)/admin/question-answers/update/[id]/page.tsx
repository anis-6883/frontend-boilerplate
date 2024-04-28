import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateDailyManna from "../../_components/CreateQa";

const pageHeader = {
  title: "Update QA",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.questionAnswer.home,
      name: "QA"
    },
    {
      name: "Update"
    }
  ]
};

export const metadata = {
  ...metaObject("Manage QA")
};

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateDailyManna edit id={id} />
    </>
  );
}
