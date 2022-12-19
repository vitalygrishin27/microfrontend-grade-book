import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    createClazzAsync,
    deleteClazzAsync,
    loadClazzListAsync,
    updateClazzAsync
} from "../redux/reducers/clazz/clazz.thunks";
import {loginInAsyncByToken} from "../redux/reducers/login/login.thunks";
import {toast} from "react-toastify";
import {setToastShowing} from "../redux/reducers/common/common.thunks";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faPlus, faRemove} from '@fortawesome/free-solid-svg-icons';
import ConfirmDelete from "./ConfirmDelete";
import {isNull} from "lodash";
import {Button, Spinner} from "react-bootstrap";
import Switch from "react-switch";
import User from "./User";
import {AccessLevelFilter} from "../types/types";
import {rootUrl} from "../App";

const edit = <FontAwesomeIcon icon={faEdit}/>
const remove = <FontAwesomeIcon icon={faRemove}/>
const plus = <FontAwesomeIcon icon={faPlus}/>


const Subject = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {isToastShowing, commonError, commonMessage} = useSelector(state => state.common);
    const {
        isClazzListLoading,
        classes,
    } = useSelector(state => state.classes);
    const [isAddingNew, changeAddingNew] = useState(false);
    const [name, setName] = useState("");
    const [nameEditing, setNameEditing] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [entityForDelete, setEntityForDelete] = useState(null);
    const [entityEditing, setEntityEditing] = useState(null);
    const [needToSort, setNeedToSort] = useState(true);
    const [search, setSearch] = useState("");
    const [showPupils, setShowPupils] = useState(null);

    useEffect(() => {
        dispatch(loginInAsyncByToken());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeShowPupils = (clazz) => {
        if (showPupils === null) {
            setShowPupils(clazz);
        } else {
            setShowPupils(null);
        }
    }

    useEffect(() => {
        if (isToastShowing) {
            if (commonError) {
                if (!(t(commonError)).startsWith("GBE")) toast.error(t(commonError))
                dispatch(setToastShowing(false));
                if (commonError === "GBE-ACCESS-001") navigate(rootUrl + "/");
            } else if (!isClazzListLoading) {
                setName("");
                changeAddingNew(false);
                setEntityEditing(null);
                setNameEditing("");
                if (commonMessage) toast.info(t(commonMessage))
                dispatch(setToastShowing(false));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commonError, commonMessage])


    useEffect(() => {
        dispatch(loadClazzListAsync(needToSort, search))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [needToSort])

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            createNew();
        }

    };

    const handleKeypressInEditing = e => {
        //it triggers by pressing the enter key
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            document.getElementById("editButton").click()
        }

    };

    const handleKeypressOnSearch = e => {
        //it triggers by pressing the enter key
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            document.getElementById("searchButton").click()
        }

    };

    const createNew = () => {
        let data = new FormData();
        data.append('name', name);
        dispatch(createClazzAsync(data));
    }

    const handleEditButton = (clazz) => {
        setEntityEditing(clazz);
        changeAddingNew(false);
        setNameEditing(clazz.name);
    }

    const handleCancelButton = () => {
        setEntityEditing(null);
        setNameEditing("");
    }

    const handleSaveChangesButton = (oid, name) => {
        let data = new FormData();
        data.append('OID', oid);
        data.append('name', name);
        dispatch(updateClazzAsync(data));
    }

    const handleDeleteButton = (clazz) => {
        setModalOpen(true);
        setEntityForDelete(clazz)
    }

    const handleSearchButton = () => {
        dispatch(loadClazzListAsync(needToSort, search))
    }

    return (
        <div className={"container"}>
            {showPupils && <div>
                <div>
                    <table className={"table-hover"}>
                        <thead className={"text-dark text-left"}>
                        <tr>
                            <th>{t("Sorting")}</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <User accessFilterSelectedFromProps={AccessLevelFilter.PUPIL}
                      classFromProps={showPupils}/></div>}

            {modalOpen &&
                <ConfirmDelete modalOpen={modalOpen}
                               setModalOpen={setModalOpen}
                               entityForDelete={entityForDelete}
                               setEntityForDelete={setEntityForDelete}
                               functionToExecute={deleteClazzAsync}/>}
            <div className={"row"}>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"pageTitle col-md-10 mx-auto mb-3"}
                    >{t("Classes")}</h1>
                    <table className={"table-hover"}>
                        <thead className={"text-dark text-left"}>
                        <tr>
                            <th>{t("Sorting")}</th>
                            <th>
                                <Switch onChange={setNeedToSort} checked={needToSort}/>
                            </th>
                            <th><input type={"text"}
                                       maxLength={20}
                                       className={"form-control"}
                                       onKeyPress={handleKeypressOnSearch}
                                       value={search} onChange={e => setSearch(e.target.value)}/></th>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>
                                <button type="button"
                                        id="searchButton"
                                        onClick={() => handleSearchButton()}
                                        className="btn btn-small btn-success mb-1">{t("Search")}</button>
                            </th>
                        </tr>
                        </thead>
                    </table>
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-info text-left"}>
                        <tr>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>№</th>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>
                                <div>{t("Title")}</div>
                            </th>
                            <th width={"20%"}>
                                {!isAddingNew && <div style={{textAlign: "right"}}>
                                    <button type="button" onClick={() => {
                                        changeAddingNew(true);
                                        setEntityEditing(null)
                                    }}
                                            className="awesomeButton btn btn-small btn-success mb-1">{plus}</button>
                                </div>}
                            </th>
                        </tr>
                        </thead>
                        <tbody style={{textAlign: "left"}}>
                        {isAddingNew &&
                            <tr>
                                <td/>
                                <td style={{verticalAlign: "middle"}}>
                                    <input style={{width: "100%"}} required
                                           autoFocus={isAddingNew}
                                           maxLength={10}
                                           type="text"
                                           value={name}
                                           onChange={e => setName(e.target.value)}
                                           onKeyPress={handleKeypress}
                                    />
                                </td>
                                <td>
                                    <button type="button" onClick={() => createNew()}
                                            className="actionButton btn btn-small btn-success mb-1">{t("Create")}</button>
                                    <button type="button" onClick={() => changeAddingNew(false)}
                                            className="actionButton btn btn-small btn-danger mb-1">{t("Cancel")}</button>
                                </td>
                            </tr>}
                        {isClazzListLoading && <tr>
                            <td colSpan={3}>
                                <div style={{"textAlign": "center"}}><Spinner
                                    as="span"
                                    animation="border"
                                    size="lg"
                                    role="status"
                                    aria-hidden="true"
                                    variant="dark"/>
                                </div>
                            </td>
                        </tr>}
                        {classes && classes.length < 1 && <tr>
                            <td colSpan={3} style={{textAlign: "center"}}>{t("Nothing to show")}</td>
                        </tr>}
                        {classes && classes.map((clazz, id) => (
                            <tr key={id}>
                                <td style={{verticalAlign: "middle"}}>{id + 1}</td>
                                {!isNull(entityEditing) && entityEditing.oid === clazz.oid ?
                                    (<td style={{verticalAlign: "middle"}}>

                                        <input style={{width: "100%"}} required
                                               autoFocus={!isNull(entityEditing)}
                                               maxLength={10}
                                               type="text"
                                               value={nameEditing}
                                               onKeyPress={handleKeypressInEditing}
                                               onChange={e => setNameEditing(e.target.value)}/>
                                    </td>) :
                                    (
                                        <td style={{verticalAlign: "middle"}}>
                                            {clazz.name}
                                            <Button size="sm"
                                                    disabled={showPupils != null && showPupils.oid !== clazz.oid}
                                                    variant={showPupils != null && showPupils.oid === clazz.oid ? "danger" : "secondary"}
                                                    style={{"marginLeft": "20px"}}
                                                    onClick={() => handleChangeShowPupils(clazz)}
                                            >{t("Show pupils")}</Button>
                                        </td>

                                    )

                                }
                                <td style={{textAlign: "right"}}>
                                    {!isNull(entityEditing) && entityEditing.oid === clazz.oid ? (
                                        <div style={{display: "inline"}}>
                                            <button type="button" id="editButton"
                                                    onClick={() => handleSaveChangesButton(clazz.oid, nameEditing)}
                                                    className="btn btn-small btn-success mb-1">{t("Save")}</button>
                                            <button type="button" onClick={() => handleCancelButton(clazz)}
                                                    className="btn btn-small btn-danger mb-1">{t("Cancel")}</button>
                                        </div>) : (
                                        <div style={{display: "inline"}}>
                                            <button type="button" onClick={() => handleEditButton(clazz)}
                                                    className="awesomeButton btn btn-small btn-warning mb-1">{edit}</button>
                                            <button type="button" onClick={() => handleDeleteButton(clazz)}
                                                    className="awesomeButton btn btn-small btn-danger mb-1">{remove}</button>
                                        </div>)
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}
export default Subject