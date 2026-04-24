import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import "./YoutubeShorts.css";

const YoutubeShorts = ({ id, title, ...rest }) => {
  return (
    <LiteYouTubeEmbed
      id={id}
      title={title}
      noCookie={true}
      {...rest}
      wrapperClass="yt-lite yt-shorts"
    />
  );
};

export default YoutubeShorts;
