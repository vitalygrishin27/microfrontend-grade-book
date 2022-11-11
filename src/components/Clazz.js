import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
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
import {Spinner} from "react-bootstrap";

const edit = <FontAwesomeIcon icon={faEdit}/>
const remove = <FontAwesomeIcon icon={faRemove}/>
const plus = <FontAwesomeIcon icon={faPlus}/>


const Subject = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {isToastShowing} = useSelector(state => state.common);
    const {
        isClazzListLoading,
        classes,
        error,
        isClazzCreating,
        isClazzDeleting,
        isClazzEditing
    } = useSelector(state => state.classes);
    const [isAddingNew, changeAddingNew] = useState(false);
    const [name, setName] = useState("");
    const [nameEditing, setNameEditing] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [entityForDelete, setEntityForDelete] = useState(null);
    const [entityEditing, setEntityEditing] = useState(null);

    useEffect(() => {
        dispatch(loginInAsyncByToken());
        if (!classes) {
            dispatch(loadClazzListAsync())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(t(error))
                dispatch(setToastShowing(false));
                if (error === "GBE-ACCESS-001") navigate("/");
            } else if (!isClazzListLoading) {
                setName("");
                changeAddingNew(false);
                setEntityEditing(null);
                setNameEditing("");
                // toast.success(t("Login in is successful!"))
                dispatch(setToastShowing(false));
                // navigate("/");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClazzListLoading, isClazzCreating, isClazzDeleting, isClazzEditing])

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

    return (
        <div className={"container"}>
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
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-info text-left"}>
                        <tr>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>№</th>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>
                                <div>{t("Title")}</div>
                            </th>
                            <th width={"20%"}>
                                {!isAddingNew && <div style={{textAlign: "right"}}>
                                    <button type="button" onClick={() => {changeAddingNew(true); setEntityEditing(null)}}
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
                                           type="text"
                                           value={name}
                                           onChange={e=>setName(e.target.value)}
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
                        {isClazzListLoading && <tr><td colSpan={3}><div style={{"textAlign": "center"}}><Spinner
                            as="span"
                            animation="border"
                            size="lg"
                            role="status"
                            aria-hidden="true"
                            variant="dark"/>
                        </div></td></tr>}
                        {classes && classes.map((clazz, id) => (
                            <tr key={id}>
                                <td style={{verticalAlign: "middle"}}>{id + 1}</td>
                                {!isNull(entityEditing) && entityEditing.oid === clazz.oid ?
                                    (<td style={{verticalAlign: "middle"}}>

                                        <input style={{width: "100%"}} required
                                               autoFocus={!isNull(entityEditing)}
                                               type="text"
                                               value={nameEditing}
                                               onKeyPress={handleKeypressInEditing}
                                               onChange={e => setNameEditing(e.target.value)}/>
                                    </td>) :
                                    (
                                        <td style={{verticalAlign: "middle"}}>
                                            {clazz.name}</td>)
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