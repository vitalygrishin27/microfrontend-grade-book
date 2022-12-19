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
import {setToastShowing, showError} from "../redux/reducers/common/common.thunks";
import {rootUrl} from "../App";
import {Badge, Dropdown, DropdownButton} from "react-bootstrap";
import {createSchedulerAsync, dataLoadingStarts} from "../redux/reducers/scheduler/scheduler.thunks";
import {loadClazzListAsync} from "../redux/reducers/clazz/clazz.thunks";

const Scheduler = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {isToastShowing, commonError, commonMessage} = useSelector(state => state.common);
    const {
        classes,
    } = useSelector(state => state.classes);
    const {
        isDataLoading,
        columns,
        unsavedChangesPresent
    } = useSelector(state => state.scheduler);

    useEffect(() => {
        dispatch(loginInAsyncByToken());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        dispatch(loadClazzListAsync(true, ""));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoading]);

    useEffect(() => {
        if (isToastShowing) {
            if (commonError) {
                if (!(t(commonError)).startsWith("GBE")) toast.error(t(commonError))
                dispatch(setToastShowing(false));
                if (commonError === "GBE-ACCESS-001") navigate(rootUrl + "/");
            } else if (commonMessage) {
                toast.info(t(commonMessage))
                dispatch(setToastShowing(false));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commonError, commonMessage])

    const [selectedClass, setSelectedClassClass] = useState(null);
    const handleSelect = (key, event) => {
        setSelectedClassClass({oid: key, name: event.target.innerText});
        dispatch(dataLoadingStarts(key));
    };

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
            if (source.droppableId === 'Subjects' && removed.name !== "Free" && removed.selectedTeacher === null) {
                dispatch(showError(t("Choose a teacher")))
                return;
            }
            const determinedTeacher = [];
            determinedTeacher.push(removed.selectedTeacher)
            if (source.droppableId === 'Subjects') {
                destItems.splice(destination.index, 0, {
                    schedulerInternalId: uid(),
                    name: removed.name,
                    oid: removed.oid,
                    teachers: removed.name !== "Free" ? determinedTeacher : removed.teachers,
                    selectedTeacher: removed.selectedTeacher
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
        }
    };


    /*  const getHexColorByString = (name) => {

          let color = 0
          for (let i = 0; i < name.length; i++) {
              console.log(name.charCodeAt(i));
              color = color + name.charCodeAt(i);
          }
          console.log("#" + color);
          return "#" + color;
      }*/
    const handleSaveButton = () => {
        const s1 = []
        // eslint-disable-next-line
        Object.entries(columns).map(([columnId, column], index) => {
                let items = [];

                // eslint-disable-next-line
                Object.entries(column.items).map(([columnItemId, item], index) => {
                    console.log(item)
                    items.push({
                        subjectOid: item.oid,
                        selectedTeacherOid: item.teachers && item.teachers.length > 0 ? item.teachers[0].oid : null
                    })
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

        console.log(scheduler)
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
                                                                            <div>{index + 1 + ". " + item.name}</div>
                                                                            <div>
                                                                                {item.teachers && item.teachers.map((teacher, index) => {
                                                                                    return (
                                                                                        <div key={index}
                                                                                             style={{textAlign: "right"}}>
                                                                                            <label
                                                                                                style={{
                                                                                                    marginLeft: 30,
                                                                                                    whiteSpace: "nowrap"
                                                                                                }}><input
                                                                                                type={"radio"}
                                                                                                hidden={item.teachers.length === 1}

                                                                                                onChange={() => item.selectedTeacher = teacher}
                                                                                                name={item.schedulerInternalId}
                                                                                                value={teacher}
                                                                                                className={"mx-1 my-2"}/><Badge
                                                                                                bg="secondary">{teacher.lastName + " " + teacher.firstName.charAt(0) + "."}</Badge>
                                                                                            </label></div>)
                                                                                })}</div>
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