import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Task";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;

  display: flex;
  flex-direction: column;
  min-height: 80vh;
  flex: 1;
`;
const Title = styled.h3`
  padding: 0px 8px;
  color: grey;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggedOver ? "#f9f9f9" : "inherit"};

  flex-grow: 1;
  min-height: 100px;
`;

// Perf Optimization - react memo/ Pure component
const InnerList = React.memo(
  ({ tasks }) =>
    tasks.map((task, index) => <Task key={task.id} task={task} index={index} />) // Checking if old and new props are same, else render
);

function Column(props) {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable
        droppableId={props.column.id}
        isDropDisabled={props.isDropDisabled} // to control if anything can be dropped
        type="task"
      >
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggedOver={snapshot.isDraggingOver}
          >
            <InnerList tasks={props.tasks} />

            {provided.placeholder}
            {/* React element to increase available space during a drag - child of a component that we say droppable */}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}

export default Column;
