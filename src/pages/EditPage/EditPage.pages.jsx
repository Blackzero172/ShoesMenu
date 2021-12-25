import React from "react";
import api from "../../components/API/api";
import Spinner from "../../components/Spinner/Spinner.components";
import ItemView from "../../components/ItemView/ItemView.components";
import CustomInput from "../../components/CustomInput/CustomInput.components";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import EditMenu from "../../components/EditMenu/EditMenu.components";
import CustomLabel from "../../components/CustomLabel/CustomLabel.components";
import "./EditPage.styles.css";
class EditPage extends React.Component {
	state = { currentItem: {} };
	menuRef = React.createRef();
	headingRef = React.createRef();
	questionInput = React.createRef();
	answerInput = React.createRef();

	setupEdit = (e) => {
		const [questionInput, answerInput, menuRef] = [
			this.questionInput.current,
			this.answerInput.current,
			this.menuRef.current,
		];
		const editItem = this.props.cards.find((item) => item.id === e.target.id);
		this.setState({ currentItem: editItem });
		questionInput.value = editItem.question;
		answerInput.value = editItem.answer;
		menuRef.classList.remove("hidden");
	};
	showHideMenu = async (e) => {
		if (!this.state.loading) {
			const [questionInput, answerInput, menuRef] = [
				this.questionInput.current,
				this.answerInput.current,
				this.menuRef.current,
			];
			if (
				questionInput.value !== "" &&
				answerInput.value !== "" &&
				!menuRef.classList.contains("hidden") &&
				!e.target.classList.contains("cancel")
			) {
				this.setState({ loading: true }, async () => {
					this.props.setLoading();
					menuRef.classList.add("hidden");
					if (this.state.currentItem === {}) await this.postItem();
					else await this.postItem(this.state.currentItem.id);
					this.props.getData();
				});
			} else if (e.target.classList.contains("cancel")) {
				menuRef.classList.add("hidden");
			} else if (!menuRef.classList.contains("hidden")) {
				[questionInput, answerInput].forEach((input) => {
					if (input.value === "") {
						input.classList.add("empty-input");
						setTimeout(() => {
							input.classList.remove("empty-input");
						}, 1500);
					}
				});
			} else {
				menuRef.classList.remove("hidden");
			}
		}
	};

	postItem = async (id) => {
		const [questionInput, answerInput] = [this.questionInput.current, this.answerInput.current];
		if (id) {
			await api.put(id, {
				question: questionInput.value,
				answer: answerInput.value,
			});
			this.setState({ currentItem: {} });
		} else
			await api.post("", {
				question: questionInput.value,
				answer: answerInput.value,
			});

		questionInput.value = "";
		answerInput.value = "";
	};
	deleteItem = async (e) => {
		this.props.setLoading();
		await api.delete(e.target.id);
		this.props.getData();
	};
	render() {
		const isEdit = this.state.currentItem.name === undefined;
		return (
			<div>
				<div className="flex-container">
					<CustomButton text="Add Product" onClick={this.showHideMenu}>
						<i className="fas fa-plus"></i>
					</CustomButton>
				</div>
				<div className="list-container">
					{this.props.cards.map((item) => {
						return (
							<ItemView item={item} key={item.id} deleteItem={this.deleteItem} editItem={this.setupEdit} />
						);
					})}
				</div>
				<EditMenu menuRef={this.menuRef}>
					<CustomButton className="cancel" onClick={this.showHideMenu}>
						<i className="fas fa-times"></i>
					</CustomButton>
					<h3 style={{ color: "#fff" }}>{isEdit ? "Add Card" : "Edit Card"} </h3>
					<CustomLabel text="Question" name="Question" />
					<CustomInput
						type="textarea"
						placeHolder="Type in the name of the shoe"
						inputRef={this.questionInput}
						name="Question"
					/>
					<CustomLabel text="Answer" name="Answer" />
					<CustomInput
						type="textarea"
						placeHolder="Type in the size of the shoe"
						inputRef={this.answerInput}
						name="Answer"
					/>
					<CustomButton text={isEdit ? "Add" : "Edit"} onClick={this.showHideMenu} className="confirm-btn">
						<i className={`fas fa-${isEdit ? "plus" : "edit"}`}></i>
					</CustomButton>
				</EditMenu>
			</div>
		);
	}
}
export default EditPage;
