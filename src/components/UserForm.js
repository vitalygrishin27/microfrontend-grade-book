import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Button, CloseButton, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createUserAsync, loadAccessLevelsAsync, updateUserAsync} from "../redux/reducers/user/user.thunks";
import {AccessLevelFilter} from "../types/types";
import {loadClazzListAsync} from "../redux/reducers/clazz/clazz.thunks";
import {isNull} from "lodash";
import {loadSubjectListAsync} from "../redux/reducers/subject/subject.thunks";

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
        subjects
    } = useSelector(state => state.subjects);
    const {
        classes
    } = useSelector(state => state.classes);
    const handleSubmit = (e) => {
        e.preventDefault();
        const clazz = {
            oid: clazzId
        }
        console.log(selectedSubjects.entries())
        const data = {
            oid: isNull(entity) ? null : entity.oid,
            lastName: lastName,
            firstName: firstName,
            secondName: secondName,
            login: login,
            password: password,
            accessLevel: accessLevel,
            clazz: clazz,
            selectedSubjects: selectedSubjects
        }
        console.log(data)
        /*   for (const pair of data.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }*/
        if (isNew) {
            dispatch(createUserAsync(data));
        } else {
            dispatch(updateUserAsync(data));
        }
    }

    useEffect(() => {
        if (!accessLevels) {
            dispatch(loadAccessLevelsAsync())
            dispatch(loadClazzListAsync(true, ""))
        }
        if (!subjects) {
            dispatch(loadSubjectListAsync(true, ""))
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
    const [selectedSubjects, setSelectedSubjects] = useState(entity ? entity.selectedSubjects : []);

    const handleChangeSelectedSubjects = (subjectOid, selected) => {
        let updatedList = selectedSubjects.slice()
        if (selected) {
            updatedList.push(subjectOid)
        } else {
            updatedList.splice(selectedSubjects.indexOf(subjectOid), 1)
        }
        setSelectedSubjects(updatedList)
    }

    return (
        <div>
            <Modal show={modalUserFormOpen}>
                <Modal.Header>
                    <Modal.Title>{t("User")}</Modal.Title>
                    <CloseButton onClick={handleClose}/>
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
                                           maxLength={20}
                                           className={"form-control"}
                                           value={lastName} onChange={e => setLastName(e.target.value)}/>
                                </div>
                                <div className={"form-group mb-2"}>
                                    <input required type={"text"} placeholder={t("First name")}
                                           maxLength={20}
                                           className={"form-control"}
                                           value={firstName} onChange={e => setFirstName(e.target.value)}/>
                                </div>
                                <div className={"form-group mb-2"}>
                                    <input required type={"text"} placeholder={t("Second name")}
                                           maxLength={20}
                                           className={"form-control"}
                                           value={secondName} onChange={e => setSecondName(e.target.value)}/>
                                </div>
                                <div className={"form-group mb-2"}>
                                    <input required type={"text"} placeholder={t("Login")} className={"form-control"}
                                           maxLength={20}
                                           value={login} onChange={e => setLogin(e.target.value)}/>
                                </div>
                                <div className={"form-group mb-2"}>
                                    <input required type={"password"} placeholder={t("Password")}
                                           maxLength={20}
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
                                                value={isNull(clazzId) ? null : clazzId}
                                                onChange={e => setClazzId(e.target.value)}>
                                            <option value={""}> -- {t("select class if form-master")} --</option>
                                            {classes && classes.map((clazz, id) => (

                                                <option key={id} value={clazz.oid}
                                                        className={"mr-1"}> {t(clazz.name)}</option>

                                            ))}
                                        </select>
                                        {subjects &&
                                            <fieldset>
                                                <legend> {t("Subjects")}</legend>
                                                {subjects.map((subject, id) => (
                                                    <label key={id}
                                                           style={{marginRight: 30, whiteSpace: "nowrap"}}><input
                                                        type={"checkbox"} value={subject.oid}
                                                        className={"mx-1 my-2"}
                                                        checked={selectedSubjects.includes(subject.oid)}
                                                        onChange={(input) => handleChangeSelectedSubjects(subject.oid, input.target.checked)}/>{subject.name}
                                                    </label>

                                                ))}
                                            </fieldset>}

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