import React, {useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const CreateOutput = ({outModal, outToggle, saveOutput}) => {
    const [outMaterial, setoutMaterial] = useState('');
    const [outForm, setoutForm] = useState('');
    const [outDescription, setoutDescription] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'outMaterial') {
            setoutMaterial(value);
        } else if (name === 'outForm') {
            setoutForm(value);
        } else if (name === 'outDescription') {
            setoutDescription(value);
        }
    }

    const handleSave = () => {
        let outObj = {};
        outObj["outMaterial"] = outMaterial;
        outObj["outForm"] = outForm;
        outObj["outDescription"] = outDescription;
        saveOutput(outObj);
    }

  return (
    <Modal isOpen={outModal} toggle={outToggle}>
      <ModalHeader toggle={outToggle}>Output</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label>Material</label>
            <input type="text" className="form-control" id="outMaterial" value={outMaterial} name='outMaterial' placeholder="Material" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Form</label>
            <input type="text" className="form-control" id="outForm" value={outForm} name='outForm' placeholder="Form" onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" id="outDescription" value={outDescription} name='outDescription' rows="5" placeholder="Description" onChange={handleChange}></textarea>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>Create</Button>{' '}
        <Button onClick={outToggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateOutput;