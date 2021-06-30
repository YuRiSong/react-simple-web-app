import React from 'react';
import PropTypes from 'prop-types';

import { FormControl,Col,Container,Row,InputGroup,Button } from 'react-bootstrap';

class ContactCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name : '',
            phone : ''
        };
        this.handleChage = this.handleChage.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChage(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }

    handleClick(){
        const contact = {
            name : this.state.name,
            phone : this.state.phone
        };

        this.props.onCreate(contact);

        this.setState({
            name : '',
            phone: ''
        });
    }

    handleKeyPress(e) {
        if(e.charCode === 13){
            this.handleClick();
        }
    }


    render(){
        return(
            <Container>
                <h2>Create Contact</h2>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                        <FormControl aria-label="First name" type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChage}/>
                        <FormControl aria-label="Last name" type="text" name="phone" placeholder="phone" value={this.state.phone} onChange={this.handleChage} onKeyPress={this.handleKeyPress}/>
                        </InputGroup>
                    </Col>
                </Row>
                <Button onClick={this.handleClick} variant="danger">Create</Button>
            </Container>
        );
    }
}

ContactCreate.propTypes = {
    onCreate : PropTypes.func,
    onEdit : PropTypes.func
};

ContactCreate.defaultProps = {
    onCreate : () => {console.error('onCreate not defined'); },
}


export default ContactCreate;