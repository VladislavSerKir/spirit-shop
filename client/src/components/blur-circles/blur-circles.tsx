interface ICircleProps {
  size: number;
  color: string;
  blur: number;
}

interface IBlurCirclesProps {
  circles: ICircleProps[];
  width: number;
  height: number;
}

const getRandomPosition = (max: number) => {
  return Math.random() * max;
};

const BlurCircles: React.FC<IBlurCirclesProps> = ({
  circles,
  width,
  height,
}) => {
  return (
    <div style={{ position: "absolute" }}>
      <div style={{ position: "relative", width, height, overflow: "visible" }}>
        {circles.map((circle, index) => {
          const x = getRandomPosition(width - circle.size * 2); // -circle.size * 2 для учета диаметра
          const y = getRandomPosition(height - circle.size * 2); // -circle.size * 2 для учета диаметра

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: circle.size * 2,
                height: circle.size * 2,
                borderRadius: "50%",
                backgroundColor: circle.color,
                filter: `blur(${circle.blur}px)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlurCircles;
