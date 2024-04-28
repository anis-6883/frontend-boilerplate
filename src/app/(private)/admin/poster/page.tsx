import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import PosterTable from "./_components/PosterTable";

const pageHeader = {
  title: "Poster Management",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      name: "Poster"
    }
  ]
};

export const metadata = {
  ...metaObject("Poster Management")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.admin.poster.create}
          className='bg-primary hover:bg-primary-dark duration-300 transition-all py-2 px-3 rounded-md flex space-x-2 items-center text-white'
        >
          <HiPlus className='text-lg' /> Add Poster
        </Link>
      </PageHeader>
      <PosterTable />
    </>
  );
}
