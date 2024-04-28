import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import SongTable from "./_components/SongTable";

const pageHeader = {
  title: "Song Management",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      name: "Song"
    }
  ]
};

export const metadata = {
  ...metaObject("Song Management")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.admin.song.create}
          className='bg-primary hover:bg-primary-dark duration-300 transition-all py-2 px-3 rounded-md flex space-x-2 items-center text-white'
        >
          <HiPlus className='text-lg' /> Add Song
        </Link>
      </PageHeader>
      <SongTable />
    </>
  );
}
