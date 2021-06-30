import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';
import '../index.css';

import { FormControl,Col,Container,Row,InputGroup,Button } from 'react-bootstrap';


import update from 'react-addons-update';

export default class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [{
                name: 'Abet',
                phone: '010-0000-0001'
            }, {
                name: 'Betty',
                phone: '010-0000-0002'
            }, {
                name: 'Charlie',
                phone: '010-0000-0003'
            }, {
                name: 'David',
                phone: '010-0000-0004'
            }]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    componentWillMount(){
        const contactData = localStorage.contactData;

        if(contactData){
            this.setState({
                contactData: JSON.parse(contactData)
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)){
            localStorage.contactDate = JSON.stringify(this.state.contactDate);
        }
    }


    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    handleClick(key) {
        this.setState({
            selectedKey: key
        });

        console.log(key, 'is selected');
    }

    handleCreate(contact) {
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact] })
        });
    }

    handleRemove() {
        if(this.state.selectedKey < 0){
            return;
        }

        this.setState({
            contactData: update(this.state.contactData,
                { $splice: [[this.state.selectedKey, 1]] }
            ),
            selectedKey: -1
        });
    }

    handleEdit(name, phone) {
        this.setState({
            contactData: update(this.state.contactData,
                {
                    [this.state.selectedKey]: {
                        name: { $set: name },
                        phone: { $set: phone }
                    }
                }
            )
        });
    }

    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter(
                (contact) => {
                    return contact.name.toLowerCase()
                        .indexOf(this.state.keyword.toLowerCase()) > -1;
                }
            );
            return data.map((contact, i) => {
                return (<ContactInfo
                            contact={contact}
                            key={i}
                            onClick={() => this.handleClick(i)}/>);
            });
        };

        return (
            <div>
                <ContactCreate
                    onCreate={this.handleCreate}
                />
                <br />
                <Container>
                    <Row>
                        <Col sm={8}>
                            <h1>Contacts</h1>
                            <InputGroup className="mb-3">
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                name="keyword"
                                placeholder="Search"
                                value={this.state.keyword}
                                onChange={this.handleChange}                                
                            />
                            </InputGroup>                           
                            <div>{mapToComponents(this.state.contactData)}</div>
                        </Col>
                        <Col sm={4}>
                            <ContactDetails
                            isSelected={this.state.selectedKey != -1}
                            contact={this.state.contactData[this.state.selectedKey]}
                            onDelete={this.handleRemove} 
                            onEidt={this.handleEdit}
                            />  
                        </Col>
                    </Row>
                </Container>
        </div>
        );
    }
}