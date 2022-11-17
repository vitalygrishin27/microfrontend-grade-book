import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    deleteUserAsync,
    loadUserListAsync
} from "../redux/reducers/user/user.thunks";
import {loginInAsyncByToken} from "../redux/reducers/login/login.thunks";
import {toast} from "react-toastify";
import {setToastShowing} from "../redux/reducers/common/common.thunks";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faPlus, faRemove} from '@fortawesome/free-solid-svg-icons';
import ConfirmDelete from "./ConfirmDelete";
import {AccessLevelFilter, UserType} from "../types/types";
import UserForm from "./UserForm";
import {Spinner} from "react-bootstrap";
import Switch from "react-switch";

const edit = <FontAwesomeIcon icon={faEdit}/>
const remove = <FontAwesomeIcon icon={faRemove}/>
const plus = <FontAwesomeIcon icon={faPlus}/>


const User = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {isToastShowing} = useSelector(state => state.common);
    const {
        isUserListLoading,
        users,
        error,
        isUserCreating,
        isUserDeleting,
        isUserEditing
    } = useSelector(state => state.users);
    const [isAddingNew, changeAddingNew] = useState(false);
    const [entity, setEntity] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUserFormOpen, setModalUserFormOpen] = useState(false);
    const [entityForDelete, setEntityForDelete] = useState(null);
    const [needToSort, setNeedToSort] = useState(true);
    const [accessFilterSelected, setAccessFilterSelected] = useState(AccessLevelFilter.ALL);
    const [search, setSearch] = useState("");


    useEffect(() => {
        dispatch(loginInAsyncByToken());
        if (!users) {
            dispatch(loadUserListAsync(accessFilterSelected, needToSort, search))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(t(error))
                dispatch(setToastShowing(false));
                if (error === "GBE-ACCESS-001") navigate("/");
            } else if (!isUserListLoading) {
                changeAddingNew(false);
                setModalUserFormOpen(false);
                setEntity(null);
                dispatch(setToastShowing(false));
            }
        }
    }, [isUserListLoading, isUserCreating, isUserDeleting, isUserEditing])

    useEffect(() => {
        dispatch(loadUserListAsync(accessFilterSelected, needToSort, search))
    }, [needToSort, accessFilterSelected]);

    const handleEditButton = (entity) => {
        changeAddingNew(false);
        setEntity(entity);
        setModalUserFormOpen(true);
    }

    const handleDeleteButton = (user) => {
        setModalOpen(true);
        setEntityForDelete(user)
    }

    const handleSearchButton = () => {
        dispatch(loadUserListAsync(accessFilterSelected, needToSort, search))
    }

    return (
        <div className={"container"}>
            {modalOpen &&
                <ConfirmDelete modalOpen={modalOpen}
                               setModalOpen={setModalOpen}
                               entityForDelete={entityForDelete}
                               setEntityForDelete={setEntityForDelete}
                               functionToExecute={deleteUserAsync}/>}
            {modalUserFormOpen &&
                <UserForm modalUserFormOpen={modalUserFormOpen}
                          setModalUserFormOpen={setModalUserFormOpen}
                          entity={entity}
                          setEntity={setEntity}
                          isNew={isAddingNew}/>}
            <div className={"row"}>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"pageTitle col-md-10 mx-auto mb-3"}>{t("Users")}</h1>
                    <table className={"table-hover"}>
                        <thead className={"text-dark text-left"}>
                        <tr>
                            <th>{t("Filters")}</th>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>
                                <button type="button"
                                        onClick={() => setAccessFilterSelected(AccessLevelFilter.ALL)}
                                        className="btn btn-small btn-success mb-1">{t("All")}</button>
                            </th>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>
                                <button type="button"
                                        onClick={() => setAccessFilterSelected(AccessLevelFilter.ADMIN)}
                                        className="btn btn-small btn-success mb-1">{t("Admins")}</button>
                            </th>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>
                                <button type="button"
                                        onClick={() => setAccessFilterSelected(AccessLevelFilter.TEACHER)}
                                        className="btn btn-small btn-success mb-1">{t("Teachers")}</button>
                            </th>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>
                                <button type="button"
                                        onClick={() => setAccessFilterSelected(AccessLevelFilter.PUPIL)}
                                        className="btn btn-small btn-success mb-1">{t("Pupils")}</button>
                            </th>
                            <th>{t("Sorting")}</th>
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
                                <div>{t("Last name")}</div>
                            </th>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>
                                <div>{t("First name")}</div>
                            </th>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>
                                <div>{t("Second name")}</div>
                            </th>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>
                                <div>{t("Login")}</div>
                            </th>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>
                                <div>{t("Access level")}</div>
                            </th>
                            <th scope={"col"} style={{"verticalAlign": "middle"}}>
                                <div>{t("Class")}</div>
                            </th>
                            <th width={"20%"}>
                                <div style={{textAlign: "right"}}>
                                    <button type="button" onClick={() => {
                                        changeAddingNew(true);
                                        setEntity(null);
                                        setModalUserFormOpen(true);
                                    }}
                                            className="awesomeButton btn btn-small btn-success mb-1">{plus}</button>
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody style={{textAlign: "left"}}>
                        {isUserListLoading && <tr>
                            <td colSpan={8}>
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
                        {users && users.map((user: UserType, id) => (
                            <tr key={id}>
                                <td style={{verticalAlign: "middle"}}>{id + 1}</td>
                                <td style={{verticalAlign: "middle"}}>{user.lastName}</td>
                                <td style={{verticalAlign: "middle"}}>{user.firstName}</td>
                                <td style={{verticalAlign: "middle"}}>{user.secondName}</td>
                                <td style={{verticalAlign: "middle"}}>{user.login}</td>
                                <td style={{verticalAlign: "middle"}}>{user.accessLevel}</td>
                                <td style={{verticalAlign: "middle"}}>{user.clazz ? user.clazz.name : "-"}</td>
                                <td style={{textAlign: "right"}}>
                                    <div style={{display: "inline"}}>
                                        <button type="button" onClick={() => handleEditButton(user)}
                                                className="awesomeButton btn btn-small btn-warning mb-1">{edit}</button>
                                        <button type="button" onClick={() => handleDeleteButton(user)}
                                                className="awesomeButton btn btn-small btn-danger mb-1">{remove}</button>
                                    </div>
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
export default User