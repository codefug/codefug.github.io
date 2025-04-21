// VimeoPlayer.js

const VimeoPlayer = ({
  id,
  width = "640",
  height = "360",
}: {
  id: string;
  width?: string;
  height?: string;
}) => {
  const src = `https://player.vimeo.com/video/${id}`;

  return (
    <div>
      <iframe
        title={`vimeo-${id}`}
        src={src}
        width={width}
        height={height}
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </div>
  );
};

export default VimeoPlayer;
