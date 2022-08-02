import React, {useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const CreateInput = ({inModal, inToggle, saveInput}) => {
  const [inMaterial, setinMaterial] = useState('');
  const [inForm, setinForm] = useState('');
  const [inDescription, setinDescription] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;

    if (name === 'inMaterial') {
      setinMaterial(value);
    } else if (name === 'inForm') {
      setinForm(value);
    } else if (name === 'inDescription') {
      setinDescription(value);
    }
  }

  const handleSave = () => {
    let inObj = {};
    inObj["inMaterial"] = inMaterial;
    inObj["inForm"] = inForm;
    inObj["inDescription"] = inDescription;
    saveInput(inObj);
  }

  return (
    <Modal isOpen={inModal} toggle={inToggle}>
      <ModalHeader toggle={inToggle}>Input</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label>Material</label>
            <input type="text" value={inMaterial} className="form-control" id="inMaterial" name='inMaterial' placeholder="Material" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Form</label>
            <input type="text" value={inForm} className="form-control" id="inForm" name='inForm' placeholder="Form" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" value={inDescription} id="inDescription" name='inDescription' rows="5" placeholder="Description" onChange={handleChange}></textarea>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>Create</Button>{' '}
        <Button onClick={inToggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateInput;