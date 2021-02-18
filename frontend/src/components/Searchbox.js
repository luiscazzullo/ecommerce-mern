import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Searchbox = () => {
  const [keyword, setKeyword] = useState('');
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  } 
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control 
        type="text" 
        name="q" 
        onChange={e => setKeyword(e.target.value)}
        placeholder="Busque su producto" 
        className="mr-sm-2 ml-sm-5"
        value={keyword}
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Buscar
      </Button>
    </Form>
  );
}
 
export default Searchbox;