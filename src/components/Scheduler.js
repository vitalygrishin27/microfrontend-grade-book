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
import {createSchedulerAsync, dataLoadingStarts} from "../redux/reducers/scheduler/scheduler.thunks";
import {loadClazzListAsync} from "../redux/reducers/clazz/clazz.thunks";

const Scheduler = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {isToastShowing, commonError} = useSelector(state => state.common);
    const [needToSort, setNeedToSort] = useState(true);
    const {
        classes,
        error: classError
    } = useSelector(state => state.classes);
    const {
        isLoading,
    } = useSelector(state => state.login);
    const {
        isDataLoading,
        isSchedulerCreating,
        error,
        columns,
        unsavedChangesPresent
    } = useSelector(state => state.scheduler);


    const [search, setSearch] = useState("");


    useEffect(() => {
        dispatch(loginInAsyncByToken());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        dispatch(loadClazzListAsync(needToSort, search));
        //  dispatch(dataLoadingStarts(needToSort, search));
    }, [needToSort]);

    useEffect(() => {
        console.log("11111")
        console.log(isToastShowing)
        console.log(classError)
        console.log(commonError)
        console.log(error)
        if (isToastShowing) {
            if (classError) {
                toast.error(t(classError))
                dispatch(setToastShowing(false));
                if (classError === "GBE-ACCESS-001") navigate(rootUrl + "/");
            }
            if (commonError) {
                toast.error(t(commonError))
                dispatch(setToastShowing(false));
                if (commonError === "GBE-ACCESS-001") navigate(rootUrl + "/");
            }


            if (error) {
                if (t(error) !== "GBE-ACCESS-001")
                    toast.error(t(error))
                dispatch(setToastShowing(false));
                if (error === "GBE-ACCESS-001") navigate(rootUrl + "/");
            }
        }
    }, [isLoading, isDataLoading, isSchedulerCreating, error, commonError, classError])

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
            if (source.droppableId === 'Subjects') {
                destItems.splice(destination.index, 0, {
                    schedulerInternalId: uid(),
                    name: removed.name,
                    oid: removed.oid
                });
            } else {
                const [removed] = sourceItems.splice(source.index, 1);
                if (destination.droppableId !== 'Subjects') {
                    destItems.splice(destination.index, 0, removed);
                }
            }

            dispatch(actions.schedulerWasChangedBetweenColumns({
                columns,
                source,
                sourceColumn,
                sourceItems,
                destination,
                destColumn,
                destItems
            }))
        } else {
            dispatch(actions.schedulerWasChangedInsideColumn({
                columns, source, destination
            }))
            /*      const column = columns[source.droppableId];
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
        console.log(dateValue)
    }, [dateValue]);

    const [selectedClass, setSelectedClassClass] = useState(null);
    const handleSelect = (key, event) => {
        setSelectedClassClass({oid: key, name: event.target.innerText});
        dispatch(dataLoadingStarts(key));
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

    const handleSaveButton = () => {


        console.log(columns);
        const s1 = []
        console.log(s1);
        Object.entries(columns).map(([columnId, column], index) => {
                let items = [];
                console.log(column)
                Object.entries(column.items).map(([columnItemId, item], index) => {
                    items.push(item.oid)
                })
                s1.push({name: column.name, items: items})
            }
        )
        let scheduler = {
            clazz: selectedClass,
            daySchedulerBomList: s1
        }


        //    let scheduler = new FormData();
        //    scheduler.append('clazz', selectedClass);
        //     scheduler.append('daySchedulerBomList', s1);


        console.log(scheduler);
        console.log("!!!!!!!!!");
        console.log(s1);
        console.log("save");
        dispatch(createSchedulerAsync(scheduler));
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
                        title={selectedClass?.name || t("Choose a class")}
                    >
                        {classes && classes.map((item, index) => {
                            return (
                                <Dropdown.Item key={index} eventKey={item.oid}>
                                    {item.name}
                                </Dropdown.Item>
                            );
                        })}
                    </DropdownButton>
                    {unsavedChangesPresent && <button type="button"
                                                      id="saveButton"
                                                      onClick={() => handleSaveButton()}
                                                      className="btn btn-small btn-danger mb-1 my-2">{t("Save")}</button>}
                </div>
            </div>
            <div style={{display: "inline-flex", justifyContent: "center", height: "100%"}}>
                {selectedClass && <DragDropContext
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