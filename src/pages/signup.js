import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import {useMutation,useApolloClient,gql} from '@apollo/client';

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!){
        signUp(email: $email, username: $username, password: $password)
    }
`; 

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    label,
    input {
        display: block;
        line-height: 2em;
    }
    input {
        width: 100%;
        margin-bottom: 1em;
    }
`;


const SignUp = props =>{
    const [values,setValues] = useState();
    const onChange = event =>{
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    useEffect(()=>{
        document.title='Sign up - Notedly';
    });
    const [signUp, {loading, error}] = useMutation(SIGNUP_USER, {
        onCompleted: data=>{
            localStorage.setItem('token',data.signUp);
            props.history.push('/');
        }
    });   
    
    return(
        <Wrapper>
            <h2>Sign Up</h2>
            <Form 
            onSubmit={event => {
                event.preventDefault();
                signUp({
                    variables: {
                        ...values
                    }
                });
            }} >
                <label htmlFor="username">Username:</label>
                <input 
                    required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    onChange={onChange}
                />
                <label htmlFor="email">E-mail:</label>
                <input 
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    onChange={onChange}
                />
                <label htmlFor="password">Password:</label>
                <input 
                    required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={onChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Wrapper>
    );
};
export default SignUp;