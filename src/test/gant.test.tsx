import React from "react";
import { render, screen } from "@testing-library/react";
import { Gantt } from "../index";

describe("gantt", () => {
  it("renders without crashing", () => {
    render(
      <Gantt
        tasks={[
          {
            start: new Date(2020, 0, 1),
            end: new Date(2020, 2, 2),
            name: "Redesign website",
            id: "Task 0",
            progress: 45,
            type: "task",
          },
        ]}
      />
    );
  });

  it("renders baseline when provided", () => {
    const { container } = render(
      <Gantt
        tasks={[
          {
            start: new Date(2020, 0, 1),
            end: new Date(2020, 2, 2),
            baselineStart: new Date(2020, 0, 5),
            baselineEnd: new Date(2020, 1, 5),
            name: "Task with baseline",
            id: "Task 1",
            progress: 45,
            type: "task",
          },
        ]}
      />
    );
    // Check if there is a rect with the baseline color
    // The baseline is an SVG rect; Testing Library has no semantic query for its fill.
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const baselineRect = container.querySelector('rect[fill="#9CA3AF"]');
    expect(baselineRect).toBeTruthy();
  });

  it("renders without crashing when preStepsCount is 0", () => {
    render(
      <Gantt
        preStepsCount={0}
        tasks={[
          {
            start: new Date(2020, 0, 1),
            end: new Date(2020, 2, 2),
            name: "Task 0",
            id: "Task 0",
            progress: 45,
            type: "task",
          },
        ]}
      />
    );
  });

  it("renders custom task list components", async () => {
    render(
      <Gantt
        tasks={[
          {
            start: new Date(2020, 0, 1),
            end: new Date(2020, 2, 2),
            name: "Custom task",
            id: "Task 2",
            progress: 45,
            type: "task",
          },
        ]}
        TaskListHeader={() => <div>Custom header</div>}
        TaskListTable={({ tasks }) => (
          <div data-testid="custom-task-list">{tasks[0]?.name}</div>
        )}
      />
    );

    expect(screen.getByText("Custom header")).toBeTruthy();
    expect(await screen.findByTestId("custom-task-list")).toHaveTextContent(
      "Custom task"
    );
  });
});
