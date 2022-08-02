import React, {useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const CreateProcess = ({pModal, pToggle, saveProcess}) => {
    const [ProcessName, setProcessName] = useState('');
    const [pDescription, setpDescription] = useState('');
    const [pNotes, setpNotes] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'ProcessName') {
            setProcessName(value);
        } else if (name === 'pDescription') {
            setpDescription(value);
        } else if (name === 'pNotes') {
            setpNotes(value);
        }
    }
    
    const handleSave = () => {
        let pObj = {};
        pObj["ProcessName"] = ProcessName;
        pObj["pDescription"] = pDescription;
        pObj["pNotes"] = pNotes;
        saveProcess(pObj);
    }

  return (
    <Modal isOpen={pModal} toggle={pToggle}>
      <ModalHeader toggle={pToggle}>Process</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label>Process Name</label>
            <input type="text" className="form-control" value={ProcessName} id="ProcessName" name='ProcessName' placeholder="Process" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" value={pDescription} id="pDescription" name='pDescription' rows="5" placeholder="Description" onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea className="form-control" value={pNotes} id="pNotes" name='pNotes' rows="5" placeholder="Notes" onChange={handleChange}></textarea>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>Create</Button>{' '}
        <Button onClick={pToggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateProcess;