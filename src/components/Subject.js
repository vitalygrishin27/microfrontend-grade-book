import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    createSubjectAsync,
    deleteSubjectAsync,
    loadSubjectListAsync,
    updateSubjectAsync
} from "../redux/reducers/subject/subject.thunks";
import {loginInAsyncByToken} from "../redux/reducers/login/login.thunks";
import {toast} from "react-toastify";
import {setToastShowing} from "../redux/reducers/common/common.thunks";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faPlus, faRemove} from '@fortawesome/free-solid-svg-icons';
import ConfirmDelete from "./ConfirmDelete";
import {isNull} from "lodash";
import {Spinner} from "react-bootstrap";
import Switch from "react-switch";

const edit = <FontAwesomeIcon icon={faEdit}/>
const remove = <FontAwesomeIcon icon={faRemove}/>
const plus = <FontAwesomeIcon icon={faPlus}/>


const Subject = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {isToastShowing} = useSelector(state => state.common);
    const {
        isSubjectListLoading,
        subjects,
        error,
        isSubjectCreating,
        isSubjectDeleting,
        isSubjectEditing
    } = useSelector(state => state.subjects);
    const [isAddingNew, changeAddingNew] = useState(false);
    const [name, setName] = useState("");
    const [nameEditing, setNameEditing] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [entityForDelete, setEntityForDelete] = useState(null);
    const [entityEditing, setEntityEditing] = useState(null);
    const [needToSort, setNeedToSort] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(loginInAsyncByToken());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(loadSubjectListAsync(needToSort, search));
    }, [needToSort]);

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(t(error))
                dispatch(setToastShowing(false));
                if (error === "GBE-ACCESS-001") navigate("/");
            } else if (!isSubjectListLoading) {
                setName("");
                changeAddingNew(false);
                setEntityEditing(null);
                setNameEditing("");
                // toast.success(t("Login in is successful!"))
                dispatch(setToastShowing(false));
                // navigate("/");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubjectListLoading, isSubjectCreating, isSubjectDeleting, isSubjectEditing])

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

    const createNew = () => {
        let data = new FormData();
        data.append('name', name);
        dispatch(createSubjectAsync(data));
    }

    const handleEditButton = (subject) => {
        setEntityEditing(subject);
        changeAddingNew(false);
        setNameEditing(subject.name);
    }

    const handleCancelButton = () => {
        setEntityEditing(null);
        setNameEditing("");
    }

    const handleSaveChangesButton = (oid, name) => {
        let data = new FormData();
        data.append('OID', oid);
        data.append('name', name);
        dispatch(updateSubjectAsync(data));
    }

    const handleDeleteButton = (subject) => {
        setModalOpen(true);
        setEntityForDelete(subject)
    }
    const handleSearchButton = () => {
        dispatch(loadSubjectListAsync(needToSort, search))
    }

    return (
        <div className={"container"}>
            {modalOpen &&
                <ConfirmDelete modalOpen={modalOpen}
                               setModalOpen={setModalOpen}
                               entityForDelete={entityForDelete}
                               setEntityForDelete={setEntityForDelete}
                               functionToExecute={deleteSubjectAsync}/>}
            <div className={"row"}>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"pageTitle col-md-10 mx-auto mb-3"}
                    >{t("Subjects")}</h1>
                    <table className={"table-hover"}>
                        <thead className={"text-dark text-left"}>
                        <tr>
                            <th>{t("Sorting: ")}</th>
                            <th>
                                <Switch onChange={setNeedToSort} checked={needToSort}/>
                            </th>
                            <th><input type={"text"}
                                       maxLength={20}
                                       className={"form-control"}
                                       value={search} onChange={e => setSearch(e.target.value)}/></th>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>
                                <button type="button"
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
                        {isSubjectListLoading && <tr>
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
                        {isAddingNew &&
                            <tr>
                                <td/>
                                <td style={{verticalAlign: "middle"}}>
                                    <input style={{width: "100%"}} required
                                           maxLength={30}
                                           autoFocus={isAddingNew}
                                           type="text"
                                           value={name}
                                           onKeyPress={handleKeypress}
                                           onChange={e => setName(e.target.value)}/>
                                </td>
                                <td>
                                    <button type="button" onClick={() => createNew()}
                                            className="actionButton btn btn-small btn-success mb-1">{t("Create")}</button>
                                    <button type="button" onClick={() => changeAddingNew(false)}
                                            className="actionButton btn btn-small btn-danger mb-1">{t("Cancel")}</button>
                                </td>
                            </tr>}
                        {subjects && subjects.map((subject, id) => (
                            <tr key={id}>
                                <td style={{verticalAlign: "middle"}}>{id + 1}</td>
                                {!isNull(entityEditing) && entityEditing.oid === subject.oid ?
                                    (<td style={{verticalAlign: "middle"}}>

                                        <input style={{width: "100%"}} required
                                               autoFocus={!isNull(entityEditing)}
                                               maxLength={30}
                                               type="text"
                                               value={nameEditing}
                                               onKeyPress={handleKeypressInEditing}
                                               onChange={e => setNameEditing(e.target.value)}/>
                                    </td>) :
                                    (
                                        <td style={{verticalAlign: "middle"}}>
                                            {subject.name}</td>)
                                }
                                <td style={{textAlign: "right"}}>
                                    {!isNull(entityEditing) && entityEditing.oid === subject.oid ? (
                                        <div style={{display: "inline"}}>
                                            <button type="button" id="editButton"
                                                    onClick={() => handleSaveChangesButton(subject.oid, nameEditing)}
                                                    className="btn btn-small btn-success mb-1">{t("Save")}</button>
                                            <button type="button" onClick={() => handleCancelButton(subject)}
                                                    className="btn btn-small btn-danger mb-1">{t("Cancel")}</button>
                                        </div>) : (
                                        <div style={{display: "inline"}}>
                                            <button type="button" onClick={() => handleEditButton(subject)}
                                                    className="awesomeButton btn btn-small btn-warning mb-1">{edit}</button>
                                            <button type="button" onClick={() => handleDeleteButton(subject)}
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