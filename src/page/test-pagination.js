import React from "react";
import ReactDOM from "react-dom";
import { Pagination } from "../components/pagination/index";

export class testPagination extends React.Component {
	constructor(prop) {
		super(prop);
		this.state = {
			total: 200,
			size: 10
		};
	}
	handlePageChange(i) {}
	render() {
		return (
			<Pagination
				total={this.state.total}
				size={this.state.size}
				handlePageChange={this.handlePageChange}
			/>
		);
	}
}
