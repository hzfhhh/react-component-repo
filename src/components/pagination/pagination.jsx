import React from "react";
import "./style.css";

export default class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageIndex: 1, //当前页码
			inputPageIndex: 1, //input框的值
			pageArrayIndex: 1, //当前页码分组
			addNum: 0, //跳转到下一组时增加的量
			totalPage: 0, //总页码数
			pageLenth: 0, //每组展示的页码数
			size: props.size, //每页展示的列数
			total: props.total //总列数
		};
	}
	/**
	 * 计算总页码数
	 */
	computedTotalPage() {
		this.state.totalPage = Math.ceil(this.state.total / this.state.size);
	}
	/**
	 * 计算每组展示的页码数
	 */
	computedPageLenth() {
		this.state.pageLenth =
			this.state.total > this.state.size * 10 ? 10 : this.state.totalPage;
	}
	/**
	 * 页码跳转事件
	 */
	setPage(i) {
		// 大于总页码数
		if (i > this.state.totalPage) {
			return false;
		}
		// 一次展示的列数小于总列数
		if (
			(i !== 0 && this.state.size < this.state.total) ||
			this.state.size === this.state.total
		) {
			// this.state.pageIndex = i;
			this.setState({
				inputPageIndex: i,
				pageIndex: i,
				pageArrayIndex: Math.floor((i - 1) / this.state.size) + 1
			});
			this.state.pageArrayIndex = Math.floor((i - 1) / this.state.size) + 1;
			//下一页判断
			if ((i - 1) % this.state.size === 0 && i - 1 < this.state.total) {
				var n = (i - 1) / this.state.size;
				// this.state.addNum = n * this.state.size;
				this.setState({
					addNum: n * this.state.size
				});
				// 上一页判断
			} else if (
				i % this.state.size === 0 &&
				i > 1 &&
				this.state.pageArrayIndex > 0
			) {
				var n = i / this.state.size;
				// this.state.addNum = (n - 1) * this.state.size;
				this.setState({
					addNum: (n - 1) * this.state.size
				});
			} else {
				var n = Math.floor(i / this.state.size);
				this.setState({
					addNum: n * this.state.size
				});
			}
			this.props.handlePageChange(i);
		}
	}
	handleInput(i) {
		this.setState({
			inputPageIndex: i
		});
	}
	render() {
		this.computedTotalPage();
		this.computedPageLenth();
		let pageArray = [];
		let pageArrayLength =
			this.state.pageArrayIndex <
			Math.ceil(this.state.totalPage / this.state.size)
				? this.state.pageLenth
				: this.state.totalPage - this.state.addNum;
		let pageNum = [];
		for (var i = 1; i < pageArrayLength + 1; i++) {
			pageNum[i - 1] = (
				<a
					href="javascript:;"
					key={i}
					onClick={this.setPage.bind(this, i + this.state.addNum)}
				>
					<li
						className={`number ${
							i + this.state.addNum == this.state.pageIndex ? "active" : ""
						}`}
					>
						{i + this.state.addNum}
					</li>
				</a>
			);
		}
		return (
			<div className="pagination">
				<a
					href="javascript:;"
					className={`${this.state.pageIndex === 1 ? "disabled" : ""} btn-prev`}
					style={{
						cursor: this.state.pageIndex === 1 ? "not-allowed" : "pointer"
					}}
					onClick={this.setPage.bind(this, +this.state.pageIndex - 1)}
				/>
				<ul className="pager">
					{this.state.pageArrayIndex > 1 ? (
						<a href="javascript:;">
							<li className="number" onClick={this.setPage.bind(this, 1)}>
								1
							</li>
							<li className="dot">...</li>
						</a>
					) : (
						""
					)}
					{pageNum}
					{this.state.totalPage - this.state.addNum > this.state.pageLenth &&
					this.state.pageArrayIndex < this.state.totalPage ? (
						<a href="javascript:;">
							<li className="dot">...</li>
							<li
								className="number"
								onClick={e => {
									this.setPage(this.state.totalPage);
								}}
							>
								{this.state.totalPage}
							</li>
						</a>
					) : (
						""
					)}
				</ul>
				<a
					href="javascript:;"
					className={`btn-next ${
						this.state.totalPage === 1 ||
						this.state.pageIndex == this.state.totalPage
							? "disabled"
							: ""
					}`}
					style={{
						cursor:
							this.state.pageIndex === this.state.totalPage ||
							this.state.totalPage === 1
								? "not-allowed"
								: "pointer"
					}}
					onClick={this.setPage.bind(this, this.state.pageIndex + 1)}
				/>
				<div className="toPath">
					前往<div className="inputNum">
						<input
							type="text"
							value={this.state.inputPageIndex}
							onChange={e => {
								this.handleInput(e.target.value);
							}}
							onBlur={e => {
								this.setPage(e.target.value);
							}}
							onKeyDown={e => {
								e.keyCode === 13 && this.setPage(e.target.value);
							}}
						/>
					</div>页
				</div>
			</div>
		);
	}
}
