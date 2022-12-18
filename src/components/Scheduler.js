import React, {useEffect, useState} from "react";
import 'react-calendar/dist/Calendar.css';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {uid} from "uid";
import {useTranslation} from "react-i18next";
import {loginInAsyncByToken} from "../redux/reducers/login/login.thunks";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import actions from "../redux/reducers/scheduler/scheduler.actions";
import {toast} from "react-toastify";
import {setToastShowing} from "../redux/reducers/common/common.thunks";
import {rootUrl} from "../App";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {dataLoadingStarts} from "../redux/reducers/scheduler/scheduler.thunks";

const Scheduler = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {isToastShowing} = useSelector(state => state.common);
    const [needToSort, setNeedToSort] = useState(true);
    const {
        classes,
    } = useSelector(state => state.classes);
    const {
        isDataLoading,
        error,
        columns,
    } = useSelector(state => state.scheduler);
    const [search, setSearch] = useState("");


    useEffect(() => {
        dispatch(loginInAsyncByToken());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        dispatch(dataLoadingStarts(needToSort, search));
    }, [needToSort]);

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                if (t(error) !== "GBE-ACCESS-001")
                    toast.error(t(error))
                dispatch(setToastShowing(false));
                if (error === "GBE-ACCESS-001") navigate(rootUrl + "/");
            } else if (!isDataLoading) {
                dispatch(setToastShowing(false));
            }
        }
    }, [isDataLoading])

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
            if (source.droppableId === 'subjects') {
                destItems.splice(destination.index, 0, {schedulerInternalId: uid(), name: removed.name});
            } else {
                const [removed] = sourceItems.splice(source.index, 1);
                if (destination.droppableId !== 'subjects') {
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
        } else {
        }
    };

    useEffect(() => {
        console.log(dateValue)
    }, [dateValue]);

    const [selected, setSelected] = useState(null);
    const handleSelect = (key, event) => {
        setSelected({key, name: event.target.value});
        console.log("selected=")
        console.log(key)
    };

    const getHexColorByString = (name) => {

        let color = 0
        for (let i = 0; i < name.length; i++) {
            console.log(name.charCodeAt(i));
            color = color + name.charCodeAt(i);
        }
        console.log("#" + color);
        return "#" + color;
    }
    return (
        <div>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-md-10 mx-auto mt-3"}>
                        <h1 className={"pageTitle col-md-10 mx-auto mb-3"}
                        >{t("Scheduler")}</h1>
                    </div>
                    <DropdownButton
                        id="dropdown-basic-button"
                        variant="info"
                        className="floatRight"
                        onSelect={handleSelect}
                        title={selected?.key || t("Choose a class")}
                    >
                        {classes && classes.map((item, index) => {
                            return (
                                <Dropdown.Item key={index} eventKey={item.name}>
                                    {item.name}
                                </Dropdown.Item>
                            );
                        })}
                    </DropdownButton>

                </div>
            </div>
            <div style={{display: "inline-flex", justifyContent: "center", height: "100%"}}>
                {selected && <DragDropContext
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
                </DragDropContext>}
            </div>
        </div>
    );
}

export default Scheduler