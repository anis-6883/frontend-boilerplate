import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import VersionTable from "./_components/VersionTable";

const pageHeader = {
  title: "Version",
  breadcrumb: [
    {
      href: routes.admin.version.home,
      name: "Dashboard"
    },
    {
      name: "Version"
    }
  ]
};

export const metadata = {
  ...metaObject("Version")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.admin.version.create}
          className='bg-primary hover:bg-primary-dark duration-300 transition-all py-2 px-3 rounded-md flex space-x-2 items-center text-white'
        >
          <HiPlus className='text-lg' /> Add Version
        </Link>
      </PageHeader>
      <VersionTable />
    </>
  );
}
