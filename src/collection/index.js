import React from "react";
import { Button, Form, Input } from "antd";
import * as api from "../api";

const FormItem = Form.Item;
const { TextArea } = Input;

class CollectionForm extends React.Component {
    handleSubmit = e => {
       e.preventDefault();
       this.props.form.validateFields((err, values) => {
           console.log(values);
           return;
           api.saveCollection(values).then(result => {
             console.log(result);
           });
       });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator("name", {
                  rules: [
                      { required: true, message: "Please input the collection name!"}
                  ]
              })(<Input placeholder="collection name" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator("description",{
                  rules: [
                      {required: true, message: "Please inpur the collection description!"}
                  ]
              })(<TextArea placeholder="collection description" />)}
            </FormItem>
            <Button type="primary" htmlType="submit" classname="login-form-buttom">
              保存
            </Button>
          </Form>
        )
    }

}

const WrapedCollectionForm = Form.create()(CollectionForm);

export default WrapedCollectionForm;