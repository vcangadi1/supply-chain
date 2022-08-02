import React from 'react'
import { Button, Card, CardTitle, CardText } from 'reactstrap'



const Cards = ({obj, index, deleteTask}) => {

    const handleDelete = () => {
        deleteTask(index);
    }

  return (
    <div className='container mb-2'>
        <Card body color="secondary" outline>
            <CardTitle tag="h5">{obj.inMaterial}{obj.ProcessName}{obj.outMaterial}</CardTitle>
            <CardText>
                <p>{obj.inForm}{obj.pDescription}{obj.outForm}</p>
                <p>{obj.inDescription}{obj.pNotes}{obj.outDescription}</p>
            </CardText>
            <div class= 'd-flex justify-content-end'>
                <i class="bi bi-trash-fill mx-4" style={{"cursor": "pointer"}} onClick={handleDelete}></i>
            </div>
            
        </Card>
    </div>
  );
}

export default Cards