import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import TrainingCard from './TrainingCard';
import { supabase } from './supabaseClient';
import { uid } from "uid";

function App() {

  const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ exercises, setExercises ] = useState({});
  const [ trainings, setTrainings] = useState([]);

  useEffect(() => {
    getProducts();
  }, [])

  async function getProducts() {
    try {
      const { data, error } = await supabase // respuesta a la petición a la bd
        .from("trainings")
        .select("*")
        .limit(10)
      if (error) throw error;
      if (data != null) {
        setTrainings(data); // [training1,training2,training3]
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function createTraining() {
    try {
      const { data, error } = await supabase
        .from("trainings")
        .insert({
          name: name,
          description: description,
          exercises:[{
            id: uid(),
            wod1: exercises
          }]
        })
        .single()
        
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand>Store training</Navbar.Brand>
          <Nav>
            <Nav.Item>Created by Jisap</Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h3>Create Training for Supabase Database</h3>
            <Form.Label>Nombre del entrenamiento</Form.Label>
            <Form.Control
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label>Decripción del entrenamiento</Form.Label>
            <Form.Control
              type="text"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <br></br>
            <Button onClick={() => createTraining()}>Crear un entrenamiento en Supabase DB</Button>
          </Col>
        </Row>
        <hr></hr>
        <h3>Current Database Items</h3>
        <Row xs={1} lg={3} className="g-4">
          
            { trainings.map((training) => (
              <Col className="p-3">
                <TrainingCard key={training.id} training={training}/>
              </Col>
            ))}
          
        </Row>
      </Container>
    </>
  );
}

export default App;
