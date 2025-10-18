import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  // Step 1: State setup with all columns filled
  const [columns, setColumns] = useState({
    todo: {
      name: "Todo",
      items: [
        { id: "1", content: "Task: Build UI" },
        { id: "2", content: "Task: Add API" },
        { id: "3", content: "Task: Write Docs" },
      ],
    },
    inprogress: {
      name: "In Progress",
      items: [
        { id: "4", content: "Task: Create Backend" },
        { id: "5", content: "Task: Connect Database" },
      ],
    },
    review: {
      name: "Review",
      items: [{ id: "6", content: "Task: Test Components" }],
    },
    done: {
      name: "Done",
      items: [{ id: "7", content: "Task: Setup Project" }],
    },
  });

  // Step 2: Drag and drop logic
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = Array.from(sourceColumn.items);
    const destItems = Array.from(destColumn.items);

    if (source.droppableId === destination.droppableId) {
      const [removed] = sourceItems.splice(source.index, 1);
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    } else {
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([columnId, column]) => (
          <div
            key={columnId}
            style={{
              margin: "8px",
              border: "1px solid lightgrey",
              borderRadius: "8px",
              width: "220px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f8f8f8",
            }}
          >
            <h3 style={{ textAlign: "center" }}>{column.name}</h3>
            <Droppable droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    padding: "8px",
                    minHeight: "500px",
                    background: snapshot.isDraggingOver
                      ? "lightblue"
                      : "#f8f8f8",
                  }}
                >
                  {column.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            padding: "16px",
                            margin: "0 0 8px 0",
                            minHeight: "50px",
                            backgroundColor: snapshot.isDragging
                              ? "#263B4A"
                              : "#456C86",
                            color: "white",
                            borderRadius: "6px",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;