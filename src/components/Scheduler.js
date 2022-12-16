import React, {useEffect, useState} from "react";
import 'react-calendar/dist/Calendar.css';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {uid} from "uid";
import {useTranslation} from "react-i18next";


const getHexColorByString = (name) => {

    let color = 0
    for (let i = 0; i < name.length; i++) {
        console.log(name.charCodeAt(i));
        color = color + name.charCodeAt(i);
    }
    console.log("#" + color);
    return "#" + color;
}

const Scheduler = () => {
    const {t} = useTranslation();
    const itemsFromBackend = [
        {
            id: 'free',
            content: "Free"
        },
        {
            id: uid(),
            content: "Mathematics"
        },
        {
            id: uid(),
            content: "English"
        }
    ];
    const columnsFromBackend =
        {
            ['first']: {
                name: 'Subjects',
                items: itemsFromBackend
            },
            [uid()]: {
                name: 'Monday',
                items: []
            },
            [uid()]: {
                name: 'Tuesday',
                items: []
            },
            [uid()]: {
                name: 'Wednesday',
                items: []
            },
            [uid()]: {
                name: 'Thursday',
                items: []
            },
            [uid()]: {
                name: 'Friday',
                items: []
            },
            [uid()]: {
                name: 'Saturday',
                items: []
            }
        }
    ;
    const [columns, setColumns] = useState(columnsFromBackend);
    const [dateValue, changeDateValue] = useState(new Date());

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const {source, destination} = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const removed = sourceItems[source.index];
            getHexColorByString(removed.content);
            if (source.droppableId === 'first') {
                destItems.splice(destination.index, 0, {id: uid(), content: removed.content});
            } else {
                const [removed] = sourceItems.splice(source.index, 1);
                if (destination.droppableId !== 'first') {
                    destItems.splice(destination.index, 0, removed);
                }
            }

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    };

    useEffect(() => {
        console.log(dateValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateValue]);

    return (
        <div style={{display: "inline-flex", justifyContent: "center", height: "100%"}}>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >
                            <h2>{t(column.name)}</h2>
                            <div style={{margin: 8}}>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver
                                                        ? "lightblue"
                                                        : "lightgrey",
                                                    padding: 4,
                                                    width: 250,
                                                    minHeight: 500
                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect: "none",
                                                                            padding: 16,
                                                                            margin: "0 0 8px 0",
                                                                            minHeight: "50px",
                                                                            backgroundColor: snapshot.isDragging
                                                                                ? (item.content === 'Free' ? "#088A08" : "#263B4A")
                                                                                : (item.content === 'Free' ? "#04B431" : "#456C86"),
                                                                            color: "white",
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        {index+1 + ". "+ item.content}
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}

export default Scheduler