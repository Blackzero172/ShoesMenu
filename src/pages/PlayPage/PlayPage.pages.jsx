import React from "react";
import Card from "../../components/Card/Card.components";
import "./PlayPage.styles.css";
import CustomButton from "../../components/CustomButton/CustomButton.components";
class PlayPage extends React.Component {
	cardRef = React.createRef();
	confirmationMenuRef = React.createRef();
	revealAnswer = () => {
		this.cardRef.current.classList.add("flipped");
		this.confirmationMenuRef.current.classList.remove("hidden");
	};
	hideAnswer = () => {
		this.cardRef.current.classList.remove("flipped");
		this.confirmationMenuRef.current.classList.add("hidden");
	};
	render() {
		if (this.props.completed >= this.props.maxCards && this.props.maxCards > 0)
			return (
				<div>
					<div className="main-container">
						<h2>Congratulations ,You have finished all your cards</h2>
						Correct Answers: {this.props.completed}/{this.props.maxCards}
					</div>
				</div>
			);
		else {
			return (
				<div className="main-container">
					<Card
						cardRef={this.cardRef}
						question={this.props.currentCard.question}
						answer={this.props.currentCard.answer}
					/>
					<div className="button-container">
						<CustomButton text="New Card" onClick={this.props.onNewCard} />
						<CustomButton text="Reveal Answer" onClick={this.revealAnswer} />
					</div>
					<div className="answer-confirmation hidden" ref={this.confirmationMenuRef}>
						Did you get that one?
						<div className="button-container">
							<CustomButton
								text="Yes"
								onClick={() => {
									this.props.onConfirm();
									this.hideAnswer();
								}}
							/>
							<CustomButton text="No" />
						</div>
					</div>
					Correct Answers: {this.props.completed}/{this.props.maxCards}
				</div>
			);
		}
	}
}
export default PlayPage;
