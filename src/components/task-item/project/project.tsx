import React from "react";
import { TaskItemProps } from "../task-item";
import styles from "./project.module.css";

export const Project: React.FC<TaskItemProps> = ({ task, isSelected }) => {
  const barColor = isSelected
    ? task.styles.backgroundSelectedColor
    : task.styles.backgroundColor;
  const processColor = isSelected
    ? task.styles.progressSelectedColor
    : task.styles.progressColor;
  const projectWith = task.x2 - task.x1;

  const hasBaseline =
    task.baselineX1 !== undefined && task.baselineX2 !== undefined;
  const mainBarHeight = hasBaseline ? task.height * 0.6 : task.height;
  const baselineHeight = task.height * 0.3;
  const baselineY = task.y + mainBarHeight + task.height * 0.1;

  const projectLeftTriangle = [
    task.x1,
    task.y + mainBarHeight / 2 - 1,
    task.x1,
    task.y + mainBarHeight,
    task.x1 + 15,
    task.y + mainBarHeight / 2 - 1,
  ].join(",");
  const projectRightTriangle = [
    task.x2,
    task.y + mainBarHeight / 2 - 1,
    task.x2,
    task.y + mainBarHeight,
    task.x2 - 15,
    task.y + mainBarHeight / 2 - 1,
  ].join(",");

  return (
    <g tabIndex={0} className={styles.projectWrapper}>
      {hasBaseline && (
        <rect
          x={task.baselineX1}
          y={baselineY}
          width={task.baselineX2! - task.baselineX1!}
          height={baselineHeight}
          ry={task.barCornerRadius}
          rx={task.barCornerRadius}
          fill={task.styles.baselineBackgroundColor}
        />
      )}
      <rect
        fill={barColor}
        x={task.x1}
        width={projectWith}
        y={task.y}
        height={mainBarHeight}
        rx={task.barCornerRadius}
        ry={task.barCornerRadius}
        className={styles.projectBackground}
      />
      <rect
        x={task.progressX}
        width={task.progressWidth}
        y={task.y}
        height={mainBarHeight}
        ry={task.barCornerRadius}
        rx={task.barCornerRadius}
        fill={processColor}
      />
      <rect
        fill={barColor}
        x={task.x1}
        width={projectWith}
        y={task.y}
        height={mainBarHeight / 2}
        rx={task.barCornerRadius}
        ry={task.barCornerRadius}
        className={styles.projectTop}
      />
      <polygon
        className={styles.projectTop}
        points={projectLeftTriangle}
        fill={barColor}
      />
      <polygon
        className={styles.projectTop}
        points={projectRightTriangle}
        fill={barColor}
      />
    </g>
  );
};
