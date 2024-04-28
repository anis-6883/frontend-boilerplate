"use client";
import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { useGetvideoCategorysQuery } from "@/features/video/videoCategoryApi";
import { useState } from "react";
import { HiPlus } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import VideoTable from "./_components/VideoTable";
import { addChannelId } from "@/features/video/videoReducer";
import { Button, Input, Modal, Select } from "rizzui";
import { IOption } from "@/types";

const pageHeader = {
  title: "Videos",
  breadcrumb: [
    {
      href: routes.admin.video.home,
      name: "Dashboard"
    },
    {
      name: "Videos"
    }
  ]
};

// export const metadata = {
//   ...metaObject("Videos")
// };

export default function Page() {
  const [modalState, setModalState] = useState(false);
  const [channelId, setChannelId] = useState<string>("");
  const [value, setValue] = useState<IOption | null>(null);
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();

  const { isLoading, data: videoCategories } = useGetvideoCategorysQuery({});

  const options = videoCategories?.data?.docs?.map((item: any) => ({
    label: item?.name,
    value: item?.id
  }));

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <button
          onClick={() => setModalState(true)}
          className='bg-primary hover:bg-primary-dark duration-300 transition-all py-2 px-3 rounded-md flex space-x-2 items-center text-white'
        >
          <HiPlus className='text-lg' /> Add Videos
        </button>
        <Modal isOpen={modalState} onClose={() => setModalState(false)}>
          <div className='m-auto px-7 pt-6 pb-8'>
            <div className='grid grid-cols-2 gap-y-6 gap-x-5 [&_label>span]:font-medium'>
              <Input
                label='Channel ID *'
                inputClassName='border-2'
                size='lg'
                className='col-span-2'
                placeholder='ChannelId'
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
              />
              <Select label='Select Video Category' options={options} value={value} onChange={setValue} />
              <Button
                type='submit'
                size='lg'
                className='col-span-2 mt-2'
                onClick={() => {
                  setModalState(false);
                  dispatch(addChannelId(channelId));
                }}
              >
                Add Videos
              </Button>
            </div>
          </div>
        </Modal>
      </PageHeader>
      <VideoTable category={value?.value as string} />
    </>
  );
}
