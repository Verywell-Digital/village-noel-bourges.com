import React, { FC } from "react";
import ButtonPlayMusicPlayer from "./button-play-music-player";
import { MediaDataType } from "@/data/types";
// import { PostDataType } from "@/data/types";

export interface MediaAudioProps {
  data: MediaDataType;
}

const MediaAudio: FC<MediaAudioProps> = ({ data }) => {
  return (
    <>
      <ButtonPlayMusicPlayer
        className="absolute inset-0 bg-neutral-900/30 flex items-center justify-center"
        post={data}
      />
    </>
  );
};

export default MediaAudio;
