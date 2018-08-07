import React from "react";
import {Table, Button, Input} from "antd";

import * as api from "../api";
import "./index.css";

const PAGE_SIZE = 20;

export default class List extends React.Component {
    state = {
        page: 1,
        search: ""
    }

    columns = [
        {
            title: "图片",
            dataIndex: "images",
            render: (value, record, index) => {
                return <img src={value.small} alt=""/>
            }
        }, {
            title: "标题",
            dataIndex: "title"
        }, {
            title: "作者",
            dataIndex: "solider",
            render: (value) => {
                return <a href={value.html_url}>{value.name}</a>;
            }
        }
    ];

    componentDidMount() {
        this.loadList();
    }

    loadList = () => {
        this.setState({loading: true})
        const {page, search} = this.state;
        const params = {
            page,
            search
        };
        api
            .queryList(params)
            .then(({data}) => {
                this.setState({dataSource: data});
            })
            .catch(console.error)
            . finally(() => {
                this.setState({loading: false});
            });
    };

    handleSelectChange = selectedRowKeys => {
        console.log(selectedRowKeys);
        this.setState({selectedRowKeys});
    };

    handlePageChange = page => {
        this.setState({
            page
        }, this.loadList);
    };

    handleSearchChange = evt => {
        this.setState({search: evt.target.value});
    };

    handleFilter = () => {
        this.loadList();
    };

    handleSave = () => {
        const {selectedRowKeys} = this.state;
        api
            .saveCollection({selectedRowKeys})
            .then(result => {
                console.log(result);
            });
    };

    render() {
        const {dataSource, loading, page, selectedRowKeys, search} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleSelectedChange
        };
        const pagination = {
            current: page,
            pageSize: PAGE_SIZE,
            total: 100,
            onChange: this.handlePageChange
        };

        return (
            <div className="app">
                <div className="filter">
                    <Input value={search} onChange={this.handleSearchChange}/>
                    <Button type="primary" onClick={this.handleFilter}>
                        筛选
                    </Button>
                </div>
                <Table
                 rowKey="_id"
                 columns={this.columns}
                 loading={loading}
                 rowSelection={rowSelection}
                 pagination={pagination}
                 dataSource={dataSource}
                 />
                <Button type="primary" onClick={this.handleSave}>
                    保存
                </Button>
            </div>
        );
    }
}