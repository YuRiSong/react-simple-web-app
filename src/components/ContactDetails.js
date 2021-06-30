import React from 'react';
import ContactInfo from './ContactInfo';
import { FormControl,Col,Container,Row,InputGroup,Button } from 'react-bootstrap';


class ContactDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEdit : false,
            name : '',
            phone : ''
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChage = this.handleChage.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleToggle(){
        if(!this.state.isEdit){
            this.setState({
                name : this.props.contact.name,
                phone : this.props.contact.phone
            });
        }else{

            this.props.onEidt(this.state.name, this.state.phone);
        }

        this.setState({
            isEdit : !this.state.isEdit
        });
    }

    handleChage(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleKeyPress(e) {
        if(e.charCode === 13){
            this.handleToggle();
        }
    }

    render(){
        const details = (<div>
            <p>{this.props.contact.name}</p>
            <p>{this.props.contact.phone}</p>
        </div>);

        const blank = (<div>Not Selected</div>);

        const edit = (
            <div>
                <p>
                    <input
                        type="text"
                        name="name"
                        value = {this.state.name} 
                        onChange = {this.handleChage}
                    />
                </p>
                <p>
                    <input 
                        type="text"
                        name="phone"
                        value={this.state.phone}
                        onChange = {this.handleChage}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
            </div>
        )

        const view = this.state.isEdit ? edit : details;

        return(
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? view : blank}
                <Button onClick={this.props.onDelete} variant="danger">Delete</Button> {' '}
                <Button onClick={this.handleToggle} variant="danger">{this.state.isEdit ? 'OK' : 'Edit'}</Button>
            </div>
        );
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    },
    onDelete : () => {console.error("isdeletd is not defined.");},
    onEdit : () => {console.error('onEdit not defined'); }
};

export default ContactDetails;