import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createUserAsync, loadAccessLevelsAsync, updateUserAsync} from "../redux/reducers/user/user.thunks";
import {AccessLevelFilter} from "../types/types";
import {loadClazzListAsync} from "../redux/reducers/clazz/clazz.thunks";
import {isNull} from "lodash";

const UserForm = ({modalUserFormOpen, setModalUserFormOpen, entity, setEntity, isNew}) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        setEntity(null);
        setModalUserFormOpen(false);
    }
    const {
        accessLevels
    } = useSelector(state => state.users);
    const {
        classes
    } = useSelector(state => state.classes);
    const handleSubmit = (e) => {
        e.preventDefault();
        const clazz = {
            oid: clazzId
        }
        const data = {
            oid: isNull(entity) ? null : entity.oid,
            lastName: lastName,
            firstName: firstName,
            secondName: secondName,
            login: login,
            password: password,
            accessLevel: accessLevel,
            clazz: clazz
        }

        console.log(data);
        console.log(isNew);
        /*  for (const pair of data.entries()) {
              console.log(pair[0] + ', ' + pair[1]);
          }*/
        if (isNew) {
            console.log("CREATING");
            dispatch(createUserAsync(data));
        } else {
            console.log("UPDATING");
            dispatch(updateUserAsync(data));
        }
    }

    useEffect(() => {
        if (!accessLevels) {
            dispatch(loadAccessLevelsAsync())
        }
        if (!accessLevels) {
            dispatch(loadClazzListAsync())
            console.log(accessLevel)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {t} = useTranslation();
    const [firstName, setFirstName] = useState(entity ? entity.firstName : "");
    const [secondName, setSecondName] = useState(entity ? entity.secondName : "");
    const [lastName, setLastName] = useState(entity ? entity.lastName : "");
    const [login, setLogin] = useState(entity ? entity.login : "");
    const [password, setPassword] = useState(entity ? entity.password : "");
    const [accessLevel, setAccessLevel] = useState(entity ? entity.accessLevel : "");
    const [clazzId, setClazzId] = useState(entity && entity.clazz ? entity.clazz.oid : "");

    return (
        <div>
            <Modal show={modalUserFormOpen}>
                <Modal.Header>
                    <Modal.Title>{t("User")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className={"form-group mb-2"}>
                            <select required id="combo" className={"form-control"}
                                    value={accessLevel} onChange={e => setAccessLevel(e.target.value)}>
                                <option value={''}> -- {t("select access level")} --</option>
                                {accessLevels && accessLevels.map((accessLevel, id) => (

                                    <option key={id} value={accessLevel.level}
                                            className={"mr-1"}> {t(accessLevel.name)}</option>

                                ))}
                            </select>
                        </div>
                        {accessLevel !== "" &&
                            <div>
                                <div className={"form-group mb-2"}>
                                    <input required type={"text"} placeholder={t("Last name")}
                                           className={"form-control"}
                                           value={lastName} onChange={e => setLastName(e.target.value)}/>
                                </div>
                                <div className={"form-group mb-2"}>
                                    <input required type={"text"} placeholder={t("First name")}
                                           className={"form-control"}
                                           value={firstName} onChange={e => setFirstName(e.target.value)}/>
                                </div>
                                <div className={"form-group mb-2"}>
                                    <input required type={"text"} placeholder={t("Second name")}
                                           className={"form-control"}
                                           value={secondName} onChange={e => setSecondName(e.target.value)}/>
                                </div>
                                <div className={"form-group mb-2"}>
                                    <input required type={"text"} placeholder={t("Login")} className={"form-control"}
                                           value={login} onChange={e => setLogin(e.target.value)}/>
                                </div>
                                <div className={"form-group mb-2"}>
                                    <input required type={"password"} placeholder={t("Password")}
                                           className={"form-control"}
                                           value={password} onChange={e => setPassword(e.target.value)}/>
                                </div>
                                {accessLevel && accessLevel === AccessLevelFilter.PUPIL &&
                                    <div className={"form-group mb-2"}>
                                        <select required id="combo1" className={"form-control"}
                                                value={clazzId} onChange={e => setClazzId(e.target.value)}>
                                            <option value={''}> -- {t("select class")} --</option>
                                            {classes && classes.map((clazz, id) => (

                                                <option key={id} value={clazz.oid}
                                                        className={"mr-1"}> {t(clazz.name)}</option>

                                            ))}
                                        </select>
                                    </div>}
                                {accessLevel && accessLevel === AccessLevelFilter.TEACHER &&
                                    <div className={"form-group mb-2"}>
                                        <select id="combo2" className={"form-control"}
                                                value={isNull(clazzId) ? "" : clazzId}
                                                onChange={e => setClazzId(e.target.value)}>
                                            <option value={""}> -- {t("select class if form-master")} --</option>
                                            {classes && classes.map((clazz, id) => (

                                                <option key={id} value={clazz.oid}
                                                        className={"mr-1"}> {t(clazz.name)}</option>

                                            ))}
                                        </select>
                                    </div>}
                                <div className={"form-group"} style={{"textAlign": "right"}}>
                                    <input type={"submit"} value={isNew ? t("Create") : t("Save")}
                                           className={"btn btn-primary"}
                                    />
                                    <Button variant="danger" onClick={handleClose}>
                                        {t("Cancel")}
                                    </Button>
                                </div>
                            </div>}
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default UserForm