"use client";
import VideoCard from "@/components/ui/VideoCard";
import { RootState } from "@/features/store";
import { useCreateVideoMutation, useGetYoutubeVideosQuery } from "@/features/video/videoApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "rizzui";

interface VideoItem {
  id: string;
  title: string;
  thumnailImg: string;
  isChecked: boolean;
}

export default function VideoTable({ category }: { category: string }) {
  const { channelId } = useSelector((state: RootState) => state?.videoStore);

  const { isLoading, isSuccess, data: videoData } = useGetYoutubeVideosQuery(channelId, { skip: !channelId });
  const [createVideo] = useCreateVideoMutation();

  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const modifiedVideoList =
        videoData?.data?.videos?.items?.map((videoItem: any) => ({
          id: videoItem?.id?.videoId,
          title: videoItem.snippet.title,
          thumnailImg: videoItem?.snippet?.thumbnails?.high?.url,
          isChecked: false
        })) || [];
      setVideos(modifiedVideoList);
    }
  }, [isSuccess, videoData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const modifiedVideos = videos?.map((item) => {
      if (item?.id === id) {
        return {
          ...item,
          isChecked: !item?.isChecked
        };
      }
      return item;
    });
    setVideos(modifiedVideos);
  };

  const handleSubmit = () => {
    const videoIds = videos?.filter((item) => item.isChecked === true)?.map((item) => item.id);
    createVideo({ category, videoIds })
      .then((res: any) => {
        setVideos([]);
      })
      .then((err) => console.log(err));
  };

  return (
    <div>
      <ul className='flex flex-wrap'>
        {videos?.map((videoItem) => (
          <VideoCard
            isChecked={videoItem?.isChecked}
            id={videoItem.id}
            handleChange={handleChange}
            key={videoItem.id}
            title={videoItem.title}
            imageUrl={videoItem.thumnailImg}
          />
        ))}
      </ul>

      {videos?.length ? <Button onClick={handleSubmit}>Add Videos</Button> : null}
    </div>
  );
}
