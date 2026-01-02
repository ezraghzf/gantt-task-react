import React from "react";
import { getProgressPoint } from "../../../helpers/bar-helper";
import { BarDisplay } from "./bar-display";
import { BarProgressHandle } from "./bar-progress-handle";
import { TaskItemProps } from "../task-item";
import styles from "./bar.module.css";

export const BarSmall: React.FC<TaskItemProps> = ({
  task,
  isProgressChangeable,
  isDateChangeable,
  onEventStart,
  isSelected,
}) => {
  const hasBaseline =
    task.baselineX1 !== undefined && task.baselineX2 !== undefined;
  const mainBarHeight = hasBaseline ? task.height * 0.6 : task.height;
  const baselineHeight = task.height * 0.3;
  const baselineY = task.y + mainBarHeight + task.height * 0.1;

  const progressPoint = getProgressPoint(
    task.progressWidth + task.x1,
    task.y,
    mainBarHeight
  );
  return (
    <g className={styles.barWrapper} tabIndex={0}>
      {hasBaseline && (
        <rect
          x={task.baselineX1}
          y={baselineY}
          width={task.baselineX2! - task.baselineX1!}
          height={baselineHeight}
          ry={task.barCornerRadius}
          rx={task.barCornerRadius}
          fill={task.styles.baselineBackgroundColor}
          className={styles.barBackground}
        />
      )}
      <BarDisplay
        x={task.x1}
        y={task.y}
        width={task.x2 - task.x1}
        height={mainBarHeight}
        progressX={task.progressX}
        progressWidth={task.progressWidth}
        barCornerRadius={task.barCornerRadius}
        styles={task.styles}
        isSelected={isSelected}
        onMouseDown={e => {
          isDateChangeable && onEventStart("move", task, e);
        }}
      />
      <g className="handleGroup">
        {isProgressChangeable && (
          <BarProgressHandle
            progressPoint={progressPoint}
            onMouseDown={e => {
              onEventStart("progress", task, e);
            }}
          />
        )}
      </g>
    </g>
  );
};
