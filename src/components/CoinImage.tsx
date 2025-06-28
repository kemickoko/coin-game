type Props = {
  src: string;
  alt: string;
  x: number;
  y: number;
  rotation: number;
  size: number;
};

export const CoinImage: React.FC<Props> = ({ src, alt, x, y, rotation, size }) => (
  <img
    src={src}
    alt={alt}
    className="absolute"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      transform: `rotate(${rotation}deg)`,
      width: `${size}px`,
      height: `${size}px`,
    }}
  />
);