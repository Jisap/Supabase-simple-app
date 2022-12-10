import {Card, Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { supabase } from './supabaseClient';


const TrainingCard = (props) => {

  const training = props.training;  


  const [ editing, setEditing ] = useState(false);
  const [ name, setName ] = useState(training.name);
  const [ description, setDescription ] = useState(training.description);

   async function updateTraining() {
        try {
            const { data, error } = await supabase
                .from("trainings")
                .update(
                    {
                        name: name,
                        description: description
                
                    }
                )
                .eq("id", training.id)
            
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    async function deleteTraining() {
        try {
            const { data, error } = await supabase
                .from("trainings")
                .delete()
                .eq("id", training.id)
            
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

  return (
    <Card style={{ width: "18rem" }}>
        <Card.Body>
            {editing === false  ? (
                <>
                    <Card.Title>{ training.name }</Card.Title>
                    <Card.Text>{ training.description }</Card.Text>
                    
                    <Button 
                        onClick={() => deleteTraining()}
                        variant="danger">Borrar</Button>{' '}
                    <Button 
                        variant="secondary"
                        onClick={() => setEditing(true)}
                    >Editar</Button> 
                </>
                ) : (
                    <>
                        <h4>Editando entrenamiento</h4>
                        <Button 
                            size="sm"
                            onClick={() => setEditing(false)}
                        >Go Back</Button>
                        <br></br>
                        <Form.Label>Nombre del entrenamiento</Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            defaultValue={ training.name }
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            id="description"
                            defaultValue={ training.description }
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br></br>
                        <Form.Label>Contenido</Form.Label>
                        <Form.Control
                            type="text"
                            as="textarea"
                            id="contenido"
                            defaultValue={ training.exercises.wod1 }
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br></br>
                        <Button onClick={() => updateTraining()}>Update Training in Supabase DB</Button>
                    </>
                )
            }        
        </Card.Body>
    </Card>
  )
}

export default TrainingCard