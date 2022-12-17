import React, {useEffect, useState} from "react";
import 'react-calendar/dist/Calendar.css';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {uid} from "uid";
import {useTranslation} from "react-i18next";
import {loginInAsyncByToken} from "../redux/reducers/login/login.thunks";
import {loadSubjectListAsync} from "../redux/reducers/subject/subject.thunks";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import actions from "../redux/reducers/scheduler/scheduler.actions";
import {toast} from "react-toastify";
import {setToastShowing} from "../redux/reducers/common/common.thunks";
import {rootUrl} from "../App";


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
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [needToSort, setNeedToSort] = useState(true);
    const {
        isSubjectListLoading,
        subjects,
    } = useSelector(state => state.subjects);
    const {
        columns,
    } = useSelector(state => state.scheduler);
    const {
        error,
        isLoginIn,
    } = useSelector(state => state.login);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const {isToastShowing} = useSelector(state => state.common);

    useEffect(() => {
        console.log("111111")
        dispatch(loginInAsyncByToken());
        if (!subjects) dispatch(loadSubjectListAsync(needToSort, search));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (subjects)
            dispatch(actions.subjectListIsLoaded(subjects))
    }, [subjects]);

    const [dateValue, changeDateValue] = useState(new Date());
    const onDragEnd = (result, columns) => {
        if (!result.destination) return;
        const {source, destination} = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const removed = sourceItems[source.index];
            // getHexColorByString(removed.content);
            if (source.droppableId === 'first') {
                destItems.splice(destination.index, 0, {schedulerInternalId: uid(), name: removed.name});
            } else {
                const [removed] = sourceItems.splice(source.index, 1);
                if (destination.droppableId !== 'first') {
                    destItems.splice(destination.index, 0, removed);
                }
            }

            dispatch(actions.schedulerWasChanged({
                columns,
                source,
                sourceColumn,
                sourceItems,
                destination,
                destColumn,
                destItems
            }))

            /*     setColumns({
                     ...columns,
                     [source.droppableId]: {
                         ...sourceColumn,
                         items: sourceItems
                     },
                     [destination.droppableId]: {
                         ...destColumn,
                         items: destItems
                     }
                 });*/
        } else {
            /*  const column = columns[source.droppableId];
              const copiedItems = [...column.items];
              const [removed] = copiedItems.splice(source.index, 1);
              copiedItems.splice(destination.index, 0, removed);
              setColumns({
                  ...columns,
                  [source.droppableId]: {
                      ...column,
                      items: copiedItems
                  }
              });*/
        }
    };

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(t(error))
                dispatch(setToastShowing(false));
                if (error === "GBE-ACCESS-001") navigate(rootUrl+"/");
            } else  {
                dispatch(setToastShowing(false));
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoginIn, isSubjectListLoading, error])

    useEffect(() => {
        console.log(dateValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateValue]);

    return (
        <div style={{display: "inline-flex", justifyContent: "center", height: "100%"}}>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns)}
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
                                                {column.items && column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.schedulerInternalId}
                                                            draggableId={item.schedulerInternalId}
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
                                                                                ? (item.name === 'Free' ? "#088A08" : "#263B4A")
                                                                                : (item.name === 'Free' ? "#04B431" : "#456C86"),
                                                                            color: "white",
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        {index + 1 + ". " + item.name}
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