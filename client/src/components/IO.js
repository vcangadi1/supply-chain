import React, {useEffect, useState} from "react";
import CreateInput from "../modals/CreateInput";
import CreateProcess from "../modals/CreateProcess";
import CreateOutput from "../modals/CreateOutput";
import Cards from "./Cards";
import Axios from 'axios';
import {v4 as uuidv4} from 'uuid';

const IO = () => {
    const [inModal, setinModal] = useState(false);
    const [pModal, setpModal] = useState(false);
    const [outModal, setoutModal] = useState(false);

    const [inputList, setInputList] = useState([]);
    const [pList, setpList] = useState([]);
    const [outputList, setOutputList] = useState([]);

    useEffect(() => {
    //     Axios.get('http://localhost:3001/api/get/input').then(res => {
    //         let inArr = res.data.map(item => {
    //             return {
    //                 inMaterial: item.inMaterial,
    //                 inForm: item.inForm,
    //                 inDescription: item.inDescription
    //             }
    //         });
    //         if (inArr) {
    //             let inObj = JSON.parse(JSON.stringify(inArr));
    //             setInputList(inObj);
    //         }
    //     });

    //     Axios.get('http://localhost:3001/api/get/process').then(res => {
    //         let pArr = res.data.map(item => {
    //             return {
    //                 ProcessName: item.ProcessName,
    //                 pDescription: item.pDescription,
    //                 pNotes: item.pNotes
    //             }
    //         });
    //         if (pArr) {
    //             let pObj = JSON.parse(JSON.stringify(pArr));
    //             setpList(pObj);
    //         }
    //     });

    //     Axios.get('http://localhost:3001/api/get/output').then(res => {
    //         let outArr = res.data.map(item => {
    //             return {
    //                 outMaterial: item.outMaterial,
    //                 outForm: item.outForm,
    //                 outDescription: item.outDescription
    //             }
    //         });
    //         if (outArr) {
    //             let outObj = JSON.parse(JSON.stringify(outArr));
    //             setOutputList(outObj);
    //         }
    //     });
    }, []);
    
    const submitbtn = () => {
        
        // uuid v4 is used to generate a unique id for each process
        let id = uuidv4();

        try {
            // Process 
            let pTemp = JSON.parse(localStorage.getItem("pList"));
            try {
                Axios.post('http://localhost:3001/api/insert/process', {
                    id,
                    ProcessName: pTemp[0].ProcessName,
                    pDescription: pTemp[0].pDescription,
                    pNotes: pTemp[0].pNotes
                }).then(res => {console.log(res);});
            } catch (error) {
                console.log(error);
            } finally {
                console.log('Process Inserted');
                // Input
                let inTemp = JSON.parse(localStorage.getItem("inputList"));
                inTemp.forEach(item => {
                    try {
                        Axios.post('http://localhost:3001/api/insert/input', {
                            id,
                            inMaterial: item.inMaterial,
                            inForm: item.inForm,
                            inDescription: item.inDescription
                        });
                    } catch (error) {
                        console.log(error);
                    } finally {
                        console.log('Input Inserted');
                    }
                });

                // Output
                let outTemp = JSON.parse(localStorage.getItem("outputList"));
                outTemp.forEach(item => {
                    try {
                        Axios.post('http://localhost:3001/api/insert/output', {
                            id,
                            outMaterial: item.outMaterial,
                            outForm: item.outForm,
                            outDescription: item.outDescription
                        });
                    } catch (error) {
                        console.log(error);
                    } finally {
                        console.log('Output Inserted');
                    }
                });
            }
                
        } catch (error) {
            console.log(error);
        } finally {
            localStorage.removeItem("pList");
            localStorage.removeItem("inputList");
            localStorage.removeItem("outputList");
            window.location.reload();
        }
    }

    const inToggle = () => setinModal(!inModal);
    const pToggle = () => setpModal(!pModal);
    const outToggle = () => setoutModal(!outModal);

    const saveInput = (inObj) => {
        let tempList = inputList;
        tempList.push(inObj);
        localStorage.setItem("inputList", JSON.stringify(tempList));
        setInputList(tempList);
        setinModal(false);
    }

    const saveProcess = (pObj) => {
        let tempList = pList;
        tempList.push(pObj);
        localStorage.setItem("pList", JSON.stringify(tempList));
        setpList(tempList);
        setpModal(false);
    }

    const saveOutput = (outObj) => {
        let tempList = outputList;
        tempList.push(outObj);
        localStorage.setItem("outputList", JSON.stringify(tempList));
        setOutputList(tempList);
        setoutModal(false);
    }

    const deleteInput = (index) => {
        let tempList = inputList;
        tempList.splice(index, 1);
        localStorage.setItem("inputList", JSON.stringify(tempList));
        setInputList(tempList);
        window.location.reload();
    }

    const deleteProcess = (index) => {
        let tempList = pList;
        tempList.splice(index, 1);
        localStorage.setItem("pList", JSON.stringify(tempList));
        setpList(tempList);
        window.location.reload();
    }

    const deleteOutput = (index) => {
        let tempList = outputList;
        tempList.splice(index, 1);
        localStorage.setItem("outputList", JSON.stringify(tempList));
        setOutputList(tempList);
        window.location.reload();
    }

    return (
        <>
            <div className="header text-center">
                <h1>Process Map Builder</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col mt-4 d-flex justify-content-center">
                        <div className="row">
                            <button className="btn btn-primary btn-lg me-md-5 mt-4 mb-4" type="button" onClick={() => setinModal(true)}>Input</button>
                        </div>
                    </div>
                    <div className="col mt-4 d-flex justify-content-center">
                        <div className="row">
                            <button className="btn btn-primary btn-lg me-md-5 mt-4 mb-4" type="button" onClick={() => setpModal(true)}>Process</button>
                        </div>
                    </div>
                    <div className="col mt-4 d-flex justify-content-center">
                        <div className="row">
                            <button className="btn btn-primary btn-lg me-md-5 mt-4 mb-4" type="button" onClick={() => setoutModal(true)}>Output</button>
                        </div>
                    </div>                    
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col mt-4">
                        {inputList && inputList.map((obj, index) => <Cards obj={obj} index={index} deleteTask={deleteInput} />)}
                    </div>
                    <div className="col mt-4">
                        {pList && pList.map((obj, index) => <Cards obj={obj} index={index} deleteTask={deleteProcess}/>)}
                    </div>
                    <div className="col mt-4">
                        {outputList && outputList.map((obj, index) => <Cards obj={obj} index={index} deleteTask={deleteOutput}/>)}
                    </div>                    
                </div>
                <div className="row">
                    <div className="col mt-4 mb-4 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-lg me-md-5 mt-4" onClick={submitbtn}>Submit</button>
                    </div>
                </div>
            </div>

            <CreateInput inToggle = {inToggle} inModal = {inModal} saveInput = {saveInput}/>
            <CreateProcess pToggle = {pToggle} pModal = {pModal} saveProcess = {saveProcess}/>
            <CreateOutput outToggle = {outToggle} outModal = {outModal} saveOutput = {saveOutput}/>
        </>
        
    );
};

export default IO;