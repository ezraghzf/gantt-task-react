import React from "react";
import { getProgressPoint } from "../../../helpers/bar-helper";
import { BarDisplay } from "./bar-display";
import { BarDateHandle } from "./bar-date-handle";
import { BarProgressHandle } from "./bar-progress-handle";
import { TaskItemProps } from "../task-item";
import styles from "./bar.module.css";

export const Bar: React.FC<TaskItemProps> = ({
  task,
  isProgressChangeable,
  isDateChangeable,
  rtl,
  onEventStart,
  isSelected,
}) => {
  const hasBaseline =
    task.baselineX1 !== undefined && task.baselineX2 !== undefined;
  const mainBarHeight = hasBaseline ? task.height * 0.6 : task.height;
  const baselineHeight = task.height * 0.3;
  const baselineY = task.y + mainBarHeight + task.height * 0.1;

  const progressPoint = getProgressPoint(
    +!rtl * task.progressWidth + task.progressX,
    task.y,
    mainBarHeight
  );
  const handleHeight = mainBarHeight - 2;
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
        {isDateChangeable && (
          <g>
            {/* left */}
            <BarDateHandle
              x={task.x1 + 1}
              y={task.y + 1}
              width={task.handleWidth}
              height={handleHeight}
              barCornerRadius={task.barCornerRadius}
              onMouseDown={e => {
                onEventStart("start", task, e);
              }}
            />
            {/* right */}
            <BarDateHandle
              x={task.x2 - task.handleWidth - 1}
              y={task.y + 1}
              width={task.handleWidth}
              height={handleHeight}
              barCornerRadius={task.barCornerRadius}
              onMouseDown={e => {
                onEventStart("end", task, e);
              }}
            />
          </g>
        )}
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
